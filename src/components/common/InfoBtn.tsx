import { useLocation, useNavigate } from 'react-router-dom';
import infoIcon from '@/assets/common/buttons/arrowdown-button.svg';
import { Movie } from '@/types/movie';

interface InfoBtnProps {
  movie: Movie;
}

const InfoBtn = ({ movie }: InfoBtnProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    const params = new URLSearchParams(location.search);
    params.set('id', movie.id);
    navigate(
      {
        pathname: location.pathname,
        search: `?${params.toString()}`
      },
      { state: { backgroundLocation: location } }
    );
  };

  return (
    <button
      onClick={handleClick}
      className="w-[148.02px] h-[43.19px] rounded-[4px] 
                 bg-gray-700 text-white hover:bg-opacity-90 
                 flex items-center justify-center gap-[10px]
                 font-medium text-[19.2px] cursor-pointer"
    >
      <img src={infoIcon} alt="상세 정보" className="w-[29px] h-[29px]" />
      상세 정보
    </button>
  );
};

export default InfoBtn;
