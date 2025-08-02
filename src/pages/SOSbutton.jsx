import { auth, db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function SOSbutton() {
  const sendSOS = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please log in first!");

    try {
      await addDoc(collection(db, "alerts"), {
        uid: user.uid,
        email: user.email,
        time: Timestamp.now(),
        status: "ACTIVE"
      });
      alert("🚨 SOS Alert Sent!");
    } catch (error) {
      alert("Error sending alert: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Emergency SOS</h1>
      <button
        className="bg-red-600 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-lg hover:bg-red-700 transition"
        onClick={sendSOS}
      >
        🚨 SEND SOS
      </button>
    </div>
  );
}
