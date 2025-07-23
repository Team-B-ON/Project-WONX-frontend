interface ReviewCountBannerProps {
  reviewCount: number;
}

export default function ReviewCountBanner({ reviewCount }: ReviewCountBannerProps) {
  // 숫자 포맷팅 (1000단위 쉼표 찍기)
  const formattedCount = reviewCount.toLocaleString();

  return (
    <div className="bg-black py-6 mt-10 mb-5 flex justify-center items-center">
      <p className="text-lg text-white text-center">
        지금까지{' '}
        <span className="text-[#E50914] text-500 font-bold text-xl">★{formattedCount}</span>{' '}
        개의 평가가 쌓였어요.
      </p>
    </div>
  );
}
