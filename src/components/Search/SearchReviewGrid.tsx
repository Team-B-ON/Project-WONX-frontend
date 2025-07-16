import { Link } from "react-router-dom";
import { ReviewSearchDto } from "@/types/searchResult";

interface SearchReviewGridProps {
  query: string;
  reviews: ReviewSearchDto[];
}

export default function SearchReviewGrid({ query, reviews }: SearchReviewGridProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-white text-xl font-bold">
        "{query}"에 대한 리뷰
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <Link
            key={review.id} // ✅ 수정: review.reviewId → review.id
            to={`/review/${review.id}?query=${encodeURIComponent(query)}`}
            className="block"
          >
            <div className="bg-zinc-800 rounded p-4 shadow hover:shadow-lg transition">
              {/* ✅ movieTitle과 posterUrl 사용 가능 */}
              <h4 className="text-white text-lg font-bold mb-1">
                {review.movieTitle}
              </h4>

              <p className="text-gray-300 text-sm mb-2 line-clamp-3">
                {review.content}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{review.author}</span>
                <span>⭐ {review.rating}/10</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
