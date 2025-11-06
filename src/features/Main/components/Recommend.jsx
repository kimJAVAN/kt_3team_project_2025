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
  //   const prevSlide =
  //   const nextSlide =
  return (
    <Container display="flex" justifyContent="space-between" gap="25px">
      <VStack>
        <Box>
          <Text fontSize="var(--font-larger)" fontWeight="600">
            11월의 추천도서
          </Text>
          <Button bgColor="var(--main-color)">더보기 +</Button>
        </Box>
        <Box>
          <Button></Button>
          <Button></Button>
        </Box>
      </VStack>
      <HStack gap="50px">
        {bookData.map((book) => (
          <Box key={book.id}>
            <Box width="230px" height="300px">
              <Image src={book.image} />
            </Box>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="var(--font-large)" fontWeight="bold">
                {book.title}
              </Text>
              <Text fontSize="var(--font-medium)">{book.writer}</Text>
            </Flex>
          </Box>
        ))}
      </HStack>
    </Container>
  );
};

export default Recommend;
