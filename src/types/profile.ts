// src/types/profile.ts
export interface PublicProfileDto {
  userId: string
  email: string
  nickname: string
  profileImageUrl: string
  bio: string
  joinedAt: string
  isMe: boolean
  isFollowing: boolean
  followerCount: number
  followingCount: number
}

export interface ProfileUpdateRequest {
  nickname?: string
  bio?: string
  profileImageUrl?: string
}