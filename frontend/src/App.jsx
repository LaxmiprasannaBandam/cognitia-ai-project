import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: userMessage },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { type: "ai", text: data.answer || "No response from AI" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Error connecting to server ❌" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>💬 AI Chatbot</h1>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={
              msg.type === "user"
                ? styles.userMsg
                : styles.aiMsg
            }
          >
            {msg.text}
          </div>
        ))}

        {loading && <div style={styles.aiMsg}>Thinking...</div>}
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
    paddingTop: "20px",
  },
  chatBox: {
    width: "60%",
    height: "70vh",
    overflowY: "auto",
    border: "1px solid #334155",
    padding: "10px",
    marginTop: "20px",
    borderRadius: "10px",
  },
  inputBox: {
    display: "flex",
    width: "60%",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    marginLeft: "10px",
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  userMsg: {
    textAlign: "right",
    margin: "5px",
    padding: "8px",
    background: "#2563eb",
    borderRadius: "8px",
  },
  aiMsg: {
    textAlign: "left",
    margin: "5px",
    padding: "8px",
    background: "#334155",
    borderRadius: "8px",
  },
};

export default App;