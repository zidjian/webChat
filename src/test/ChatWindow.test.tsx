/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { ChatWindow } from "../components/ChatWindow";

describe("ChatWindow.tsx", () => {
    test("Deberia verificar que aparezca el contenido que se envia", () => {
        render(<ChatWindow>Test message</ChatWindow>);

        const message = screen.getByText(/Test message/i);

        expect(message).toBeInTheDocument();
    });
});
