/**
 * @jest-environment jsdom
 */

import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ChatApp } from "../components/ChatApp";
import { useChat } from "../hooks/UseChat";

vi.mock("../hooks/UseChat");

describe("ChatApp.tsx", () => {
    const mockUseChat = (overrides = {}) => {
        const sendMessageMock = vi.fn();
        vi.mocked(useChat).mockReturnValue({
            messages: [
                { id: 1, sender: "John", text: "Hola Mundo" },
            ],
            sendMessage: sendMessageMock,
            ...overrides,
        });
        return { sendMessageMock };
    };

    test("Debería mostrar el input para el sender", () => {
        mockUseChat();
        render(<ChatApp />);

        const inputSender = screen.getByPlaceholderText("Escribe tu nombre...");
        expect(inputSender).toBeInTheDocument();
    });

    test("Debería renderizar el componente ChatInput", () => {
        mockUseChat();
        render(<ChatApp />);

        const inputMessage = screen.getByPlaceholderText("Escribe un mensaje...");
        const button = screen.getByRole("button");

        expect(inputMessage).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test("Debería mostrar el componente ChatWindow", () => {
        mockUseChat();
        render(<ChatApp />);

        const chatWindow = screen.getByTestId("chat-window");
        expect(chatWindow).toBeInTheDocument();
    });

    test("Debería llamar a sendMessage al enviar un mensaje", () => {
        const { sendMessageMock } = mockUseChat();
        render(<ChatApp />);

        // Simula ingresar un nombre
        const inputSender = screen.getByPlaceholderText("Escribe tu nombre...");
        fireEvent.change(inputSender, { target: { value: "John" } });

        // Simula ingresar un mensaje
        const inputMessage = screen.getByPlaceholderText("Escribe un mensaje...");
        fireEvent.change(inputMessage, { target: { value: "Hola Mundo" } });

        // Simula enviar el mensaje
        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(sendMessageMock).toHaveBeenCalledWith({
            id: expect.any(Number),
            sender: "John",
            text: "Hola Mundo",
        });
    });
});
