export default function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    return res.status(200).json({
      reply: "Working 🚀 " + message,
    });
  }

  res.status(405).json({ error: "Only POST allowed" });
}