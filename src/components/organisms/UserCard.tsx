import React from 'react';
import { Button } from '../atoms/Button';

export interface UserCardProps {
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
  showActions?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{user.username}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-xs text-gray-500 mt-1">
          登録日: {formatDate(user.createdAt)}
        </p>
      </div>
      
      {showActions && (onEdit || onDelete) && (
        <div className="flex gap-2 mt-4">
          {onEdit && (
            <Button
              variant="secondary"
              onClick={() => onEdit(user.id)}
              className="flex-1"
            >
              編集
            </Button>
          )}
          {onDelete && (
            <Button
              variant="danger"
              onClick={() => onDelete(user.id)}
              className="flex-1"
            >
              削除
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
