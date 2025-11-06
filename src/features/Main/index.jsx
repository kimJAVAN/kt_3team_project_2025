// Main/index.jsx

import { Container } from '@chakra-ui/react';
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import Bestseller from './components/Bestseller';
import Recommend from './components/Recommend';

// 메인 페이지
const Main = () => {
  return (
    <Container
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="60px"
      maxWidth="fit-content"
    >
      <Navigation />
      <Banner />
      <Bestseller />
      <Recommend />
    </Container>
  );
};

export default Main;
