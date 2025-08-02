import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function SOSbutton() {
  const [severity, setSeverity] = useState("Medium");
  const [landmark, setLandmark] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });

  // Automatically get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation error:", error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const sendSOS = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please log in first!");

    if (!landmark.trim()) return alert("Please enter your landmark.");

    try {
      await addDoc(collection(db, "alerts"), {
        uid: user.uid,
        email: user.email,
        time: Timestamp.now(),
        severity,
        landmark,
        location,
        status: "ACTIVE",
      });
      alert("🚨 SOS Alert Sent!");
    } catch (error) {
      alert("Error sending alert: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 px-4">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Emergency SOS</h1>

      {/* Severity selection */}
      <label className="mb-2 font-semibold text-lg">Select Severity</label>
      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        className="mb-4 p-3 rounded border text-lg w-full max-w-sm"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>

      {/* Landmark input */}
      <input
        type="text"
        placeholder="Enter nearby landmark"
        value={landmark}
        onChange={(e) => setLandmark(e.target.value)}
        className="mb-4 p-3 rounded border w-full max-w-sm text-lg"
      />

      {/* SOS Button */}
      <button
        className="bg-red-600 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-lg hover:bg-red-700 transition w-full max-w-sm"
        onClick={sendSOS}
      >
        🚨 SEND SOS
      </button>

      {/* Location Display (Optional) */}
      {location.lat && location.lng && (
        <p className="mt-4 text-sm text-gray-600">
          Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}
