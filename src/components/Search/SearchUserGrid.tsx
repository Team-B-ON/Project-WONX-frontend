import { Link } from "react-router-dom";
import { User } from '@/types/user';

interface SearchUserGridProps {
  query: string;
  users: User[];
}

export default function SearchUserGrid({ query, users }: SearchUserGridProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-white text-xl font-bold">
        @{query} 님과 관련된 유저
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="w-full bg-zinc-800 rounded p-4 shadow hover:shadow-lg transition flex items-center space-x-4"
          >
            <img
              src={user.avatarUrl || '/default-avatar.png'}
              alt={user.nickname}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-white text-lg font-bold">{user.nickname}</p>
              <Link
                to={`/user/${encodeURIComponent(user.nickname)}`}
                className="mt-1 text-sm text-pink-500 hover:underline inline-block"
              >
                프로필 보기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
