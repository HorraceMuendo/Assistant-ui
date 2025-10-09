import { useState } from "react";

export default function ChatRoom() {
  const [messages, setMessages] = useState([
    { sender: "ai", content: "Hi! Ask me anything." }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return alert("Not authenticated");

    const userMessage = { sender: "user", content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setLoading(true);

    // AI streaming setup
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}` // Replace with real OpenAI API key or proxy token
      },
      body: JSON.stringify({
        model: "gpt-4",
        stream: true,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userInput }
        ]
      })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let aiMessage = "";
    const newAIMessage = { sender: "ai", content: "" };
    setMessages(prev => [...prev, newAIMessage]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter(line => line.trim() !== "");

      for (const line of lines) {
        if (line === "data: [DONE]") break;

        if (line.startsWith("data: ")) {
          const data = JSON.parse(line.replace("data: ", ""));
          const delta = data.choices?.[0]?.delta?.content;
          if (delta) {
            aiMessage += delta;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1].content = aiMessage;
              return updated;
            });
          }
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto bg-base-200 p-4 rounded-lg space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`chat ${msg.sender === "user" ? "chat-end" : "chat-start"}`}>
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="chat chat-start">
            <div className="chat-bubble">Typing...</div>
          </div>
        )}
      </div>

      <div className="mt-4 flex">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1 mr-2"
        />
        <button className="btn btn-primary" onClick={sendMessage} disabled={!userInput.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}
