import { GenreGridResponse, GenreListResponse } from "@/types/genreDetailsResponse";

export const mockGenreList: GenreListResponse = {  // 임시 데이터
    genreId: 2,
    genreName: '유쾌발랄',
    offset: 0,
    limit: 6,
    hasNext: true,
    groupBy: 'subgenre',
    groups: [
        {
            subgenre: '힐링',
            subgenreId: 11,
            movies: [
                {
                movieId: 111,
                title: '작은 아씨들',
                posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfFhm6NUTSeyhZEByIRUE78YDviF8KVCwX7URF_vzOco4wcR9PWs_z57IwGeKu8lJwIQuuUSO2Sw11JIuGI8u1SOwLp68BpQnhY.webp?r=ad3',
                isBookmarked: true,
                isLiked: false,
                ageRating: '12세 이상 관람가',
                duration: 135,
                genre: ['힐링', '향수 어린', '가족']
                },
                {
                movieId: 115,
                title: '마녀 배달부 키키',
                posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABaReiB6Yuk0eKqsX9E3ttzH_9jGrdOjuEaYc9y4ah1_yFHZ3OMelm0qW-lkM6dyCjDKCPwY4mBG6a0qojeCPb_Q15KcPwdNSipk.webp?r=d19',
                isBookmarked: false,
                isLiked: true,
                ageRating: '전체 관람가',
                duration: 111,
                genre: ['힐링', '상상의 나래']
                },
                {
                movieId: 115,
                title: '마녀 배달부 키키',
                posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABaReiB6Yuk0eKqsX9E3ttzH_9jGrdOjuEaYc9y4ah1_yFHZ3OMelm0qW-lkM6dyCjDKCPwY4mBG6a0qojeCPb_Q15KcPwdNSipk.webp?r=d19',
                isBookmarked: false,
                isLiked: true,
                ageRating: '전체 관람가',
                duration: 111,
                genre: ['힐링', '상상의 나래']
                },
                {
                movieId: 115,
                title: '마녀 배달부 키키',
                posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABaReiB6Yuk0eKqsX9E3ttzH_9jGrdOjuEaYc9y4ah1_yFHZ3OMelm0qW-lkM6dyCjDKCPwY4mBG6a0qojeCPb_Q15KcPwdNSipk.webp?r=d19',
                isBookmarked: false,
                isLiked: true,
                ageRating: '전체 관람가',
                duration: 111,
                genre: ['힐링', '상상의 나래']
                },
                {
                movieId: 115,
                title: '마녀 배달부 키키',
                posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABaReiB6Yuk0eKqsX9E3ttzH_9jGrdOjuEaYc9y4ah1_yFHZ3OMelm0qW-lkM6dyCjDKCPwY4mBG6a0qojeCPb_Q15KcPwdNSipk.webp?r=d19',
                isBookmarked: false,
                isLiked: true,
                ageRating: '전체 관람가',
                duration: 111,
                genre: ['힐링', '상상의 나래']
                },
                {
                movieId: 115,
                title: '마녀 배달부 키키',
                posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABaReiB6Yuk0eKqsX9E3ttzH_9jGrdOjuEaYc9y4ah1_yFHZ3OMelm0qW-lkM6dyCjDKCPwY4mBG6a0qojeCPb_Q15KcPwdNSipk.webp?r=d19',
                isBookmarked: false,
                isLiked: true,
                ageRating: '전체 관람가',
                duration: 111,
                genre: ['힐링', '상상의 나래']
                }
            ]
        },
        {
        subgenre: '청춘 드라마',
        subgenreId: 12,
        movies: [
            {
            movieId: 113,
            title: '빌어먹을 세상따위',
            posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABTz6uAMn6Wp6tfMdJXZYtfmfU2k_llK4Es8w1ych36hpvHsvv302kQti_pDX4lJPZknNL4raS37vkRG7ocSjhF317gcosPgBvJEZdEIAHZ_s-6B567nL4Lf10WeqxFersLu5.jpg?r=63b',
            isBookmarked: false,
            isLiked: true,
            ageRating: '19세 이상 관람가',
            duration: 113,
            genre: ['드라마', '청춘 드라마']
            },
            {
            movieId: 117,
            title: '아이 엠 낫 오케이',
            posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABTiG4O892LkqVNcOm6yhfGHfKIgEPdqjyOVfMoIbW0PPN-I47ZM23LDr1WzYHsmNR3HTVifAdhlrS81H0-AfBrYbrIWSsErNLdSGdKuAM0rnyiHRSnfnu8UBWLhMnXUa3L2f.jpg?r=575',
            isBookmarked: true,
            isLiked: true,
            ageRating: '19세 이상 관람가',
            duration: 129,
            genre: ['청춘 드라마', '청소년 시리즈']
            }
        ]
        }
    ]
}

export const mockGenreGrid: GenreGridResponse = {  // 임시 데이터
    genreId: 2,
    genreName: '유쾌발랄',
    offset: 0,
    limit: 100,
    sort: 'releaseDateDesc',
    hasNext: true,
    results: [
        {
        movieId: 111,
        title: '작은 아씨들',
        posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfFhm6NUTSeyhZEByIRUE78YDviF8KVCwX7URF_vzOco4wcR9PWs_z57IwGeKu8lJwIQuuUSO2Sw11JIuGI8u1SOwLp68BpQnhY.webp?r=ad3',
        isBookmarked: false,
        isLiked: true,
        ageRating: '12세 이상 관람가',
        duration: 135,
        genre: ['힐링', '향수 어린', '가족']
        },
        {
        movieId: 115,
        title: '마녀 배달부 키키',
        posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABaReiB6Yuk0eKqsX9E3ttzH_9jGrdOjuEaYc9y4ah1_yFHZ3OMelm0qW-lkM6dyCjDKCPwY4mBG6a0qojeCPb_Q15KcPwdNSipk.webp?r=d19',
        isBookmarked: false,
        isLiked: true,
        ageRating: '전체 관람가',
        duration: 111,
        genre: ['힐링', '상상의 나래']
        },
        {
        movieId: 115,
        title: '마녀 배달부 키키',
        posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABaReiB6Yuk0eKqsX9E3ttzH_9jGrdOjuEaYc9y4ah1_yFHZ3OMelm0qW-lkM6dyCjDKCPwY4mBG6a0qojeCPb_Q15KcPwdNSipk.webp?r=d19',
        isBookmarked: false,
        isLiked: true,
        ageRating: '전체 관람가',
        duration: 111,
        genre: ['힐링', '상상의 나래']
        },
        {
        movieId: 115,
        title: '마녀 배달부 키키',
        posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABaReiB6Yuk0eKqsX9E3ttzH_9jGrdOjuEaYc9y4ah1_yFHZ3OMelm0qW-lkM6dyCjDKCPwY4mBG6a0qojeCPb_Q15KcPwdNSipk.webp?r=d19',
        isBookmarked: false,
        isLiked: true,
        ageRating: '전체 관람가',
        duration: 111,
        genre: ['힐링', '상상의 나래']
        },
        {
        movieId: 115,
        title: '마녀 배달부 키키',
        posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABaReiB6Yuk0eKqsX9E3ttzH_9jGrdOjuEaYc9y4ah1_yFHZ3OMelm0qW-lkM6dyCjDKCPwY4mBG6a0qojeCPb_Q15KcPwdNSipk.webp?r=d19',
        isBookmarked: false,
        isLiked: true,
        ageRating: '전체 관람가',
        duration: 111,
        genre: ['힐링', '상상의 나래']
        },
        {
        movieId: 115,
        title: '마녀 배달부 키키',
        posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABaReiB6Yuk0eKqsX9E3ttzH_9jGrdOjuEaYc9y4ah1_yFHZ3OMelm0qW-lkM6dyCjDKCPwY4mBG6a0qojeCPb_Q15KcPwdNSipk.webp?r=d19',
        isBookmarked: false,
        isLiked: true,
        ageRating: '전체 관람가',
        duration: 111,
        genre: ['힐링', '상상의 나래']
        },
        {
        movieId: 113,
        title: '빌어먹을 세상따위',
        posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABTz6uAMn6Wp6tfMdJXZYtfmfU2k_llK4Es8w1ych36hpvHsvv302kQti_pDX4lJPZknNL4raS37vkRG7ocSjhF317gcosPgBvJEZdEIAHZ_s-6B567nL4Lf10WeqxFersLu5.jpg?r=63b',
        isBookmarked: false,
        isLiked: true,
        ageRating: '19세 이상 관람가',
        duration: 113,
        genre: ['드라마', '청춘 드라마']
        },
        {
        movieId: 117,
        title: '아이 엠 낫 오케이',
        posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABTiG4O892LkqVNcOm6yhfGHfKIgEPdqjyOVfMoIbW0PPN-I47ZM23LDr1WzYHsmNR3HTVifAdhlrS81H0-AfBrYbrIWSsErNLdSGdKuAM0rnyiHRSnfnu8UBWLhMnXUa3L2f.jpg?r=575',
        isBookmarked: true,
        isLiked: true,
        ageRating: '19세 이상 관람가',
        duration: 129,
        genre: ['청춘 드라마', '청소년 시리즈']
        }
    ]
}
