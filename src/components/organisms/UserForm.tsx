import React, { useState } from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';

export interface UserFormValues {
  username: string;
  email: string;
  password?: string;
}

export interface UserFormProps {
  initialValues?: {
    username: string;
    email: string;
  };
  onSubmit: (values: UserFormValues) => void;
  submitLabel: string;
  errors?: Record<string, string>;
  showPassword?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  submitLabel,
  errors = {},
  showPassword = true,
}) => {
  const [username, setUsername] = useState(initialValues?.username || '');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const values: UserFormValues = {
      username,
      email,
    };
    if (showPassword) {
      values.password = password;
    }
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="ユーザー名"
        name="username"
        type="text"
        value={username}
        onChange={setUsername}
        error={errors.username}
        required
        placeholder="ユーザー名を入力"
      />
      
      <FormField
        label="メールアドレス"
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        required
        placeholder="email@example.com"
      />
      
      {showPassword && (
        <FormField
          label="パスワード"
          name="password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          required
          placeholder="8文字以上"
        />
      )}
      
      <Button type="submit" variant="primary" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
};
