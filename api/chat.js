export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { message } = req.body;

    return res.status(200).json({
      reply: "Server working 🚀 You said: " + message,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server crashed" });
  }
}