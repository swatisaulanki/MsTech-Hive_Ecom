
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_BASE = "https://mstech-hive-ecom.onrender.com";
const PLACEHOLDER =
  "https://via.placeholder.com/200x150.png?text=No+Image+Available";

const AdminDashboard = () => {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [message , setMessage]=useState("")
  const token = localStorage.getItem("token");

  // Fetch products + orders
  const fetchAll = async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const [pRes, oRes] = await Promise.allSettled([
        fetch(`${API_BASE}/api/products`, { headers }),
        fetch(`${API_BASE}/api/orders`, { headers }),
      ]);

      if (pRes.status === "fulfilled") {
        const pJson = await pRes.value.json();
        setProducts(pJson?.products || pJson || []);
      }
      if (oRes.status === "fulfilled") {
        const oJson = await oRes.value.json();
        setOrders(oJson?.orders || oJson || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Create product
  const createProduct = async (newProduct) => {
    try {
      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to create");
      const data = await res.json();
      setProducts((prev) => [...prev, data.product || data]);
      toast.success(" Product added successfully!");
    } catch (err) {
      toast.error("Failed to create product");
    }
  };

  //  Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!res.ok) throw new Error("Delete failed");

      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("🗑️ Product deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  //  Update product
  const updateProduct = async (updatedProduct) => {
    try {
      const res = await fetch(`${API_BASE}/api/products/${updatedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? data.product || data : p))
      );
      setEditProduct(null);
      toast.success("Product updated successfully!");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="animate-pulse text-lg">Loading Dashboard...</p>
      </div>
    );

  // Dashboard Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-poppins p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">
        🛠️ Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { key: "products", label: " Product Management" },
          { key: "add", label: "Add New Product" },
          { key: "orders", label: "Orders Overview" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2 rounded-xl transition-all font-medium ${
              tab === t.key
                ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-black"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Product Management */}
      {tab === "products" && (
        <div>
          {/*  Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Total Products</p>
              <h3 className="text-2xl font-bold text-yellow-400">
                {totalProducts}
              </h3>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Total Orders</p>
              <h3 className="text-2xl font-bold text-pink-400">
                {totalOrders}
              </h3>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Pending</p>
              <h3 className="text-2xl font-bold text-orange-400">
                {pendingOrders}
              </h3>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Completed</p>
              <h3 className="text-2xl font-bold text-green-400">
                {completedOrders}
              </h3>
            </div>
          </div>

          {/*  Product Table */}
          <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-lg p-4">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-3">
              Manage Products
            </h2>
            <table className="min-w-full text-left text-gray-200">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t border-gray-700 hover:bg-gray-700/50"
                  >
                    <td className="py-3 px-4">
                      <img
                        src={p.image || PLACEHOLDER}
                        alt={p.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="py-3 px-4">{p.title || p.name}</td>
                    <td className="py-3 px-4">₹{p.price}</td>
                    <td className="py-3 px-4">{p.category}</td>
                    <td className="py-3 px-4 flex gap-3">
                      <button
                        onClick={() => setEditProduct(p)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                      >
                       Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Popup Edit Modal */}
          {editProduct && (
            <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
              <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md relative shadow-lg">
                <button
                  onClick={() => setEditProduct(null)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                  ✖
                </button>
                <h2 className="text-2xl mb-4 font-semibold text-center">
                  Edit Product
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updated = {
                      ...editProduct,
                      title: e.target.title.value,
                      price: e.target.price.value,
                      category: e.target.category.value,
                      image: e.target.image.value,
                    };
                    updateProduct(updated);
                  }}
                  className="grid gap-4"
                >
                  <input
                    name="title"
                    defaultValue={editProduct.title}
                    className="p-3 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    name="price"
                    type="number"
                    defaultValue={editProduct.price}
                    className="p-3 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    name="category"
                    defaultValue={editProduct.category}
                    className="p-3 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    name="image"
                    defaultValue={editProduct.image}
                    className="p-3 rounded bg-gray-700 text-white"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-semibold py-2 rounded-lg hover:scale-105 transition-all"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Product */}
      {tab === "add" && (
        <div className="bg-gray-800 p-6 rounded-2xl max-w-2xl mx-auto shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Add New Product
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newProduct = {
                title: e.target.title.value,
                price: e.target.price.value,
                category: e.target.category.value,
                image: e.target.image.value,
              };
              createProduct(newProduct);
              e.target.reset();
            }}
            className="grid gap-4"
          >
            <input
              name="title"
              placeholder="Product Name"
              className="p-3 rounded bg-gray-700 text-white"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price (₹)"
              className="p-3 rounded bg-gray-700 text-white"
              required
            />
            <input
              name="category"
              placeholder="Category"
              className="p-3 rounded bg-gray-700 text-white"
              required
            />
            <input
              name="image"
              placeholder="Image URL"
              className="p-3 rounded bg-gray-700 text-white"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-semibold py-2 rounded-lg hover:scale-105 transition-all"
            >
              Create Product
            </button>
          </form>
        </div>
      )}

      {/* Orders Overview */}
      {tab === "orders" && (
        <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-lg p-4">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-3">
            Orders Overview
          </h2>
          <table className="min-w-full text-left text-gray-200">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o._id}
                  className="border-t border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="py-3 px-4">{o._id}</td>
                  <td className="py-3 px-4">{o.customer?.name || "Unknown"}</td>
                  <td className="py-3 px-4">₹{o.total}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      o.status === "pending"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {o.status}
                  </td>
                  <td className="py-3 px-4">
                    {o.createdAt
                      ? new Date(o.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
