// UseChat.test.ts
import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useChat } from "../hooks/UseChat";

describe("useChat", () => {
    let mockWebSocket: any;
    const mockServerUrl = "ws://localhost:8080"; // Updated URL

    beforeEach(() => {
        mockWebSocket = {
            onopen: vi.fn(),
            onmessage: vi.fn(),
            onerror: vi.fn(),
            onclose: vi.fn(),
            send: vi.fn(),
            close: vi.fn(),
        };
        vi.stubGlobal(
            "WebSocket",
            vi.fn(() => mockWebSocket)
        );
        vi.stubEnv("VITE_SERVER_URL", mockServerUrl);
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("Debería establecer la conexión con el websocket", () => {
        renderHook(() => useChat());
        expect(WebSocket).toHaveBeenCalledWith(mockServerUrl);
    });

    test("Debería añadir un nuevo mensaje al estado cuando es recibido", () => {
        const { result } = renderHook(() => useChat());

        act(() => {
            const message = {
                data: JSON.stringify({ id: 1, sender: "User", text: "Hello" }),
            };
            mockWebSocket.onmessage(message);
        });

        expect(result.current.messages).toHaveLength(1);
        expect(result.current.messages[0]).toEqual({
            id: 1,
            sender: "User",
            text: "Hello",
        });
    });

    test("Debería cerrar la conexión con el web socket", () => {
        const { unmount } = renderHook(() => useChat());
        unmount();
        expect(mockWebSocket.close).toHaveBeenCalled();
    });

    test("Debería enviar un mensaje a través del websocket", () => {
        const { result } = renderHook(() => useChat());
        const sampleMessage = { id: 2, sender: "User", text: "Hi there!" };

        act(() => {
            result.current.sendMessage(sampleMessage);
        });

        expect(mockWebSocket.send).toHaveBeenCalledWith(
            JSON.stringify(sampleMessage)
        );
    });
});
