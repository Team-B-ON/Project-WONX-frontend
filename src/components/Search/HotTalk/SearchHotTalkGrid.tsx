import { hotTalk } from "@/types/HotTalk";

interface SearchHotTalkGridProps {
  query: string; // 추가!
  reviews: hotTalk[];
}

export default function SearchHotTalkGrid({ query, reviews }: SearchHotTalkGridProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-white text-xl font-bold">
        @{query} 에 대한 리뷰
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-zinc-800 rounded p-4 shadow hover:shadow-lg transition"
          >
            <h4 className="text-white text-lg font-bold mb-1">{review.movieTitle}</h4>
            <p className="text-gray-300 text-sm mb-2 line-clamp-3">
              {review.content}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>작성자: {review.author}</span>
              <span>⭐ {review.rating}/5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
