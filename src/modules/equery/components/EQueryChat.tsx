import { Avatar, Button, Input, List } from "antd";
import React, { useState } from "react";

const EQueryChat: React.FC = () => {
    const [messages, setMessages] = useState([
        { from: "ai", text: "Hola, soy tu asistente médico. ¿En qué puedo ayudarte?" }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMsg = { from: "user", text: input };
        const aiResponse = {
            from: "ai",
            text: "Esto es una respuesta simulada. En el futuro analizaré tus PDFs y timeline."
        };

        setMessages((prev) => [...prev, userMsg, aiResponse]);
        setInput("");
    };

    return (
        <div>
            <h2 style={{ marginBottom: 16 }}>Asistente (IA)</h2>

            <List
                bordered
                dataSource={messages}
                renderItem={(msg) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                msg.from === "ai"
                                    ? <Avatar style={{ backgroundColor: "#1890ff" }}>AI</Avatar>
                                    : <Avatar style={{ backgroundColor: "#52c41a" }}>Tú</Avatar>
                            }
                            title={msg.from === "ai" ? "Asistente" : "Tú"}
                            description={msg.text}
                        />
                    </List.Item>
                )}
                style={{ height: 300, overflowY: "auto", marginBottom: 12 }}
            />

            <Input.Group compact>
                <Input
                    style={{ width: "80%" }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe una pregunta..."
                    onPressEnter={sendMessage}
                />
                <Button type="primary" onClick={sendMessage}>Enviar</Button>
            </Input.Group>
        </div>
    );
};

export default EQueryChat;
