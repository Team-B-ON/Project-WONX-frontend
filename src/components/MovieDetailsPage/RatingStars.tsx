import { useState } from 'react';
import StarIcon from './StarIcon';

type RatingStarsProps = {
  rating: number;
  onChange?: (newRating: number) => void;
  readOnly?: boolean;
  size?: number;
};

const RatingStars = ({ 
    rating = 0, 
    onChange, 
    readOnly = false, 
    size = 25, 
}: RatingStarsProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const displayRating = readOnly ? rating : hoveredRating ?? rating;

  const handleClick = (index: number, isHalf: boolean) => {
    const newRating = (isHalf ? index + 0.5 : index + 1) * 2;
    onChange?.(newRating);
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const newHover = (x < width / 2 ? index + 0.5 : index + 1) * 2;
    setHoveredRating(newHover);
  };

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const fill =
          displayRating >= (index + 1) * 2
            ? "full"
            : displayRating >= index * 2 + 1
            ? "half"
            : "empty";

        return (
          <div
            key={index}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setHoveredRating(null)}
            onClick={(e) => {
              const { left, width } = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - left;
              handleClick(index, x < width / 2);
            }}
            className="relative"
            style={{
                width: size,
                height: size,
                cursor: readOnly ? 'default' : 'pointer',
            }}
          >
            {/* 빈 별 */}
            <div className="absolute inset-0">
              <StarIcon fill="#d1d5db" size={size} /> {/* gray-300 */}
            </div>

            {/* 채워진 별 (반만 보여줄 수도 있음) */}
            {fill !== "empty" && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: fill === "full" ? "100%" : "50%" }}
              >
                <StarIcon fill="#ef4444" size={size} /> {/* red-500 */}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;