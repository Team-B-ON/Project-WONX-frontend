import { PersonDetailsResponse } from "@/types/personDetailsResponse";
import { UIEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import closeBtn from '@/assets/PersonDetailsPage/close-btn.svg';
import backBtn from '@/assets/PersonDetailsPage/back-arrow.svg';
import MovieCard from "@/components/common/MovieCard";

const person: PersonDetailsResponse = {  // 임시 데이터
  personId: 3,
  name: '양자경',
  role: ['director', 'screenwriter'],
  movies: [
    {
      movieId: 1,
      title: '에브리씽 에브리웨어 올앳원스',
      posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
      ageRating: '15세 이상 관람가',
      duration: 139,
      genre: ['긴박감 넘치는', '유쾌 발랄', 'SF 드라마 장르']
    },
    {
      movieId: 2,
      title: '선과 악의 학교',
      posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABU7mAHY9zKvuD62MpfER3-Y9etMBbLEUyZAdeiM8suvfg6myXEpYGQmiGaOHXVOpYbPfGYlUnatltH-B1_uSXcCshgnHG_wsv3mFlKZD7eH2Fqcwbgezjvr4yB_2z2pND90DOA.jpg?r=51f',
      ageRating: '12세 이상 관람가',
      duration: 189,
      genre: ['유쾌 발랄', '장대한 판타지의 세계', '상상의 나래']
    },
    {
      movieId: 2,
      title: '선과 악의 학교',
      posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABU7mAHY9zKvuD62MpfER3-Y9etMBbLEUyZAdeiM8suvfg6myXEpYGQmiGaOHXVOpYbPfGYlUnatltH-B1_uSXcCshgnHG_wsv3mFlKZD7eH2Fqcwbgezjvr4yB_2z2pND90DOA.jpg?r=51f',
      ageRating: '12세 이상 관람가',
      duration: 189,
      genre: ['유쾌 발랄', '장대한 판타지의 세계', '상상의 나래']
    },
    {
      movieId: 2,
      title: '선과 악의 학교',
      posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABU7mAHY9zKvuD62MpfER3-Y9etMBbLEUyZAdeiM8suvfg6myXEpYGQmiGaOHXVOpYbPfGYlUnatltH-B1_uSXcCshgnHG_wsv3mFlKZD7eH2Fqcwbgezjvr4yB_2z2pND90DOA.jpg?r=51f',
      ageRating: '12세 이상 관람가',
      duration: 189,
      genre: ['유쾌 발랄', '장대한 판타지의 세계', '상상의 나래']
    },
    {
      movieId: 2,
      title: '선과 악의 학교',
      posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABU7mAHY9zKvuD62MpfER3-Y9etMBbLEUyZAdeiM8suvfg6myXEpYGQmiGaOHXVOpYbPfGYlUnatltH-B1_uSXcCshgnHG_wsv3mFlKZD7eH2Fqcwbgezjvr4yB_2z2pND90DOA.jpg?r=51f',
      ageRating: '12세 이상 관람가',
      duration: 189,
      genre: ['유쾌 발랄', '장대한 판타지의 세계', '상상의 나래']
    },
    {
      movieId: 2,
      title: '선과 악의 학교',
      posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABU7mAHY9zKvuD62MpfER3-Y9etMBbLEUyZAdeiM8suvfg6myXEpYGQmiGaOHXVOpYbPfGYlUnatltH-B1_uSXcCshgnHG_wsv3mFlKZD7eH2Fqcwbgezjvr4yB_2z2pND90DOA.jpg?r=51f',
      ageRating: '12세 이상 관람가',
      duration: 189,
      genre: ['유쾌 발랄', '장대한 판타지의 세계', '상상의 나래']
    }
  ]
}

const PersonDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [atTop, setAtTop] = useState(true);

    const { id } = useParams();
    const selectedId = Number(id);
    const navigate = useNavigate();
    
    // 모달 열고 닫기 애니메이션
    useEffect(() => {
        if (selectedId === person.personId) {
            setShowModal(true);
            setTimeout(() => setAnimateModal(true), 10);
        } else {
            setAnimateModal(false);
        }
    }, [selectedId])

    const handleClose = () => {
        setAnimateModal(false);
        setTimeout(() => {
            setShowModal(false);
            navigate(-1);
        }, 200);
    };
    const handleBack = () => navigate(-1);

    // 모달 스크롤 위아래 여백 처리
    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const t = e.currentTarget;
        setAtTop(t.scrollTop === 0);
    };
    const insetTopClass = atTop ? 'top-[24px]' : 'top-0';

    if (!showModal) return null;

    return (
        <div className="relative z-[100]">
            <div 
            className={`fixed inset-0 z-[100] bg-black/60 transition-opacity duration-200 ease-in-out
                        ${animateModal ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
            >
                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute left-1/2 -translate-x-1/2 
                                w-[1280px] h-screen bottom-0 ${insetTopClass}
                                inset-0
                                overflow-y-auto scrollbar-hide
                                transition-all duration-200 ease-in-out transform
                                opacity-100 scale-100
                                ${animateModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                    {/* 모달 박스 */}
                    <div className="bg-[#161616] rounded-[6px]">
                        <div className="relative text-white w-full h-screen">

                            {/* 상단 버튼들 */}
                            <div className="flex flex-row justify-between px-[28.8px] pt-[28.8px]">
                                <img src={backBtn} 
                                    className="w-[18px] h-[18px] cursor-pointer"
                                    onClick={handleBack}
                                />
                                <img src={closeBtn} 
                                    className="w-[18px] h-[18px] cursor-pointer"
                                    onClick={handleClose}
                                />
                            </div>

                            {/* 인물 이름 */}
                            <p className="flex justify-center text-[48px] font-black pt-[26px] pb-[113.6px]">{person.name}</p>

                            {/* 영화 리스트 */}
                            <div className="px-[60px] flex justify-center">
                                <div className="grid [grid-template-columns:repeat(5,217.91px)] gap-[6.4px] overflow-visible">
                                    {person.movies.map((movie) => (
                                    <MovieCard
                                        key={movie.movieId}
                                        movie={{
                                        id: String(movie.movieId),
                                        title: movie.title,
                                        posterUrl: movie.posterUrl,
                                        durationMinutes: movie.duration,
                                        ageRating: movie.ageRating,
                                        genres: movie.genre.map((name, idx) => ({ id: String(idx), name })), // 간단한 변환
                                        }}
                                    />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonDetails;