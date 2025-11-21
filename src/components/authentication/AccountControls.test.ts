import { expect, test, describe, beforeAll } from "vitest";
import { readFile } from "fs/promises";
import { resolve } from "path";

// Nota: AccountControls usa componentes de Clerk que no se pueden renderizar fácilmente en tests
// Por lo tanto, estos tests verifican la estructura del código fuente del componente

describe("AccountControls", () => {
  let sourceCode: string;

  beforeAll(async () => {
    const filePath = resolve(
      __dirname,
      "./AccountControls.astro",
    );
    sourceCode = await readFile(filePath, "utf-8");
  });

  describe("Imports", () => {
    test("Should import SignedIn from Clerk", () => {
      expect(sourceCode).toContain('import {');
      expect(sourceCode).toContain('SignedIn');
      expect(sourceCode).toContain('@clerk/astro/components');
    });

    test("Should import SignedOut from Clerk", () => {
      expect(sourceCode).toContain('SignedOut');
    });

    test("Should import UserButton from Clerk", () => {
      expect(sourceCode).toContain('UserButton');
    });

    test("Should import SignInButton from Clerk", () => {
      expect(sourceCode).toContain('SignInButton');
    });

    test("Should import AccountControls.css", () => {
      expect(sourceCode).toContain('./AccountControls.css');
    });
  });

  describe("Component Structure", () => {
    test("Should use SignedOut component", () => {
      expect(sourceCode).toContain('<SignedOut');
      expect(sourceCode).toContain('class="cl-signed-out"');
    });

    test("Should use SignedIn component", () => {
      expect(sourceCode).toContain('<SignedIn');
      expect(sourceCode).toContain('class="cl-signed-in"');
    });

    test("Should use SignInButton component", () => {
      expect(sourceCode).toContain('<SignInButton');
      expect(sourceCode).toContain('mode="modal"');
    });

    test("Should use UserButton component", () => {
      expect(sourceCode).toContain('<UserButton');
      expect(sourceCode).toContain('showName');
    });
  });

  describe("Button Configuration", () => {
    test("SignInButton should have modal mode", () => {
      expect(sourceCode).toMatch(/<SignInButton[^>]*mode="modal"/);
    });

    test("SignInButton should use asChild prop", () => {
      expect(sourceCode).toMatch(/<SignInButton[^>]*asChild/);
    });

    test("Button should have secondary class", () => {
      expect(sourceCode).toContain('class="button secondary"');
    });

    test("Button should have text 'Iniciar sesión'", () => {
      expect(sourceCode).toContain('Iniciar sesión');
    });
  });

  describe("Accessibility", () => {
    test("Button should have aria-label", () => {
      expect(sourceCode).toContain('aria-label="Iniciar sesión"');
    });

    test("SignedOut should have descriptive class", () => {
      expect(sourceCode).toContain('class="cl-signed-out"');
    });

    test("SignedIn should have descriptive class", () => {
      expect(sourceCode).toContain('class="cl-signed-in"');
    });
  });

  describe("UserButton Configuration", () => {
    test("UserButton should show name", () => {
      expect(sourceCode).toMatch(/<UserButton[^>]*showName/);
    });

    test("UserButton should be wrapped in SignedIn", () => {
      expect(sourceCode).toMatch(/<SignedIn[^>]*>.*<UserButton/s);
    });
  });

  describe("Code Quality", () => {
    test("Should have proper component structure", () => {
      expect(sourceCode).toContain('---');
      expect(sourceCode).toMatch(/---[\s\S]*---/);
    });

    test("Should have both authentication states", () => {
      const signedOutIndex = sourceCode.indexOf('<SignedOut');
      const signedInIndex = sourceCode.indexOf('<SignedIn');
      expect(signedOutIndex).toBeGreaterThan(-1);
      expect(signedInIndex).toBeGreaterThan(-1);
    });

    test("Should import all required Clerk components", () => {
      expect(sourceCode).toContain('SignedIn');
      expect(sourceCode).toContain('SignedOut');
      expect(sourceCode).toContain('UserButton');
      expect(sourceCode).toContain('SignInButton');
    });
  });
});
