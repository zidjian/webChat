interface ChatMessageProps {
    children: React.ReactNode;
}

export function ChatWindow({ children }: ChatMessageProps) {
    return (
        <div data-testid="chat-window" className="flex-grow flex flex-col gap-4 overflow-y-scroll no-scrollbar">
            {children}
        </div>
    );
}
