const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");

admin.initializeApp();

const accountSid = "AC4199238bbef9619aa7719382d40fb9b2";
const authToken = "2f3382e422913dfd794cae6e55cf9b48";
const fromPhone = "+16509104601";
const client = twilio(accountSid, authToken);

exports.sendSosAlert = functions.https.onCall(async (data, context) => {
  console.log("Function called with data:", JSON.stringify(data));
  console.log("Context.auth:", context.auth);
  const { message } = data;
  console.log("Received SOS message:", message);

  if (!message || typeof message !== "string" || message.trim() === "") {
    throw new functions.https.HttpsError("invalid-argument", "Message is required");
  }
  

  try {
    const snapshot = await admin.firestore().collection("admins").get();

    // ✅ Use the correct field name from Firestore: "mobile"
    const numbers = snapshot.docs.map((doc) => doc.data().mobile);

    await Promise.all(
      numbers.map((number) =>
        client.messages.create({
          body: message,
          from: fromPhone,
          to: number,
        })
      )
    );

    return {
      success: true,
      sentTo: numbers.length,
      message: "SMS sent successfully!",
    };
  } catch (err) {
    console.error("Twilio SMS send failed:", err);
    throw new functions.https.HttpsError("internal", err.message);
  }
});
