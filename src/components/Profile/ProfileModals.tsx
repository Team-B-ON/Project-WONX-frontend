import React from 'react'
import CloseButton from '@/assets/common/buttons/close-button.svg'

type ModalProps = {
  onClose: () => void
}

export const FollowingListModal: React.FC<ModalProps> = ({ onClose }) => {
  const dummyFollowing = ['user1', 'user2', 'user3', 'user4']

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
          {dummyFollowing.length === 0 ? (
            <p className="text-gray-400">표시할 유저가 없습니다.</p>
          ) : (
            dummyFollowing.map((user) => (
              <div
                key={user}
                className="bg-zinc-700 px-3 py-2 rounded hover:bg-zinc-600 transition"
              >
                {user}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export const FollowersListModal: React.FC<ModalProps> = ({ onClose }) => {
  const dummyFollowers = ['userA', 'userB', 'userC', 'userD']

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
          {dummyFollowers.length === 0 ? (
            <p className="text-gray-400">표시할 유저가 없습니다.</p>
          ) : (
            dummyFollowers.map((user) => (
              <div
                key={user}
                className="bg-zinc-700 px-3 py-2 rounded hover:bg-zinc-600 transition"
              >
                {user}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
