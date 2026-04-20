export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    let body = req.body;

    // SAFETY FIX (VERY IMPORTANT)
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const message = body?.message || "empty";

    return res.status(200).json({
      reply: `Working 🚀 ${message}`,
    });

  } catch (error) {
    return res.status(200).json({
      reply: "Server fixed but fallback response",
    });
  }
}