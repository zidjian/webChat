/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { ChatWindow } from "../components/ChatWindow";

describe("ChatWindow.tsx", () => {
    test("Debería verificar que aparezca el contenido que se envía", () => {
        render(<ChatWindow>Test message</ChatWindow>);

        const message = screen.getByText(/Test message/i);

        expect(message).toBeInTheDocument();
    });
});
