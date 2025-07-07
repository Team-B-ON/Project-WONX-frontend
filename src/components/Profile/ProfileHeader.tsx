// ProfileHeader.tsx

import React from 'react'
import { Edit2, Share2 } from 'lucide-react'

export type ProfileHeaderProps = {
  profilePictureUrl: string
  username: string
  followingCount: number
  followersCount: number
  onEditProfile: () => void
  onShareProfile: () => void
  onClickFollowing: () => void
  onClickFollowers: () => void
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
                                                       profilePictureUrl,
                                                       username,
                                                       followingCount,
                                                       followersCount,
                                                       onEditProfile,
                                                       onShareProfile,
                                                       onClickFollowing,
                                                       onClickFollowers,
                                                     }) => {
  // 중복되는 팔로잉/팔로워 정보를 배열로 관리
  const stats = [
    { label: '팔로잉', count: followingCount, onClick: onClickFollowing },
    { label: '팔로워', count: followersCount, onClick: onClickFollowers },
  ] as const

  return (
    <section className="bg-black py-8 px-12 justify-center mx-auto">
      <div className="flex justify-center items-center space-x-12 mb-8">
        <div className="flex-shrink-0">
          <img
            src={profilePictureUrl}
            alt={`${username} avatar`}
            className="w-40 h-40 rounded-full object-cover border border-gray-300"
          />
        </div>
        <div className="text-white">
          <h1 className="text-xl font-semibold mb-4">{username}</h1>
          <div className="flex space-x-7">
            {stats.map(({ label, count, onClick }) => (
              <div
                key={label}
                onClick={onClick}
                className="cursor-pointer"
              >
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-lg font-medium">{count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onEditProfile}
          aria-label="프로필 수정"
          className="w-40 flex items-center justify-center space-x-2 px-4 py-2 bg-red/20 hover:bg-white/30 border border-white/40 text-white text-sm font-medium transition-colors"
        >
          <Edit2 size={16} />
          <span>프로필 수정</span>
        </button>
        <button
          onClick={onShareProfile}
          aria-label="프로필 공유"
          className="w-40 flex items-center justify-center space-x-2 px-4 py-2 bg-red/20 hover:bg-white/30 border border-white/40 text-white text-sm font-medium transition-colors"
        >
          <Share2 size={16} />
          <span>프로필 공유</span>
        </button>
      </div>
    </section>
  )
}

export default ProfileHeader
