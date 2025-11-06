import {
  Box,
  Button,
  CloseButton,
  Container,
  Dialog,
  Flex,
  Grid,
  Icon,
  IconButton,
  Image,
  Portal,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';
import { useNavigate } from 'react-router';
import Modal from '../../../components/Modal';

const Bestseller = () => {
  const bookData = [
    {
      id: 1,
      title: '책 제목 1',
      writer: '이름1',
      image: 'https://via.placeholder.com/80',
      price: 25000,
    },
    {
      id: 2,
      title: '책 제목 2',
      writer: '이름2',
      image: 'https://via.placeholder.com/80',
      price: 18000,
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
      price: 30000,
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
      price: 30000,
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
      price: 30000,
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
      price: 30000,
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
      price: 30000,
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
      price: 30000,
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
      price: 30000,
    },
    {
      id: 3,
      title: '책 제목 3',
      writer: '이름3',
      image: 'https://via.placeholder.com/80',
      price: 30000,
    },
  ];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Container p="0" margin="100px 0">
      <Text fontSize="var(--font-larger)" fontWeight="600">
        베스트셀러
      </Text>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(5, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        rowGap={8}
        columnGap={8}
        margin="80px 0"
      >
        {bookData.map((book) => (
          <Box key={book.id} bgColor="var(--bg-color)" p="3">
            <Box width="230px" height="300px">
              <Image src={book.image} />
            </Box>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="var(--font-medium)" fontWeight="bold">
                {book.title}
              </Text>
              <IconButton
                variant="ghost"
                size="sm"
                css={{
                  _icon: {
                    width: '4',
                    height: '4',
                  },
                }}
              >
                <Icon as={IoIosHeartEmpty} color="red" />
              </IconButton>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="var(--font-small)">{book.writer}</Text>
              <Text fontSize="var(--font-small)">
                {book.price.toLocaleString()}원
              </Text>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between" gap="2">
              <Button
                bgColor="var(--sub-color)"
                flex="1"
                onClick={() => setOpen(true)} // ← 클릭 시 열기
              >
                장바구니
              </Button>

              <Button bgColor="var(--main-color)" flex="1">
                바로구매
              </Button>
              <Modal
                title="장바구니 이동"
                open={open}
                onOpenChange={(e) => setOpen(e.open)} // Chakra Dialog는 e.open으로 상태 전달
                confirmText="장바구니 이동"
                cancelText="취소"
                onConfirm={() => {
                  navigate('/cart');
                  setOpen(false);
                }}
                size="xl"
              >
                장바구니 페이지로 이동하시겠습니까?
              </Modal>
            </Flex>
          </Box>
        ))}
      </Grid>
      {/* <Box display="flex" justifyContent="end">
        <Button bgColor="var(--main-color)">더보기 +</Button>
      </Box> */}
    </Container>
  );
};

export default Bestseller;
