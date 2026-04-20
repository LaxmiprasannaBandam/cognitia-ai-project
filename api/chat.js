export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({ reply: "Only POST allowed" });
    }

    const body = req.body || {};
    const message = body.message || "empty";

    return res.status(200).json({
      reply: "Working 🚀 " + message,
    });

  } catch (err) {
    return res.status(200).json({
      reply: "Fallback response (server safe mode)",
    });
  }
}