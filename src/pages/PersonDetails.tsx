import { UIEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import closeBtn from '@/assets/PersonDetailsPage/close-btn.svg';
import backBtn from '@/assets/PersonDetailsPage/back-arrow.svg';
import MovieCard from "@/components/common/MovieCard";
import { getMoviePeople } from "@/services/api/PersonDetailsPage/people";
import { PersonDetailsResponse } from "@/types/personDetailsResponse";
import { Genre } from "@/types/genre";

const PersonDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [atTop, setAtTop] = useState(true);

    const { id } = useParams();
    const selectedId = id;
    const navigate = useNavigate();

    const [person, setPerson] = useState<PersonDetailsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    // API 호출 - 인물이 출연/제작한 영화 목록 조회
    useEffect(() => {
        if (!selectedId) return;
            
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getMoviePeople(selectedId);
                console.log("인물 데이터: ", data);
                setPerson(data);
                setShowModal(true);
                setTimeout(() => setAnimateModal(true), 10);
            }
            catch (err) {
                console.error("인물 정보 불러오기 실패: ", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedId]);

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

    if (!showModal || loading || !person) return null;

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
                                    {person?.movies?.map((movie) => (
                                        movie && (
                                            <MovieCard
                                                key={movie.movieId}
                                                movie={{
                                                    movieId: String(movie.movieId),
                                                    title: movie.title,
                                                    posterUrl: movie.posterUrl,
                                                    durationMinutes: movie.durationMinutes,
                                                    ageRating: movie.ageRating,
                                                    genres: movie.genres as Genre[],
                                                    bookmarked: movie.bookmarked,
                                                    liked: movie.liked
                                                }}
                                                onRequestClose={handleClose}
                                            />
                                        )
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