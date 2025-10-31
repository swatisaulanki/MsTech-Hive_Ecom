// src/pages/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "https://mstech-hive-ecom.onrender.com";
const PLACEHOLDER = "https://via.placeholder.com/200x140?text=No+Image";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // UI state
  const [activeTab, setActiveTab] = useState("overview"); // overview | products | orders
  const [productQuery, setProductQuery] = useState("");
  const [orderQuery, setOrderQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState(null); // product object being edited
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(null); // id being deleted
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(null); // order id being updated

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    let mounted = true;
    const controller = new AbortController();

    const fetchAll = async () => {
      setLoading(true);
      setError("");
      try {
        const pRes = await fetch(`${API_BASE}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        let pJson = null;
        try {
          pJson = await pRes.json();
        } catch {
          pJson = null;
        }
        const rawProducts = Array.isArray(pJson?.products) ? pJson.products : Array.isArray(pJson) ? pJson : (pJson?.data || []);

        const oRes = await fetch(`${API_BASE}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        let oJson = null;
        try {
          oJson = await oRes.json();
        } catch {
          oJson = null;
        }
        const rawOrders = Array.isArray(oJson?.orders) ? oJson.orders : Array.isArray(oJson) ? oJson : (oJson?.data || []);

        const formattedProducts = (rawProducts || []).map((it) => ({
          id: it._id || it.id || it.productId,
          title: it.title || it.name || it.productName,
          price: Number(it.price ?? it.cost ?? 0),
          category: it.category || it.categories || "General",
          image: it.thumbnail || it.image || (Array.isArray(it.images) && it.images[0]) || PLACEHOLDER,
          raw: it,
        }));

        const formattedOrders = (rawOrders || []).map((it) => ({
          id: it._id || it.id || it.orderId,
          items: it.items || it.cart || it.products || [],
          status: it.status || it.orderStatus || "pending",
          total: Number(it.total ?? it.amount ?? it.grandTotal ?? 0),
          customer: it.customer || it.user || it.userId || {},
          createdAt: it.createdAt || it.created_at || null,
          raw: it,
        }));

        if (!mounted) return;
        setProducts(formattedProducts);
        setOrders(formattedOrders);
      } catch (err) {
        if (err.name === 'AbortError') return; // ignore abort
        console.error("Admin fetch error:", err);
        if (!mounted) return;
        setError("Failed to load admin data. Check console (CORS / auth).");
        toast.error("Failed to load admin data. Check console.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchAll();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [token, navigate]);

  // derived stats
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const revenue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0);
    const pending = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
    const delivered = orders.filter((o) => o.status === "delivered" || o.status === "completed").length;
    return { totalProducts, totalOrders, revenue, pending, delivered };
  }, [products, orders]);

  // search / filter results
  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(productQuery.toLowerCase())
  );
  const filteredOrders = orders.filter((o) =>
    String(o.id).toLowerCase().includes(orderQuery.toLowerCase()) ||
    String(o.customer?.name || o.customer?.email || "").toLowerCase().includes(orderQuery.toLowerCase())
  );

  // product operations
  const startEditProduct = (p) => {
    setEditingProduct({ ...p }); // copy
    setActiveTab("products");
  };

  const saveProduct = async () => {
    if (!editingProduct) return;
    setIsSavingProduct(true);
    setError("");
    try {
      const payload = {
        title: editingProduct.title,
        price: editingProduct.price,
        category: editingProduct.category,
      };

      const res = await fetch(`${API_BASE}/api/products/${editingProduct.id || ''}`, {
        method: editingProduct.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `status ${res.status}`);
      }

      // optimistic UI update or add new
      if (editingProduct.id) {
        setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...p, ...editingProduct } : p)));
        toast.success("Product updated");
      } else {
        const created = await res.json().catch(() => null);
        const newProd = {
          id: created?.id || created?._id || Math.random().toString(36).slice(2),
          title: editingProduct.title,
          price: editingProduct.price,
          category: editingProduct.category,
          image: editingProduct.image || PLACEHOLDER,
          raw: created || editingProduct,
        };
        setProducts((prev) => [newProd, ...prev]);
        toast.success("Product added");
      }

      setEditingProduct(null);
    } catch (err) {
      console.error("Save product error:", err);
      setError("Failed to save product. Check console for details.");
      toast.error("Failed to save product");
    } finally {
      setIsSavingProduct(false);
    }
  };

  const deleteProduct = async (id) => {
    // use window.confirm to satisfy linters that disallow bare globals
    if (!window.confirm("Delete this product? This action cannot be undone.")) return;
    setIsDeletingProduct(id);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `status ${res.status}`);
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted");
    } catch (err) {
      console.error("Delete product error:", err);
      setError("Failed to delete product.");
      toast.error("Failed to delete product");
    } finally {
      setIsDeletingProduct(null);
    }
  };

  // order operations
  const updateOrderStatus = async (orderId, newStatus) => {
    setIsUpdatingOrder(orderId);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `status ${res.status}`);
      }
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      toast.success("Order status updated");
    } catch (err) {
      console.error("Update order error:", err);
      setError("Failed to update order.");
      toast.error("Failed to update order");
    } finally {
      setIsUpdatingOrder(null);
    }
  };

  // small UI components
  const StatCard = ({ title, value }) => (
    <div className="bg-white/5 p-4 rounded-lg shadow-sm">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );

  if (loading) return <div className="p-8 text-white">Loading admin dashboard...</div>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-black text-white font-poppins">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded ${activeTab === "overview" ? "bg-indigo-600" : "bg-white/5"}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === "products" ? "bg-indigo-600" : "bg-white/5"}`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-indigo-600" : "bg-white/5"}`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
          </div>
        </header>

        {error && <div className="bg-red-700/30 p-3 rounded mb-4">{error}</div>}

        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatCard title="Total Products" value={stats.totalProducts} />
              <StatCard title="Total Orders" value={stats.totalOrders} />
              <StatCard title="Revenue" value={`₹${Number(stats.revenue || 0).toLocaleString()}`} />
              <StatCard title="Pending Orders" value={stats.pending} />
            </div>

            <div className="bg-white/5 p-4 rounded mb-6">
              <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
              <div className="space-y-3">
                {orders.slice(0, 5).map((o) => (
                  <div key={o.id} className="flex items-center justify-between bg-white/3 p-3 rounded">
                    <div>
                      <div className="font-semibold">Order #{o.id}</div>
                      <div className="text-sm text-gray-300">{o.customer?.name || o.customer?.email || "Guest"}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{(o.total || 0).toLocaleString()}</div>
                      <div className="text-sm text-gray-300">{o.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded">
              <h2 className="text-xl font-semibold mb-3">Latest Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.slice(0, 6).map((p) => (
                  <div key={p.id} className="bg-white/3 p-3 rounded flex flex-col">
                    <img
                      src={p.image || PLACEHOLDER}
                      alt={p.title}
                      onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
                      className="h-36 object-cover rounded mb-2"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-sm text-gray-300">₹{p.price}</div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button className="px-3 py-1 bg-indigo-600 rounded" onClick={() => startEditProduct(p)}>Edit</button>
                      <button className="px-3 py-1 bg-red-600 rounded" onClick={() => deleteProduct(p.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <input
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  placeholder="Search products..."
                  className="p-2 rounded bg-white/5"
                />
              </div>
              <div>
                <button
                  className="px-3 py-2 bg-green-600 rounded"
                  onClick={() => {
                    setEditingProduct({ id: null, title: "", price: 0, category: "", image: PLACEHOLDER });
                  }}
                >
                  + Add Product
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <div key={p.id || p.title} className="bg-white/5 p-3 rounded flex flex-col">
                  <img
                    src={p.image || PLACEHOLDER}
                    alt={p.title}
                    onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
                    className="h-36 object-cover rounded mb-2"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-gray-300">₹{p.price}</div>
                    <div className="text-sm text-gray-400">{p.category}</div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button className="px-3 py-1 bg-indigo-600 rounded" onClick={() => startEditProduct(p)}>Edit</button>
                    <button
                      className="px-3 py-1 bg-red-600 rounded"
                      onClick={() => deleteProduct(p.id)}
                      disabled={isDeletingProduct === p.id}
                    >
                      {isDeletingProduct === p.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {editingProduct && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <div className="bg-[#0b1020] p-6 rounded w-full max-w-2xl">
                  <h3 className="text-xl font-semibold mb-3">{editingProduct.id ? "Edit Product" : "Add Product"}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      className="p-2 rounded bg-white/5"
                      value={editingProduct.title}
                      onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                      placeholder="Title"
                    />
                    <input
                      className="p-2 rounded bg-white/5"
                      value={editingProduct.price}
                      type="number"
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      placeholder="Price"
                    />
                    <input
                      className="p-2 rounded bg-white/5 md:col-span-2"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      placeholder="Category"
                    />
                    <input
                      className="p-2 rounded bg-white/5 md:col-span-2"
                      value={editingProduct.image}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      placeholder="Image URL"
                    />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button className="px-4 py-2 bg-white/5 rounded" onClick={() => setEditingProduct(null)}>
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-indigo-600 rounded"
                      onClick={saveProduct}
                      disabled={isSavingProduct}
                    >
                      {isSavingProduct ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <input
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Search orders (id / customer)..."
                className="p-2 rounded bg-white/5 w-1/2"
              />
            </div>

            <div className="space-y-3">
              {filteredOrders.map((o) => (
                <div key={o.id} className="bg-white/5 p-3 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">Order #{o.id}</div>
                    <div className="text-sm text-gray-300">{o.customer?.name || o.customer?.email || "Customer"}</div>
                    <div className="text-sm text-gray-400">{o.items?.length || 0} items • ₹{(o.total || 0).toLocaleString()}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-300 mr-2">Status: <span className="font-semibold">{o.status}</span></div>
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className="p-2 rounded bg-white/5"
                      disabled={isUpdatingOrder === o.id}
                    >
                      <option value="pending">pending</option>
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>

                    <button
                      className="px-3 py-1 bg-indigo-600 rounded"
                      onClick={() => {
                        // use window.alert instead of bare alert
                        window.alert(JSON.stringify(o.raw, null, 2));
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} />
    </div>
  );
};

export default AdminDashboard;
