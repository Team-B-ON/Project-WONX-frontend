import { UIEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import closeBtn from '@/assets/PersonDetailsPage/close-btn.svg';
import backBtn from '@/assets/PersonDetailsPage/back-arrow.svg';
import listBtn from '@/assets/GenreDetailsPage/list-not-hovered.svg';
import gridBtn from '@/assets/GenreDetailsPage/grid-not-hovered.svg';
import listBtnHovered from '@/assets/GenreDetailsPage/list-hovered.svg';
import gridBtnHovered from '@/assets/GenreDetailsPage/grid-hovered.svg';
import gridIcon from '@/assets/GenreDetailsPage/grid-icon.svg';
import GridView from "@/components/GenreDetailsPage/GridView";
import ListView from "@/components/GenreDetailsPage/ListView";
import { getGenresGroupedBy, getSortedGenres } from "@/services/api/GenreDetailsPage/genres";
import { GenreGridResponse, GenreListResponse } from "@/types/genreDetailsResponse";

const GenreDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [atTop, setAtTop] = useState(true);

    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [isListHovered, setIsListHovered] = useState(false);
    const [isGridHovered, setIsGridHovered] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortOption, setSortOption] = useState('추천 콘텐츠');
    const sortOptions = ['추천 콘텐츠', '출시일순', '오름차순(ㄱ~Z)', '내림차순(Z~ㄱ)'];

    const [genreGrid, setGenreGrid] = useState<GenreGridResponse | null>(null);
    const [genreList, setGenreList] = useState<GenreListResponse | null>(null);
    const [loading, setLoading] = useState(true);

    // 뷰 버튼 호버링
    useEffect(() => {
        if (viewMode === 'list') {
        setIsGridHovered(false);
        } else {
        setIsListHovered(false);
        }
    }, [viewMode]);

    // sortOpiton -> API 파라미터 변환
    const mapSortOptionToParam = (option: string): 'default' | 'releaseDateDesc' | 'releaseDateAsc' | 'titleAsc' | 'titleDesc' => {
        switch (option) {
            case '추천 콘텐츠':
                return 'default';
            case '출시일순':
                return 'releaseDateDesc';
            case '오름차순(ㄱ~Z)':
                return 'titleAsc';
            case '내림차순(Z~ㄱ)':
                return 'titleDesc';
            default:
                return 'default';
        }
    };

    const { id } = useParams();
    const selectedId = id;
    const navigate = useNavigate();

    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation || location;

    useEffect(() => {
    if (showModal && location.pathname !== `/genre/${selectedId}`) {
        setAnimateModal(false);
        setTimeout(() => {
            setShowModal(false);
            navigate(-1);
        }, 200);
    }
    }, [location.pathname]);

    useEffect(() => {
        if (!selectedId) return;
        setShowModal(true);
        setTimeout(() => setAnimateModal(true), 10);
    }, [selectedId]);

    // API 호출 - 장르별 영화 목록 조회: 정렬 뷰
    useEffect(() => {
        const fetchSorted = async () => {
            try {
                setLoading(true);
                const sortParam = mapSortOptionToParam(sortOption);
                const data = await getSortedGenres(selectedId, 0, 100, sortParam);
                setGenreGrid(data);
            }
            catch (err) {
                console.error("정렬 목록 불러오기 실패: ", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSorted();
    }, [selectedId, sortOption, viewMode]);

    // API 호출 - 장르별 영화 목록 조회: 그룹 뷰
    useEffect(() => {
        if (!selectedId) return;

        const fetchGrouped = async () => {
            try {
                setLoading(true);
                const data = await getGenresGroupedBy(selectedId);
                setGenreList(data);
            } catch (err) {
                console.error("그룹 목록 불러오기 실패: ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchGrouped();
    }, [selectedId, viewMode]);

    const handleClose = () => {
        setAnimateModal(false);
        setTimeout(() => {
            setShowModal(false);
            if (backgroundLocation && backgroundLocation !== location.pathname) {
                navigate(backgroundLocation);
            } else {
                navigate(-1);
            }
        }, 200);
    };
    const handleBack = () => navigate(-1);

    // 모달 스크롤 위아래 여백 처리
    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const t = e.currentTarget;
        setAtTop(t.scrollTop === 0);
    };
    const insetTopClass = atTop ? 'top-[24px]' : 'top-0';

    if (!showModal || loading) return null;

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
                                w-[1280px] bottom-0 ${insetTopClass}
                                inset-0 max-h-screen min-h-screen
                                overflow-y-auto scrollbar-hide
                                transition-all duration-200 ease-in-out transform
                                opacity-100 scale-100
                                ${animateModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                    {/* 모달 박스 */}
                    <div className="bg-[#161616] rounded-[6px] w-full pb-[50px]">
                        <div className="relative text-white w-full">

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

                            {/* 장르 이름 */}
                            <p className="flex justify-center text-[48px] font-black pt-[26px] pb-[113.6px]">
                                {viewMode === 'list' ? genreList?.genreName : genreGrid?.genreName}
                            </p>

                            {/* 뷰 모드 선택 버튼 */}
                            <div className="flex flex-row justify-end pr-[64.5px]">
                                {/* 리스트 */}
                                <img
                                    src={viewMode === 'list' || isListHovered ? listBtnHovered : listBtn}
                                    onMouseEnter={() => setIsListHovered(true)}
                                    onMouseLeave={() => setIsListHovered(false)}
                                    onClick={() => {
                                        if (viewMode !== 'list') setViewMode('list');
                                    }}
                                    className="cursor-pointer transition-all duration-100"
                                />

                                {/* 그리드 */}
                                {viewMode !== 'grid' && (
                                    <img src={isGridHovered ? gridBtnHovered : gridBtn}
                                        onMouseEnter={() => setIsGridHovered(true)}
                                        onMouseLeave={() => setIsGridHovered(false)}
                                        onClick={() => setViewMode('grid')}
                                        className="cursor-pointer transition-all duration-100"
                                    />
                                )}
                                {/* 그리드 - 정렬 드롭다운 */}
                                {viewMode === 'grid' && (
                                    <div className="relative w-[284px] h-[29px]">
                                        <div
                                            className="flex items-center justify-between px-[16px] py-[5px] 
                                                        border-[0.55px] border-white cursor-pointer 
                                                        bg-[rgba(0,0,0,0.7)] text-white text-[12px]"
                                            onClick={() => setSortOpen(o => !o)}
                                        >
                                            <div className="flex flex-row gap-[16px]">
                                                <img src={gridIcon} />
                                                <span>{sortOption}</span>
                                            </div>
                                            <span>▼</span>
                                        </div>
                                        {sortOpen && (
                                            <div className="absolute right-0 top-6 w-[240px] h-[85.14px] 
                                                            py-[5px] px-[10px]
                                                            border-[0.55px] border-white
                                                            bg-[rgba(0,0,0,0.9)] opacity-90
                                                            text-[12px] z-10">
                                            {sortOptions.map(opt => (
                                                <div
                                                key={opt}
                                                onClick={() => { setSortOption(opt); setSortOpen(false); }}
                                                className={`hover:underline cursor-pointer`}
                                                >
                                                {opt}
                                                </div>
                                            ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* 영화 리스트 */}
                            {viewMode === 'list' ? (
                                genreList && <ListView genre={genreList} backgroundLocation={backgroundLocation} onRequestClose={handleClose} />
                            ) : (
                                genreGrid && <GridView genre={genreGrid} backgroundLocation={backgroundLocation} onRequestClose={handleClose} />
                            )}                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenreDetails;