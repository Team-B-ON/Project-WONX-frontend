import age12 from '@/assets/MovieDetailsPage/12-age-rating.png';
import age15 from '@/assets/MovieDetailsPage/15-age-rating.png';
import age19 from '@/assets/MovieDetailsPage/19-age-rating.svg';
import ageAll from '@/assets/MovieDetailsPage/all-age-rating.png';

export function getAgeRatingImage(ageRating: string | null | undefined): string {
  switch (ageRating) {
    case '12세이상관람가':
      return age12;
    case '15세이상관람가':
      return age15;
    case '청소년관람불가':
      return age19;
    case '전체관람가':
      return ageAll;
    default:
      return ageAll;
  }
}
