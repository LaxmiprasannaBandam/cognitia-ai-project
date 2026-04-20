export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const message = body?.message;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    return res.status(200).json({
      reply: `Working 🚀 ${message}`,
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
    });
  }
}