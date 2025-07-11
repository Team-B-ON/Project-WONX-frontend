// src/pages/MyPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import MovieTag from '@/components/common/MovieTag';
import MovieSlider from '@/components/common/MovieSlider';
import EditProfileModal from '@/components/Profile/EditProfileModal';
import defaultAvatar from "@/assets/common/images/default-avatar.png";
import {
  FollowingListModal,
  FollowersListModal,
} from '@/components/Profile/ProfileModals';

import {
  getMyProfile,
  getRecent,
  getBookmarks,
  getProgress,
  getLiked,
  getReviews,
  UserProfile,
  MovieItem, getMoviesByIds, updateMyProfile,
} from '@/services/api/MyPage/mypage';
import MyReviewSlider from '@/components/MyPage/MyReviewSlider';
import { Movie } from '@/types/movie';
import { Review } from '@/types/review';

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  // --- 상태 정의 ---
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recent, setRecent] = useState<MovieItem[]>([]);
  const [bookmarks, setBookmarks] = useState<MovieItem[]>([]);
  const [progress, setProgress] = useState<MovieItem[]>([]);
  const [liked, setLiked] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewMovies, setReviewMovies] = useState<Movie[]>([]);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);
  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);

  const [tempName, setTempName] = useState('');
  const [tempAvatar, setTempAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  // --- 데이터 로드 ---
  useEffect(() => {
    (async () => {
      try {
        const me = await getMyProfile();
        console.log('👀 getMyProfile:', me);
        setProfile(me);

        const [r, b, p, l, rv] = await Promise.all([
          getRecent(),
          getBookmarks(),
          getProgress(),
          getLiked(),
          getReviews(),
        ]);
        setRecent(r);
        setBookmarks(b);
        setProgress(p);
        setLiked(l);
        setReviews(rv);

        const movieIds = rv.map(r => r.videoId);
        const mv = await getMoviesByIds(movieIds);
        setReviewMovies(mv);

      } catch (err) {
        console.error('마이페이지 데이터 로딩 실패:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // --- 로딩 / 에러 UI ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        로딩 중...
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        프로필 정보를 불러올 수 없습니다.
      </div>
    );
  }

  // --- 핸들러 ---
  const handleEditProfile = () => {
    setTempName(profile.nickname);
    setPreviewAvatar(null);
    setEditModalOpen(true);
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setTempAvatar(file);
    if (file) setPreviewAvatar(URL.createObjectURL(file));
  };
  const saveNewName = async () => {
    try {
      // 1) API 호출
      const updated = await updateMyProfile({
        nickname: tempName,
        // profileImageUrl: (파일 업로드 로직이 따로 있다면 URL을 여기로)
      })
      // 2) 화면 상태 갱신
      setProfile({
        ...profile!,
        nickname: updated.nickname,
        profileImageUrl: updated.profileImageUrl,
        // bio 등도 포함하고 싶으면 같이 넣어주고
      })
      setEditModalOpen(false)
    } catch (e) {
      alert('프로필 업데이트에 실패했습니다.')
    }
  };
  const handleShareProfile = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL이 복사되었습니다!');
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <main className="pt-[68px] px-8 pb-12 space-y-12">
        {/* 프로필 헤더 */}
        <ProfileHeader
          profilePictureUrl={ previewAvatar || profile.profileImageUrl || defaultAvatar }

          username={profile.nickname}
          followingCount={profile.followingCount}
          followersCount={profile.followerCount}
          onEditProfile={handleEditProfile}
          onShareProfile={handleShareProfile}
          onClickFollowing={() => setFollowingModalOpen(true)}
          onClickFollowers={() => setFollowersModalOpen(true)}
        />

        {/* 각각의 섹션 */}
        <section>
          <MovieTag
            title="최근 시청한 콘텐츠"
            onClickMore={() => navigate('/mypage/recent')}
            showMore
          />
          <MovieSlider movies={recent} />
        </section>

        <section>
          <MovieTag
            title="내가 찜한 콘텐츠"
            onClickMore={() => navigate('/mypage/bookmarks')}
            showMore
          />
          <MovieSlider movies={bookmarks} />
        </section>

        <section>
          <MovieTag
            title="시청 중인 콘텐츠"
            onClickMore={() => navigate('/mypage/progress')}
            showMore
          />
          <MovieSlider movies={progress} />
        </section>

        <section>
          <MovieTag
            title="좋아한 콘텐츠"
            onClickMore={() => navigate('/mypage/liked')}
            showMore
          />
          <MovieSlider movies={liked} />
        </section>

        <section>
          <MovieTag
            title="내 리뷰 모아보기"
            onClickMore={() => navigate('/mypage/reviews')}
            showMore
          />
          {/* MovieSlider 대신 MyReviewSlider */}
          <MyReviewSlider
            movies={reviewMovies}
            reviews={reviews}
          />
        </section>
      </main>

      {/* 모달들 */}
      {isFollowingModalOpen && (
        <FollowingListModal onClose={() => setFollowingModalOpen(false)} />
      )}
      {isFollowersModalOpen && (
        <FollowersListModal onClose={() => setFollowersModalOpen(false)} />
      )}
      {isEditModalOpen && (
        <EditProfileModal
          tempName={tempName}
          setTempName={setTempName}
          previewAvatar={previewAvatar}
          handleAvatarChange={handleAvatarChange}
          onSave={saveNewName}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyPage;
