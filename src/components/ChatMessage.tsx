interface ChatMessageProps {
    message: string;
    sender: string;
    local: boolean;
}

export function ChatMessage({ message, sender, local }: ChatMessageProps) {
    return (
        <div
            data-testid="chat-message"
            className={`
            ${local ? "self-end " : "self-start"}`}
        >
            {!local && <h2>{sender}</h2>}
            <p
                className={`
                    p-4 text-white max-w-60
                    ${
                        local
                            ? "bg-[#657FCC] rounded-t-3xl rounded-bl-3xl"
                            : "bg-[#5a5a5a] rounded-t-3xl rounded-br-3xl"
                    }`}
            >
                {message}
            </p>
        </div>
    );
}
