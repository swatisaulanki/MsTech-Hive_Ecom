import User from "../models/User.js";

export const getProfile = (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  try {
    const allowed = ["name","address","phone","email","password"];
    const updates = {};
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });

    if (updates.email) {
      const exists = await User.findOne({ email: updates.email, _id: { $ne: req.user._id } });
      if (exists) return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.findById(req.user._id);
    Object.assign(user, updates);
    await user.save();
    res.json({ message: "Profile updated", user: { id: user._id, name: user.name, email: user.email, address: user.address, phone: user.phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
