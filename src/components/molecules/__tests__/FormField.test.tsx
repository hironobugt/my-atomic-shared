import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormField } from '../FormField';

describe('FormField', () => {
  it('renders label and input', () => {
    render(
      <FormField
        label="Username"
        name="username"
        value=""
        onChange={() => {}}
      />
    );
    
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        error="Invalid email"
      />
    );
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('shows required indicator when required is true', () => {
    render(
      <FormField
        label="Password"
        name="password"
        value=""
        onChange={() => {}}
        required
      />
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <FormField
        label="Username"
        name="username"
        value=""
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'newuser' } });
    
    expect(handleChange).toHaveBeenCalledWith('newuser');
  });
});
