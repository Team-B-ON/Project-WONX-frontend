import React, { useEffect, useState } from 'react'
import CloseButton from '@/assets/common/buttons/close-button.svg'
import { getMyFollowings, getMyFollowers } from '@/services/api/MyPage/mypage'
import type { PublicProfileDto } from '@/types/profile'

type ModalProps = {
  onClose: () => void
}

export const FollowingListModal: React.FC<ModalProps> = ({ onClose }) => {
  const [list, setList] = useState<PublicProfileDto[] | null>(null)

  useEffect(() => {
    getMyFollowings()
      .then(setList)
      .catch(() => setList([]))
  }, [])

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-[420px] p-8 rounded relative max-h-[80vh] overflow-hidden">
        <img
          src={CloseButton}
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 cursor-pointer"
          alt="닫기"
        />
        <h3 className="text-white text-lg font-semibold mb-6">팔로잉 목록</h3>

        <div className="bg-zinc-800 rounded px-4 py-2 max-h-64 overflow-y-auto text-sm text-white space-y-2">
          {list === null
            ? <p className="text-gray-400">로딩 중…</p>
            : list.length === 0
              ? <p className="text-gray-400">표시할 유저가 없습니다.</p>
              : list.map(u => (
                <div key={u.userId}
                     className="bg-zinc-700 px-3 py-2 rounded hover:bg-zinc-600 flex items-center gap-2">
                  <img
                    src={u.profileImageUrl ?? '/images/default-avatar.png'}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{u.nickname}</span>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}

export const FollowersListModal: React.FC<ModalProps> = ({ onClose }) => {
  const [list, setList] = useState<PublicProfileDto[] | null>(null)

  useEffect(() => {
    getMyFollowers()
      .then(setList)
      .catch(() => setList([]))
  }, [])

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-[420px] p-8 rounded relative max-h-[80vh] overflow-hidden">
        <img
          src={CloseButton}
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 cursor-pointer"
          alt="닫기"
        />
        <h3 className="text-white text-lg font-semibold mb-6">팔로워 목록</h3>

        <div className="bg-zinc-800 rounded px-4 py-2 max-h-64 overflow-y-auto text-sm text-white space-y-2">
          {list === null
            ? <p className="text-gray-400">로딩 중…</p>
            : list.length === 0
              ? <p className="text-gray-400">표시할 유저가 없습니다.</p>
              : list.map(u => (
                <div key={u.userId}
                     className="bg-zinc-700 px-3 py-2 rounded hover:bg-zinc-600 flex items-center gap-2">
                  <img
                    src={u.profileImageUrl ?? '/images/default-avatar.png'}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{u.nickname}</span>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}
