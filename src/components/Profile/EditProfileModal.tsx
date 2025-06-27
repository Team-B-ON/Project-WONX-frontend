import React from 'react'
import CloseButton from '@/assets/common/buttons/close-button.svg'

type Props = {
  tempName: string
  setTempName: (v: string) => void
  previewAvatar: string | null
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: () => void
  onClose: () => void
}

const EditProfileModal: React.FC<Props> = ({
  tempName,
  setTempName,
  previewAvatar,
  handleAvatarChange,
  onSave,
  onClose,
}) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-zinc-900 w-[420px] p-8 relative">
      <img
        src={CloseButton}
        onClick={onClose}
        className="absolute top-3 right-3 w-10 h-10 cursor-pointer"
      />
      <h3 className="text-white text-lg mb-6">프로필 수정</h3>

      <label className="block mb-4">
        <span className="text-sm text-gray-400">프로필 사진</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="block w-full text-sm text-gray-300 file:bg-red-600 file:text-white
                     file:px-3 file:py-1 file:border-0 file:cursor-pointer"
        />
      </label>

      {previewAvatar && (
        <img
          src={previewAvatar}
          className="w-28 h-28 rounded-full object-cover mx-auto mb-4"
        />
      )}

      <label className="block mb-6">
        <span className="text-sm text-gray-400">닉네임</span>
        <input
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          className="mt-1 w-full bg-zinc-800 text-white px-3 py-2 outline-none"
        />
      </label>

      <button
        onClick={onSave}
        className="w-full py-2 rounded bg-nfRed hover:bg-nfRed2 transition-colors text-white"
      >
        저장
      </button>
    </div>
  </div>
)

export default EditProfileModal
