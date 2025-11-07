import { useParams } from "react-router";
import { useBookList } from "../../hooks/useBookList";
import { useMemo } from "react";

const CATEGORY_MAP = {
  domestic: { title: "국내도서", prefix: "국내도서" },
  foreign: { title: "해외도서", prefix: "해외도서" },
  season: { title: "계절도서", prefix: null }, //랜덤처리
  recommend: { title: "이달의 추천도서", prefix: null }, //랜덤처리
};

const BookList = () => {
  const { slug } = useParams();
  const config = CATEGORY_MAP[slug] ?? { title: "전체도서", prefix: null };

  const wantRandom = slug === "recommend";

  const { books, loading } = useBookList({
    pageSize: wantRandom ? 30 : 20,
    category: config.prefix,
    orderField: wantRandom ? "createdAt" : "salesCount",
    orderDirection: "desc",
  });

  const visibleBooks = useMemo(() => {
    if (!books?.length) return [];
    if (!wantRandom) return books;
    const pool = [...books];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 10);
  }, [books, wantRandom]);

  return (
    <>
      <Navigation />
      <Box p="80px 0" maxW="1200px" mx="auto">
        <Text fontSize="var(--font-larger)" fontWeight="bold" mb={10}>
          {config.title}
        </Text>

        {loading ? (
          <Flex justify="center" align="center" h="300px">
            <Spinner size="lg" />
          </Flex>
        ) : visibleBooks.length === 0 ? (
          <Text textAlign="center" color="gray.500">
            해당 카테고리의 도서가 없습니다.
          </Text>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap={8}
          >
            {visibleBooks.map((book) => (
              <Box key={book.id} bg="var(--bg-color)" p="3" borderRadius="lg">
                <Image
                  src={book.cover || "/no-image.png"}
                  alt={book.title}
                  borderRadius="md"
                  w="100%"
                  h="240px"
                  objectFit="cover"
                />
                <Text mt={3} fontWeight="bold" fontSize="16px" noOfLines={2}>
                  {book.title}
                </Text>
                <Text fontSize="14px" color="gray.600" noOfLines={1}>
                  {book.author}
                </Text>
                <Text mt={1} fontSize="14px">
                  {(book.priceStandard ?? 0).toLocaleString()}원
                </Text>
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default BookList;
