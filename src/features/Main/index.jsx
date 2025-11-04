// Main/index.jsx

import { Container } from '@chakra-ui/react';
import Navigation from './components/Navigation';
import Banner from './components/Banner';

// 메인 페이지
const Main = () => {
  return (
    <Container>
      <Navigation />
      <Banner />
    </Container>
  );
};

export default Main;
