import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserForm } from '../UserForm';

describe('UserForm', () => {
  it('renders all form fields', () => {
    render(
      <UserForm
        onSubmit={() => {}}
        submitLabel="Submit"
      />
    );
    
    expect(screen.getByLabelText(/ユーザー名/)).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('populates initial values', () => {
    render(
      <UserForm
        initialValues={{ username: 'testuser', email: 'test@example.com' }}
        onSubmit={() => {}}
        submitLabel="Update"
      />
    );
    
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('calls onSubmit with form values', () => {
    const handleSubmit = vi.fn();
    render(
      <UserForm
        onSubmit={handleSubmit}
        submitLabel="Register"
      />
    );
    
    fireEvent.change(screen.getByLabelText(/ユーザー名/), {
      target: { value: 'newuser' },
    });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), {
      target: { value: 'new@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/パスワード/), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByText('Register'));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      username: 'newuser',
      email: 'new@example.com',
      password: 'password123',
    });
  });

  it('hides password field when showPassword is false', () => {
    render(
      <UserForm
        onSubmit={() => {}}
        submitLabel="Update"
        showPassword={false}
      />
    );
    
    expect(screen.queryByLabelText(/パスワード/)).not.toBeInTheDocument();
  });

  it('displays validation errors', () => {
    render(
      <UserForm
        onSubmit={() => {}}
        submitLabel="Submit"
        errors={{
          username: 'Username is required',
          email: 'Invalid email',
        }}
      />
    );
    
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
