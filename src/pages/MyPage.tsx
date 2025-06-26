import React, { useState } from 'react'
import TopNavBar from '@/components/common/TopNavBar'
import ProfileHeader from '@/components/common/ProfileHeader'
import MovieSlider from '@/components/common/MovieSlider'
import CloseButton from '@/assets/common/buttons/close-button.svg'
import type { Movie } from '@/types/movie'

const dummyMovies: Movie[] = Array.from({ length: 18 }, (_, idx) => ({
  id: `${idx + 1}`,
  title: `영화 ${idx + 1}`,
  posterUrl:
    'https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABV4CF2PBJ2cLwMao0g2JGonHwyfwofN3t5ue5E8BN8RsgEyzeD09PV4jr5QcmlTdksokq_-yHM9FeNw6e7jhdJZ0ys0ypDsnSpw.webp?r=35c',
  description: '테스트용 설명',
  durationMinutes: 120 + idx,
  releaseDate: '2022-01-01',
  ageRating: '15세 이상 관람가',
  genre: ['SF', '액션', '코미디'].slice(0, (idx % 3) + 1),
}))

const wishList     = dummyMovies
const watchingNow  = dummyMovies.slice().reverse()
const watched      = dummyMovies
const liked        = dummyMovies.slice(0, 12)
const reviewMovies = dummyMovies.slice(6)

const MyPage = () => {
  const [username, setUsername] = useState('닉네임')
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [tempName, setTempName] = useState('')
  const [tempAvatar, setTempAvatar] = useState<File | null>(null)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)

  const handleEditProfile = () => {
    setTempName(username)
    setPreviewAvatar(null)
    setEditModalOpen(true)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setTempAvatar(file)
    if (file) {
      setPreviewAvatar(URL.createObjectURL(file))
    }
  }

  const saveNewName = () => {
    if (tempName.trim()) {
      setUsername(tempName)
      // 나중에 백엔드 API 호출 추가
      setEditModalOpen(false)
    }
  }

  const handleShareProfile = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('URL이 복사되었습니다. 친구에게 프로필을 공유해보세요!')
    } catch {
      alert('다시 시도해주세요!' + window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <TopNavBar />

      <main className="pt-[68px] px-8 pb-12 space-y-12">
        {/* 프로필 헤더 */}
        <ProfileHeader
          profilePictureUrl={previewAvatar || 'https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVy2_XUhT73OmjpVmwUCEHzqmQPr4KCzW2BDHesl4hzaFniV_jmE73qjSMbBnOCtq46IAH4q-QnoeR7k09shYfPQkWoSRfVpxWOA.png?r=962'}
          username={username}
          followingCount={123}
          followersCount={456}
          onEditProfile={handleEditProfile}
          onShareProfile={handleShareProfile}
        />

        {/* 편집 모달 */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="relative bg-gray-800 p-6 rounded-md w-full max-w-sm">
              <button
                onClick={() => setEditModalOpen(false)}
                className="absolute top-3 right-3 p-1"
                aria-label="닫기"
              >
                <img src={CloseButton} alt="닫기" className="w-15 h-15" />
              </button>

              <h2 className="text-white text-lg mb-4">프로필 변경하기</h2>

              {/* 프로필 사진 변경 */}
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 mb-2 rounded-full overflow-hidden border border-gray-600">
                  <img
                    src={previewAvatar || 'https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVy2_XUhT73OmjpVmwUCEHzqmQPr4KCzW2BDHesl4hzaFniV_jmE73qjSMbBnOCtq46IAH4q-QnoeR7k09shYfPQkWoSRfVpxWOA.png?r=962'}
                    alt="avatar preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="text-sm text-white underline cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  사진 변경
                </label>
              </div>

              {/* 닉네임 변경 */}
              <input
                type="text"
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                className="
                  w-full px-3 py-2 mb-4
                  bg-gray-700 text-white
                  border border-gray-600 rounded
                  focus:outline-none focus:border-white
                "
                placeholder="변경하실 닉네임을 입력하세요."
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={saveNewName}
                  disabled={!tempName.trim()}
                  className={`
                    px-4 py-2
                    ${tempName.trim()
                      ? 'bg-red-600 hover:bg-red-500'
                      : 'bg-gray-600 cursor-not-allowed'}
                    text-white rounded
                  `}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}

        <section>
          <h2 className="text-white text-lg font-semibold mb-2">내가 찜한 콘텐츠</h2>
          <MovieSlider movies={wishList} />
        </section>

        <section>
          <h2 className="text-white text-lg font-semibold mb-2">시청 중인 콘텐츠</h2>
          <MovieSlider movies={watchingNow} />
        </section>

        <section>
          <h2 className="text-white text-lg font-semibold mb-2">시청한 콘텐츠</h2>
          <MovieSlider movies={watched} />
        </section>

        <section>
          <h2 className="text-white text-lg font-semibold mb-2">좋아한 콘텐츠</h2>
          <MovieSlider movies={liked} />
        </section>

        <section>
          <h2 className="text-white text-lg font-semibold mb-2">내 리뷰 모아보기</h2>
          <MovieSlider movies={reviewMovies} />
        </section>
      </main>
    </div>
  )
}

export default MyPage
