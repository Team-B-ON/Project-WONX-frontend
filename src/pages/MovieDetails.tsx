import React, { useRef, useState, UIEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import type { Movie } from '@/types/movie';
import { formatDuration } from '@/utils/timeFormat';
import { getYearFromDate } from '@/utils/getYearFromDate';
import RelatedMovieCard from '@/components/MovieDetailsPage/RelatedMovieCard';
import Reviews from '@/components/MovieDetailsPage/Reviews';
import PlayVideoBtn from '@/components/common/PlayVideoBtn';
import closeButton from '@/assets/common/buttons/close-button.svg';
import addButton from '@/assets/common/buttons/add-button.svg'
import thumbUpButton from '@/assets/common/buttons/thumbup-button.svg'
import addHoveredButton from '@/assets/common/buttons-hovered/add-btn.svg';
import thumbUpHoveredButton from '@/assets/common/buttons-hovered/thumbup-btn.svg';
import bookmarkButton from '@/assets/MovieDetailsPage/bookmark-check-btn.svg';
import bookmarkHoveredButton from '@/assets/MovieDetailsPage/bookmark-check-hovered.svg';
import likeButton from '@/assets/MovieDetailsPage/thumbup-fill-btn.svg';
import likeHoveredButton from '@/assets/MovieDetailsPage/thumbup-fill-hovered.svg';
import ageRating15 from '@/assets/MovieDetailsPage/15-age-rating.png';
import { useMovieDetail } from '@/hooks/MovieDetailsPage/useMovieDetail';
import { useModalAnimation } from '@/hooks/MovieDetailsPage/useModalAnimation';

// const movie: Movie = {  // 임시 데이터
//   id: '1',
//   title: '에브리씽 에브리웨어 올앳원스',
//   description: '운영하는 세탁소의 세무 조사를 받던 중, 수많은 평행우주를 넘나드는 기막힌 여정에 뛰어드는 에블린. 그 모든 세계에서 변하지 않는 단 하나는, 복잡하지만 가족을 향한 그녀의 사랑이다.',
//   durationMinutes: 139,
//   releaseDate: '2022-01-01',
//   posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
//   mainImg: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABcKDNGSwWwb7my_KdhpHkufJnvx2whSRQfcr2N-caISV2HjYJTQ9lJx1jKp5VJzJbVIAffekOk0f6WUK3XGBaGfwz-ZsD9rnWLPJ.webp?r=b05',
//   ageRating: '15세 이상 관람가',
//   genres: [
//     { id: '1', name: '긴박감 넘치는' },
//     { id: '2', name: '유쾌발랄' },
//     { id: '3', name: 'SF 드라마 장르' }
//   ],
//   directors: [
//     { id: '1', name: '다니엘 콴' },
//     { id: '2', name: '다니엘 샤이너트' }
//   ],
//   screenwriters: [
//     { id: '5', name: '다니엘 콴' }
//   ],
//   actors: [
//     { id: '3', name: '양자경' },
//     { id: '4', name: '키 호이 콴' }
//   ]
// };

const relatedMovie: Movie = {  // 임시 데이터
  id: '2',
  title: '타오르는 여인의 초상',
  description: '화가 마리안느. 결혼을 앞둔 딸의 초상화를 그려달라는 귀족 부인의 의뢰를 받는다. 단, 딸 몰래 그려야 한다. 비밀스레 모델을 관찰하던 마리안느는 어느덧 초상화 주인공의 시선을 느낀다.',
  durationMinutes: 121,
  releaseDate: '2020-01-01',
  posterUrl: 'https://occ-0-3076-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABbQyop_-8RQ2VA-l9KezQJbJLdr1DcEboWvzR1YWRGUGCEI5dhdvesMdM8aei40c0h18SUhur1B2l99EW56rrXLL6LJIMiZslZc.webp?r=8fd',
  ageRating: '15세 이상 관람가',
};

const MovieDetails = () => {
  const [isAddHovered, setIsAddHovered] = useState(false);
  const [isThumbHovered, setIsThumbHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // 라우팅 훅
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedId = searchParams.get('id');

  // API 호출 - 영화 상세 정보 조회
  const { movie, loading, error } = useMovieDetail(selectedId);
  const isOpen = Boolean(selectedId);
  const { show, animate } = useModalAnimation(isOpen);
  console.log("param id:", selectedId);
  console.log("movie.id:", movie?.id);

  // 모달 닫기 함수
  const closeModal = () => {
    searchParams.delete('id');
    navigate(`${location.pathname}?${searchParams.toString()}`)
  };

  // 모달 스크롤 위아래 여백 처리
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    setAtTop(t.scrollTop === 0);
    setAtBottom(t.scrollHeight - t.scrollTop === t.clientHeight);
  };

  const insetTopClass = atTop ? 'top-[30px]' : 'top-0';
  const insetBottomClass = atBottom ? 'bottom-[30px]' : 'bottom-0';

  // 로딩/에러 상태 처리
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 text-white">
        로딩 중...
      </div>
    );
  }
  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 text-white">
        {error}
      </div>
    );
  }
  if (!show || !movie) return null;

  // 감독/각본/출연 목록
  const directors = movie.directors;
  const screenwriters = movie.screenwriters;
  const actors = movie.actors;
  //const genres = movie.genres;

  return(
    <div 
      className={`fixed inset-0 z-100 bg-black/60
                transition-opacity duration-200 ease-in-out
                ${animate ? 'opacity-100' : 'opacity-0'}`}
      onClick={closeModal}
    >
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={(e) => e.stopPropagation()}
        className={`absolute left-1/2 -translate-x-1/2 
                    w-[850px] ${insetTopClass} ${insetBottomClass} 
                    overflow-y-auto scrollbar-hide
                    transition-all duration-200 ease-in-out transform
                    ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                    `}>
        {/* 모달 박스 */}
        <div className="bg-[rgb(20,20,20)] rounded-[6px]">
        <div className="relative text-white w-full h-[479.34px]">

          {/* 대표 이미지 섹션*/}
          <img
            src={movie.mainImg}
            alt={movie.title}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-[6px]"
          />

          {/* 그라데이션 오버레이 */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[rgb(20,20,20)] to-transparent z-10" />
          <img
            src={closeButton}
            onClick={closeModal}
            className="absolute top-[16px] right-[15.5px] cursor-pointer z-10"
          />
          {/* 제목 */}
          <h2 className="absolute bottom-[131px] left-[48px] z-10 text-2xl font-extrabold mb-2">{movie?.title}</h2>
          {/* 버튼 */}
          <div className="absolute bottom-[64px] left-[48px] z-10 flex flex-row gap-[8px]">
            <PlayVideoBtn />
            <img 
              src={
                isBookmarked
                ? (isAddHovered ? bookmarkHoveredButton : bookmarkButton)
                : (isAddHovered ? addHoveredButton : addButton)
              } 
              className="w-[40.7px] h-[40.7px] cursor-pointer"
              onMouseEnter={() => setIsAddHovered(true)}
              onMouseLeave={() => setIsAddHovered(false)}
              onClick={() => setIsBookmarked(prev => !prev)}
            />
            <img 
              src={
                isLiked
                ? (isThumbHovered ? likeHoveredButton : likeButton)
                : (isThumbHovered ? thumbUpHoveredButton : thumbUpButton)
              } 
              className="w-[40.7px] h-[40.7px] cursor-pointer"
              onMouseEnter={() => setIsThumbHovered(true)}
              onMouseLeave={() => setIsThumbHovered(false)}
              onClick={() => setIsLiked(prev => !prev)}
            />
          </div>
        </div>

        {/* 영화 정보 섹션 */}
        <div className="px-[48px] text-white">
          
          {/* 기본 정보 */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="flex flex-row gap-[8px] text-[rgb(188,188,188)]">
                <p>{getYearFromDate(movie?.releaseDate ?? '')}</p>
                <p>{formatDuration(movie.durationMinutes ?? 0)}</p>
              </div>
              <img src={ageRating15} className="w-[32px] h-[32px] mt-[1px]"/>
              <p className="pt-[28.8px] pb-[11.27px] w-[471.33px] text-[16px] leading-[26px]">{movie?.description}</p>
            </div>
            {/* 출연/장르 */}
            <div className="flex flex-col text-[rgb(119,119,119)] text-[14px] gap-[14px] w-[240px]">
              <p>출연: 
                {actors.slice(0, 3).map((actor, index) => (
                  <Link key={actor.id} to={`/person/${actor.id}`} state={{ backgroundLocation: location }}>
                    <span
                      key={index}
                      className="text-white pl-[4px] hover:underline cursor-pointer"
                    >
                      {actor.name}
                      {index < actors.length - 1 && ','}
                    </span>
                  </Link>
                ))}
              </p>
              <p>장르: 
                {movie.genres.map((genre, index) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.id}`}
                    state={{ backgroundLocation: location }}
                    className="text-white pl-[4px] hover:underline cursor-pointer"
                  >
                    {genre.name}
                    {index < movie.genres.length - 1 && ','}
                  </Link>
                ))}
              </p>
            </div>
          </div>

          {/* 함께 시청된 콘텐츠 */}
          <div className="pt-[48px]">
            <p className="font-semibold text-[24px] pb-[20px]">함께 시청된 콘텐츠</p>
            <div className="grid grid-cols-3 gap-[16px]">
              {[...Array(15)].map((_, index) => (
                <RelatedMovieCard key={index} movie={relatedMovie}/>
              ))}
            </div>
          </div>

          {/* 리뷰란 */}
          <Reviews />

          {/* 영화 상세 정보 */}
          <div className="pt-[92px] pb-[65px]">
            <p className="text-[24px] font-medium pb-[20px]">{movie.title} 상세 정보</p>
            <div className="text-[#777] text-[14px] leading-[20px] break-words">
              <p className="mt-[7px] mr-[7px] mb-[7px] ml-0">감독: 
                <span className="text-white pl-[4px]">
                  {directors.length > 0
                    ? directors?.map((person, index) => (
                      <Link
                        key={person.id}
                        to={`/person/${person.id}`}
                        state={{ backgroundLocation: location }}
                        className="hover:underline cursor-pointer"
                      >
                        {person.name}
                        {index < directors.length - 1 && ', '}
                      </Link>
                    ))
                  : '정보 없음'}
                </span>
              </p>
              <p className="mt-[7px] mr-[7px] mb-[7px] ml-0">출연: 
                <span className="text-white pl-[4px]">
                  {actors.length > 0
                    ? actors.map((person, index) => (
                      <Link
                        key={person.id}
                        to={`/person/${person.id}`}
                        state={{ backgroundLocation: location }}
                        className="hover:underline cursor-pointer"
                      >
                        {person.name}
                        {index < actors.length - 1 && ', '}
                      </Link>
                    ))
                  : '정보 없음'}
                </span>
              </p>
              <p className="mt-[7px] mr-[7px] mb-[7px] ml-0">각본: 
                <span className="text-white pl-[4px]">
                  {screenwriters.length > 0
                    ? screenwriters.map((person, index) => (
                      <Link
                        key={person.id}
                        to={`/person/${person.id}`}
                        state={{ backgroundLocation: location }}
                        className="hover:underline cursor-pointer"
                      >
                        {person.name}
                        {index < screenwriters.length - 1 && ', '}
                      </Link>
                    ))
                  : '정보 없음'}
                </span>
              </p>
              <p className="mt-[7px] mr-[7px] mb-[7px] ml-0">장르: 
                {movie.genres.length > 0 ? (
                  movie.genres.map((genre, idx) => (
                    <Link
                      key={genre.id}
                      to={`/genre/${genre.id}`}
                      state={{ backgroundLocation: location }}
                      className="text-white pl-[4px] hover:underline cursor-pointer"
                    >
                      {genre.name}
                      {idx < movie.genres.length - 1 && ', '}
                    </Link>
                  ))
                ) : (
                  <span className="text-white pl-[4px]">정보 없음</span>
                )}
              </p>
              <div className="mt-[7px] mr-[7px] mb-[7px] ml-0 flex items-start">
                <span>관람등급:</span>
                <img src={ageRating15} className="ml-[14px] mr-[19.6px] w-[28px] h-[28px]"/>
                <span className="text-white pt-[3px]">{movie.ageRating}</span>
              </div>
            </div>
          </div>

          <div className="mt-[30px]"></div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;