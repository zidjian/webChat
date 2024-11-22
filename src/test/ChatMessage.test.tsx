/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { ChatMessage } from "../components/ChatMessage";

describe("ChatMessage.tsx", () => {
    test("Deberia verificar que aparezcan los mensajes", () => {
        render(<ChatMessage message="Test message" sender="User" local={true} />);

        const message = screen.getByText(/Test message/i);

        expect(message).toBeInTheDocument();
    });
});
