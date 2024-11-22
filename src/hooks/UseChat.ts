import { useState, useEffect, useRef } from "react";

const serverUrl = import.meta.env.VITE_SERVER_URL as string;

interface Message {
    id: number;
    sender: string;
    text: string;
}

export function useChat () {
    const [messages, setMessages] = useState<Message[]>([]);
    const socketRef = useRef<WebSocket | null>(null);


    useEffect(() => {
        socketRef.current = new WebSocket(serverUrl);

        socketRef.current.onopen = () => {
            console.log("WebSocket connection established");
        };

        socketRef.current.onmessage = (event) => {
            const newMessage: Message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            socketRef.current?.close();
        };
    }, []);

    const sendMessage = (message: Message) => {
        socketRef.current?.send(JSON.stringify(message));
    };

    return { messages, sendMessage };
};