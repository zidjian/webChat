interface ChatInputProps {
    handleSendMessage: () => void;
    message: string;
    setMessage: (value: string) => void;
    local: boolean;
}

export function ChatInput({
    handleSendMessage,
    message,
    setMessage,
    local
}: ChatInputProps) {
    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-xl p-4 text-[#5F6269] placeholder:text-[#B1B5BC] outline-none bg-[#F7F8FD] flex-grow"
                placeholder="Escribe un mensaje..."
            />
            <button
                onClick={handleSendMessage}
                className={` text-white p-3 rounded-full aspect-square ${
                local
                    ? "bg-[#3B82F6]"
                    : "bg-[#5a5a5a]"
            }`}
                disabled={!local ? true : false}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 50 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M47.9688 1.46875C48.7188 1.9375 49.0938 2.78125 48.8125 3.625L42.8125 44.125C42.7188 44.7812 42.3438 45.4375 41.6875 45.7188C41.4062 45.9062 41.0312 46.0938 40.6562 46.0938C40.2812 46.0938 40 46 39.7188 45.9062L30.5312 41.9688L20.125 48.7188C19.75 48.9062 19.2812 49 18.9062 49C18.625 49 18.25 48.9062 17.875 48.8125C17.125 48.3438 16.75 47.5938 16.75 46.75V36.1562L2.3125 30.1562C1.5625 29.7812 1 29.0312 1 28.1875C0.90625 27.3438 1.375 26.5 2.125 26.125L45.625 1.375C46.375 0.90625 47.3125 1 47.9688 1.46875ZM35.5938 12.25L8.3125 27.7188L18.0625 31.8438L35.5938 12.25ZM21.1562 42.625L25.4688 39.9062L21.1562 38.0312V42.625ZM38.875 40.5625L43.375 10.2812L22.375 33.625L38.875 40.5625Z"
                        fill="white"
                    />
                </svg>
            </button>
        </div>
    );
}
