import React from 'react';
import MovieCard from '@/components/common/MovieCard';
import type { Movie } from '@/types/movie';

const MovieDetails = () => {
  const movie: Movie = {  // 임시 데이터
    id: '1',
    title: '에브리씽 에브리웨어 올앳원스',
    description: '운영하는 세탁소의 세무 조사를 받던 중, 수많은 평행우주를 넘나드는 기막힌 여정에 뛰어드는 에블린.',
    durationMinutes: 139,
    releaseDate: '2022-01-01',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
    ageRating: '15세 이상 관람가',
    genre: ['긴박감 넘치는', '유쾌발랄', 'SF 드라마 장르']
  };

    return(
        <div className="grid grid-cols-4 gap-6">
            <MovieCard key={movie.id} movie={movie} />
        </div>
    );
};

export default MovieDetails;