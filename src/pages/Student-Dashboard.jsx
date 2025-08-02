import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function StudentDashboard() {
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">🚨 SOS Alerts Dashboard</h1>

      {alerts.length === 0 ? (
        <p className="text-gray-600">No alerts yet...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow-lg rounded">
            <thead>
              <tr className="bg-red-200 text-red-900 text-sm">
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Severity</th>
                <th className="p-3 border">Landmark</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Time</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id} className="text-center text-sm hover:bg-red-50">
                  <td className="p-3 border">{alert.email}</td>
                  <td className="p-3 border font-semibold text-red-600">{alert.severity || "Medium"}</td>
                  <td className="p-3 border">{alert.landmark || "-"}</td>
                  <td className="p-3 border text-gray-600">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
