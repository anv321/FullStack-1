import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.users);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load users");
      }
    }
    fetchUsers();
  }, [token]);

  return (
    <div className="page">
      <h1>Admin Panel</h1>
      {error && <div className="error">{error}</div>}
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} – {u.email} – {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
}