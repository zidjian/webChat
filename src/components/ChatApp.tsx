import { useState } from "react";

import { useChat } from "../hooks/UseChat";
import { ChatMessage } from "./ChatMessage";
import { ChatWindow } from "./ChatWindow";
import { ChatInput } from "./ChatInput";

export function ChatApp() {
    const { messages, sendMessage } = useChat();
    const [localSender, setLocalSender] = useState("");
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        sendMessage({
            id: new Date().getTime(),
            sender: localSender,
            text: message,
        });
        setMessage("");
    };

    return (
        <div className="min-w-96 m-auto bg-[#9dbbfc] lg:rounded-xl lg:shadow-lg">
            <div className="p-4">
                <input
                    type="text"
                    value={localSender}
                    onChange={(e) => setLocalSender(e.target.value)}
                    className="w-full text-center rounded-xl p-4 text-[#2c2c2c] placeholder:text-[#646464] outline-none bg-[#9dbbfc] flex-grow"
                    placeholder="Escribe tu nombre..."
                />
            </div>
            <div className="bg-white rounded-xl p-6 min-h-[600px] max-h-[600px] flex flex-col gap-4">
                <ChatWindow>
                    {messages.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            message={msg.text}
                            sender={msg.sender}
                            local={msg.sender == localSender ? true : false}
                        />
                    ))}
                </ChatWindow>
                <ChatInput
                    handleSendMessage={handleSendMessage}
                    message={message}
                    setMessage={setMessage}
                    local={localSender ? true : false}
                />
            </div>
        </div>
    );
}
