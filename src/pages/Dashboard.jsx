import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Real-time listener for SOS alerts
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
        <table className="w-full border border-gray-300 bg-white shadow-lg rounded">
          <thead>
            <tr className="bg-red-200 text-red-900">
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} className="text-center">
                <td className="p-3 border">{alert.email}</td>
                <td className="p-3 border">{alert.status}</td>
                <td className="p-3 border">
                  {alert.time?.toDate().toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
