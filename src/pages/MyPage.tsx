import React, { useState, useMemo } from 'react'
import TopNavBar from '@/components/common/TopNavBar'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import MovieSlider from '@/components/common/MovieSlider'
import EditProfileModal from '@/components/Profile/EditProfileModal'
import { FollowingListModal, FollowersListModal } from '@/components/Profile/ProfileModals'
import type { Movie } from '@/types/movie'

// Movie 타입 보강 (genre 추가 필요)
type ExtendedMovie = Movie & {
  genre: string[]
}

const dummyMovies: ExtendedMovie[] = Array.from({ length: 18 }, (_, idx) => ({
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

const MyPage: React.FC = () => {
  const [username, setUsername] = useState('닉네임')
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [tempName, setTempName] = useState('')
  const [tempAvatar, setTempAvatar] = useState<File | null>(null)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false)
  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false)

  const profile = useMemo(() => ({
    nickname: username,
    followingsCount: 12,
    followersCount: 34,
  }), [username])

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

  const handleOpenFollowing = () => setFollowingModalOpen(true)
  const handleCloseFollowing = () => setFollowingModalOpen(false)
  const handleOpenFollowers = () => setFollowersModalOpen(true)
  const handleCloseFollowers = () => setFollowersModalOpen(false)

  return (
    <div className="min-h-screen bg-black">
      <TopNavBar />

      <main className="pt-[68px] px-8 pb-12 space-y-12">
        <ProfileHeader
          profilePictureUrl={
            previewAvatar ||
            'https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVy2_XUhT73OmjpVmwUCEHzqmQPr4KCzW2BDHesl4hzaFniV_jmE73qjSMbBnOCtq46IAH4q-QnoeR7k09shYfPQkWoSRfVpxWOA.png?r=962'
          }
          username={profile.nickname}
          followingCount={profile.followingsCount}
          followersCount={profile.followersCount}
          onEditProfile={handleEditProfile}
          onShareProfile={handleShareProfile}
          onClickFollowing={handleOpenFollowing}
          onClickFollowers={handleOpenFollowers}
        />

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

      {isFollowingModalOpen && (
        <FollowingListModal onClose={handleCloseFollowing} />
      )}

      {isFollowersModalOpen && (
        <FollowersListModal onClose={handleCloseFollowers} />
      )}

      {isEditModalOpen && (
        <EditProfileModal
          tempName={tempName}
          setTempName={setTempName}
          previewAvatar={previewAvatar}
          handleAvatarChange={handleAvatarChange}
          onSave={saveNewName}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  )
}

export default MyPage
