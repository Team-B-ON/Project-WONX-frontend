import React from 'react'
import TopNavBar from '@/components/common/TopNavBar'
import MovieSlider from '@/components/common/MovieSlider'
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
  return (
    <div className="min-h-screen bg-gray-900">
      <TopNavBar />
      <main className="pt-[68px] px-8 pb-12 space-y-12">

        {/* 프로필 헤더(아바타, 닉네임, 통계 등) 추후 추가 */}

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

        {/* 취향 분석 차트 – 추후 추가 */}
      </main>
    </div>
  )
}

export default MyPage;