import { BadgeType } from '@/components/common/badge';
import { ThumbsUp, ArrowUpRight, Star, Sparkles, Flame } from 'lucide-react';

export interface OrderItem {
  id: number;
  category: string;
  title: string;
  description: string;
  image?: string;
  price: number;
  shortcut?: boolean;
  titlePrefix?: string;
  badge?: BadgeType;
}

export const ITEMS: OrderItem[] = [
  // COFFEE
  {
    id: 1,
    category: 'COFFEE',
    title: '아메리카노 Americano',
    description: '진한 에스프레소에 뜨거운 물을 더한 커피',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // 커피
    price: 4000,
    badge: { title: '사장님 추천', color: 'red', icon: ThumbsUp },
  },
  {
    id: 2,
    category: 'COFFEE',
    title: '카페라떼 Cafe Latte',
    description: '부드러운 우유와 에스프레소의 조화',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80', // 라떼
    price: 4500,
  },
  {
    id: 3,
    category: 'COFFEE',
    title: '바닐라라떼 Vanilla Latte',
    description: '달콤한 바닐라 시럽이 들어간 라떼',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80', // 바닐라라떼
    price: 4800,
    badge: { title: 'BEST', color: 'gray', icon: Star },
  },
  {
    id: 4,
    category: 'COFFEE',
    title: '콜드브루 Cold Brew',
    description: '차가운 물로 천천히 추출한 커피',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // 콜드브루
    price: 5000,
  },
  // DESSERT
  {
    id: 5,
    category: 'DESSERT',
    title: '티라미수 Tiramisu',
    description: '이탈리아 정통 디저트',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // 티라미수
    price: 6500,
    badge: { title: 'NEW', color: 'green', icon: Sparkles },
  },
  {
    id: 6,
    category: 'DESSERT',
    title: '마카롱 Macaron',
    description: '달콤하고 부드러운 프랑스식 디저트',
    image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80', // 마카롱
    price: 3000,
  },
  {
    id: 7,
    category: 'DESSERT',
    title: '허니브레드 Honey Bread',
    description: '달콤한 꿀과 부드러운 브레드',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // 허니브레드
    price: 7000,
  },
  // CAKE
  {
    id: 8,
    category: 'CAKE',
    title: '치즈케이크 Cheesecake',
    description: '진한 치즈의 풍미',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // 치즈케이크
    price: 6000,
  },
  {
    id: 9,
    category: 'CAKE',
    title: '초코케이크 Chocolate Cake',
    description: '진한 초콜릿 케이크',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80', // 초코케이크
    price: 6500,
  },
  {
    id: 10,
    category: 'CAKE',
    title: '당근케이크 Carrot Cake',
    description: '달콤한 당근과 크림치즈',
    image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400', // 당근케이크
    price: 6300,
  },
  // BEER
  {
    id: 11,
    category: 'BEER',
    title: '브로큰 차지 Broken Charge',
    description: '',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', // 맥주
    price: 5000,
  },
  {
    id: 12,
    category: 'BEER',
    title: '골든에일 Golden Ale',
    description: '상큼한 풍미와 황금빛 컬러',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // 골든에일
    price: 5500,
  },
  {
    id: 13,
    category: 'BEER',
    title: 'IPA',
    description: '홉의 쌉싸름함이 매력적인 맥주',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', // IPA
    price: 6000,
    badge: { title: '인기 급상승', color: 'orange', icon: Flame },
  },
  {
    id: 14,
    category: 'BEER',
    title: '스타우트 Stout',
    description: '깊은 풍미의 흑맥주',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // 스타우트
    price: 6000,
  },
  // SPECIAL DRINKS
  {
    id: 15,
    category: 'SPECIAL DRINKS',
    title: '자몽에이드 Grapefruit Ade',
    description: '상큼한 자몽이 들어간 에이드',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // 자몽에이드
    price: 5500,
  },
  {
    id: 16,
    category: 'SPECIAL DRINKS',
    title: '레몬에이드 Lemon Ade',
    description: '상큼한 레몬이 들어간 에이드',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80', // 레몬에이드
    price: 5500,
  },
  {
    id: 17,
    category: 'SPECIAL DRINKS',
    title: '청포도에이드 Green Grape Ade',
    description: '달콤한 청포도 에이드',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // 청포도에이드
    price: 5500,
  },
  // DINING
  {
    id: 18,
    category: 'DINING',
    title: '감바스 Gamba',
    description: '새우와 마늘, 올리브오일의 조화',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // 감바스
    price: 12000,
  },
  {
    id: 19,
    category: 'DINING',
    title: '치킨윙 Chicken Wing',
    description: '바삭하고 매콤한 치킨윙',
    image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400', // 치킨윙
    price: 13000,
    badge: { title: '추천 수 1위', color: 'blue', icon: ArrowUpRight },
  },
  {
    id: 20,
    category: 'DINING',
    title: '감자튀김 French Fries',
    description: '바삭한 감자튀김',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // 감자튀김
    price: 7000,
  },
];
