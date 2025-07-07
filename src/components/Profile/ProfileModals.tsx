import React from 'react'
import CloseButton from '@/assets/common/buttons/close-button.svg'

type ModalProps = {
  onClose: () => void
}

export const FollowingListModal: React.FC<ModalProps> = ({ onClose }) => {
  // TODO: 실제 팔로잉 리스트 데이터로 교체
  const dummyFollowing = ['user1', 'user2', 'user3', 'user4']

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-80 max-w-full p-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <img src={CloseButton} alt="닫기" className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold mb-2">팔로잉 목록</h3>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {dummyFollowing.map((user) => (
            <li key={user} className="p-2 border-b last:border-none">
              {user}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const FollowersListModal: React.FC<ModalProps> = ({ onClose }) => {
  // TODO: 실제 팔로워 리스트 데이터로 교체
  const dummyFollowers = ['userA', 'userB', 'userC', 'userD']

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-80 max-w-full p-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <img src={CloseButton} alt="닫기" className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold mb-2">팔로워 목록</h3>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {dummyFollowers.map((user) => (
            <li key={user} className="p-2 border-b last:border-none">
              {user}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
