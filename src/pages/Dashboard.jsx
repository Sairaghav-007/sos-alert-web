import { useEffect, useState } from "react";
import { db, auth } from "../firebase"; // ✅ make sure you import auth
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "alerts"), orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlerts(data);
    });

    return () => unsubscribe();
  }, []);

  const markResolved = async (id) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Not logged in");
      return;
    }

    try {
      const alertRef = doc(db, "alerts", id);
      await updateDoc(alertRef, {
        status: "RESOLVED",
        resolvedBy: currentUser.email,
        resolvedAt: serverTimestamp(),
      });
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const deleteAlert = async (id) => {
    if (!window.confirm("Are you sure you want to delete this alert?")) return;
    try {
      await deleteDoc(doc(db, "alerts", id));
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">🛡️ Admin - SOS Alerts Dashboard</h1>

      {alerts.length === 0 ? (
        <p className="text-gray-600">No alerts yet...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow-lg rounded text-sm">
            <thead className="bg-red-200 text-red-900">
              <tr>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Severity</th>
                <th className="p-3 border">Landmark</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Resolved By</th>
                <th className="p-3 border">Resolved At</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id} className="text-center hover:bg-gray-50">
                  <td className="p-3 border">{alert.email}</td>
                  <td className="p-3 border text-red-600 font-semibold">{alert.severity || "-"}</td>
                  <td className="p-3 border">{alert.landmark || "-"}</td>
                  <td className="p-3 border text-gray-500">
                    {alert.location?.lat && alert.location?.lng
                      ? `${alert.location.lat.toFixed(3)}, ${alert.location.lng.toFixed(3)}`
                      : "N/A"}
                  </td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        alert.status === "ACTIVE" ? "bg-red-500" : "bg-green-600"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </td>
                  <td className="p-3 border text-gray-600">
                    {alert.time?.toDate().toLocaleString()}
                  </td>
                  <td className="p-3 border">{alert.resolvedBy || "-"}</td>
                  <td className="p-3 border text-gray-500">
                    {alert.resolvedAt ? alert.resolvedAt.toDate().toLocaleString() : "-"}
                  </td>
                  <td className="p-3 border space-x-2">
                    {alert.status === "ACTIVE" && (
                      <button
                        onClick={() => markResolved(alert.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Resolve
                      </button>
                    )}
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
