// Main/index.jsx

import { Container } from '@chakra-ui/react';
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import Bestseller from './components/Bestseller';

// 메인 페이지
const Main = () => {
  const navItems = [
    { label: '국내도서' },
    { label: '해외도서' },
    { label: '11월 추천도서' },
    { label: '계절도서' },
  ];
  return (
    <Container>
      <Navigation items={navItems} activeIndex={0} sticky />
      <Banner />
      <Bestseller />
    </Container>
  );
};

export default Main;
