/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { ChatInput } from "../components/ChatInput";

describe("ChatMessage.tsx", () => {
    test("Debería verificar que aparezcan los elementos del componente", () => {
        render(
            <ChatInput 
                handleSendMessage={() => {}} 
                message="" 
                setMessage={() => {}} 
                local={true} 
            />
        );

        const inputMessage = screen.getByPlaceholderText(/Escribe un mensaje.../i);
        const button = screen.getByRole("button");

        expect(inputMessage).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
});
