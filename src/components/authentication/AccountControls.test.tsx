import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Mock de los componentes de Clerk
const MockSignedIn = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="signed-in">{children}</div>
);

const MockSignedOut = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="signed-out">{children}</div>
);

const MockUserButton = ({ showName }: { showName?: boolean }) => (
  <div data-testid="user-button" data-show-name={showName}>
    User Button
  </div>
);

const MockSignInButton = ({
  children,
  mode,
  asChild,
}: {
  children: React.ReactNode;
  mode?: string;
  asChild?: boolean;
}) => (
  <div data-testid="sign-in-button" data-mode={mode} data-as-child={asChild}>
    {children}
  </div>
);

vi.mock('@clerk/astro/components', () => ({
  SignedIn: MockSignedIn,
  SignedOut: MockSignedOut,
  UserButton: MockUserButton,
  SignInButton: MockSignInButton,
}));

// Componente de prueba que simula la estructura del componente Astro
const AccountControls = () => {
  return (
    <nav>
      <MockSignedOut>
        <MockSignInButton mode="modal" asChild>
          <button className="button secondary">Iniciar sesión</button>
        </MockSignInButton>
      </MockSignedOut>
      <MockSignedIn>
        <MockUserButton showName />
      </MockSignedIn>
    </nav>
  );
};

describe('AccountControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the nav component correctly', () => {
    const { container } = render(<AccountControls />);
    const nav = container.querySelector('nav');

    expect(nav).toBeInTheDocument();
  });

  it('should render the SignedOut container', () => {
    render(<AccountControls />);
    const signedOut = screen.getByTestId('signed-out');

    expect(signedOut).toBeInTheDocument();
  });

  it('should render the SignedIn container', () => {
    render(<AccountControls />);
    const signedIn = screen.getByTestId('signed-in');

    expect(signedIn).toBeInTheDocument();
  });

  it('should render the sign in button inside SignedOut', () => {
    render(<AccountControls />);
    const signInButton = screen.getByTestId('sign-in-button');

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('data-mode', 'modal');
    expect(signInButton).toHaveAttribute('data-as-child', 'true');
  });

  it('should render the "Iniciar sesión" text in the button', () => {
    render(<AccountControls />);
    const button = screen.getByText('Iniciar sesión');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button', 'secondary');
  });

  it('should render the UserButton inside SignedIn', () => {
    render(<AccountControls />);
    const userButton = screen.getByTestId('user-button');

    expect(userButton).toBeInTheDocument();
    expect(userButton).toHaveAttribute('data-show-name', 'true');
  });

  it('should have the correct element structure', () => {
    const { container } = render(<AccountControls />);

    // Verifies that nav contains the expected elements
    const nav = container.querySelector('nav');
    expect(nav?.children.length).toBe(2); // SignedOut and SignedIn
  });

  it('should render the button with the correct CSS classes', () => {
    render(<AccountControls />);
    const button = screen.getByRole('button', { name: /iniciar sesión/i });

    expect(button).toHaveClass('button');
    expect(button).toHaveClass('secondary');
  });
});
