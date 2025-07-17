// components/common/InfoBtn.tsx
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
      className="flex items-center px-3 sm:px-4 py-2 bg-gray-700 bg-opacity-70 text-white font-semibold rounded hover:bg-opacity-90 transition"
    >
      <img src={infoIcon} alt="Info" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
      상세 정보
    </button>
  );
};

export default InfoBtn;
