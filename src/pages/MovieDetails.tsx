import React, { useRef, useState, UIEvent, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import type { Movie } from '@/types/movie';
import { formatDuration } from '@/utils/timeFormat';
import { getYearFromDate } from '@/utils/getYearFromDate';
import { getAgeRatingImage } from '@/utils/getAgeRatingImage';
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
import { useMovieDetail } from '@/hooks/MovieDetailsPage/useMovieDetail';
import { useModalAnimation } from '@/hooks/MovieDetailsPage/useModalAnimation';
import { postBookmark, deleteBookmark } from '@/services/api/MovieDetailsPage/bookmark';
import { postLike, deleteLike } from '@/services/api/MovieDetailsPage/like';
import { getRelatedMovies } from "@/services/api/MovieDetailsPage/movie";

const MovieDetails = () => {
  const [isAddHovered, setIsAddHovered] = useState(false);
  const [isThumbHovered, setIsThumbHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  
  // 라우팅 훅
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedId = searchParams.get('id');

  // API 호출 - 영화 상세 정보 조회
  const { movie, loading, error } = useMovieDetail(selectedId);
  const isOpen = Boolean(selectedId);
  const { show, animate } = useModalAnimation(isOpen);

  // API 호출 - 북마크 처리
  const handleBookmarkClick = async () => {
    try {
      if (isBookmarked) {
        const res = await deleteBookmark(movie.id);
        setIsBookmarked(res.bookmarked);
      } else {
        const res = await postBookmark(movie.id);
        setIsBookmarked(res.bookmarked);
      }
    } catch (e) {
      console.error("북마크 처리 실패", e);
    }
  };

  // API 호출 - 좋아요 처리
  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        const res = await deleteLike(movie.id);
        setIsLiked(res.liked);
      } else {
        const res = await postLike(movie.id);
        setIsLiked(res.liked);
      }
    } catch (e) {
      console.error("좋아요 처리 실패", e);
    }
  };

  // 북마크, 좋아요 상태 관리
  useEffect(() => {
    if (movie) {
      setIsBookmarked(movie.isBookmarked ?? false);
      setIsLiked(movie.isLiked ?? false);
    }
  }, [movie]);

  // API 호출 - 함께 시청된 콘텐츠 조회
  useEffect(() => {
      const fetchRelated = async () => {
          if (!movie) return;
          try {
              const { results } = await getRelatedMovies(movie.id);
              setRelatedMovies(results);
          } catch (e) {
              console.error('함께 시청된 콘텐츠 불러오기 실패', e);
          }
      };

      fetchRelated();
  }, [movie]);

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
  const directors = movie?.directors ?? [];
  const screenwriters = movie?.screenwriters ?? [];
  const actors = movie?.actors ?? [];
  const displayedActors = actors.slice(0, 3);

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
              onClick={handleBookmarkClick}
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
              onClick={handleLikeClick}
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
                <p>{formatDuration(movie?.durationMinutes ?? 0)}</p>
              </div>
              <img src={getAgeRatingImage(movie?.ageRating ?? '')} alt="관람 등급" className="w-[32px] h-[32px] mt-[1px]"/>
              <p className="pt-[28.8px] pb-[11.27px] w-[471.33px] text-[16px] leading-[26px]">{movie?.description}</p>
            </div>
            {/* 출연/장르 */}
            <div className="flex flex-col text-[rgb(119,119,119)] text-[14px] gap-[14px] w-[240px]">
              <p>출연: 
                {displayedActors.map((actor, index) => (
                  <Link key={actor.id} to={`/person/${actor.id}`} state={{ backgroundLocation: location }}>
                    <span
                      key={index}
                      className="text-white pl-[4px] hover:underline cursor-pointer"
                    >
                      {actor.name}
                      {index < displayedActors.length - 1 && ','}
                    </span>
                  </Link>
                ))}
              </p>
              <p>장르: 
                {movie?.genres?.map((genre, index) => (
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
              {relatedMovies.map((movie) => (
                <RelatedMovieCard key={movie.id} movie={movie}/>
              ))}
            </div>
          </div>

          {/* 리뷰란 */}
          <Reviews movieId={movie.id} />

          {/* 영화 상세 정보 */}
          <div className="pt-[92px] pb-[65px]">
            <p className="text-[24px] font-medium pb-[20px]">{movie?.title} 상세 정보</p>
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
                  movie?.genres?.map((genre, idx) => (
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
                <img src={getAgeRatingImage(movie?.ageRating ?? '')} className="ml-[14px] mr-[19.6px] w-[28px] h-[28px]"/>
                <span className="text-white pt-[3px]">{movie?.ageRating}</span>
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