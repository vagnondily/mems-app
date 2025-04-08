// backend/controllers/user.controller.js
import { pool } from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role FROM users ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT id, name, email, role FROM users WHERE id = $1", [id]);
    if (!result.rows.length) return res.status(404).json({ message: "User not found" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
