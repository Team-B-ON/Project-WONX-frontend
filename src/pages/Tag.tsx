import React from 'react';
import MovieTag from '@/components/common/MovieTag';

const Tag = () => {
  return (
    <div className="bg-neutral-900 min-h-screen py-10 space-y-6">
      {/* 테스트용 MovieTag */}
      <MovieTag title="드라마" onClickMore={() => console.log('암울한 클릭')} />
      <MovieTag title="웃긴 미국 드라마" onClickMore={() => console.log('웃긴 클릭')} />
    </div>
  );
};

export default Tag;
