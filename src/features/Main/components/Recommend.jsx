import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { TfiArrowCircleLeft } from 'react-icons/tfi';
import { TfiArrowCircleRight } from 'react-icons/tfi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from 'react';
import ButtonWithIcon from '../../../components/ButtonWithIcon';

const Recommend = () => {
  const bookData = [
    {
      id: 1,
      title: '책 제목 1',
      writer: '이름1',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      title: '책 제목 2',
      writer: '이름2',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
    },
  ];
  // ✅ 버튼 ref 선언
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Container display="flex" justifyContent="space-between" gap="100px" p={0}>
      <VStack
        align="center"
        spacing={6}
        flexShrink={0}
        justifyContent="space-between"
      >
        <Flex flexDirection="column" alignItems="flex-end" gap={4}>
          <Text fontSize="var(--font-larger)" fontWeight="600">
            11월의 추천도서
          </Text>
          <Box>
            <Button bg="none" color="#000" fontSize="var(--font-medium)" p={0}>
              더보기 →
            </Button>
          </Box>
        </Flex>
        <HStack display="flex" alignItems="center" gap={5} mb={20}>
          <ButtonWithIcon
            ref={prevRef}
            btnWidth="40px"
            btnHeight="40px"
            icon={TfiArrowCircleLeft}
            iconWidth={8}
            iconHeight={8}
            ariaLabel="이전"
            variant="ghost"
          ></ButtonWithIcon>
          <Box
            className="custom-pagination"
            style={{
              '--swiper-theme-color': 'var(--main-color)',
            }}
          />
          <ButtonWithIcon
            ref={nextRef}
            btnWidth="40px"
            btnHeight="40px"
            icon={TfiArrowCircleRight}
            iconWidth={8}
            iconHeight={8}
            ariaLabel="이전"
            variant="ghost"
          ></ButtonWithIcon>
        </HStack>
      </VStack>
      <Box gap="50px" display="contents">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView="4"
          spaceBetween={50}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
          }}
          speed={400}
          onBeforeInit={(swiper) => {
            // Swiper가 초기화되기 전에 버튼 ref 연결
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
        >
          {bookData.map((book) => (
            <SwiperSlide key={book.id}>
              <Box height="300px">
                <Image src={book.image} />
              </Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize="var(--font-large)" fontWeight="bold">
                  {book.title}
                </Text>
                <Text fontSize="var(--font-medium)">{book.writer}</Text>
              </Flex>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default Recommend;
