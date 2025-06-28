import React from 'react';

type MovieTagProps = {
  title: string;
  onClickMore?: () => void;
  showMore?: boolean;
};

const MovieTag = ({ title, onClickMore, showMore = true }: MovieTagProps) => {
  return (
    <div className="flex items-center group space-x-2 cursor-pointer">
      <h2 className="text-[rgb(229,229,229)] group-hover:text-white text-xl font-bold">
        {title}
      </h2>

      {showMore && (
        <button
          onClick={onClickMore}
          className="text-sm text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          모두 보기 &gt;
        </button>
      )}
    </div>
  );
};

export default MovieTag;
