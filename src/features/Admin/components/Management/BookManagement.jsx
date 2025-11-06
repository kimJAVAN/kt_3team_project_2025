import { useBookList } from "@/hooks/useBookList";
import { Box, Button, Text, ScrollArea, Flex, Image } from "@chakra-ui/react";

const BookManagement = () => {
  const { books, fetchBooks, hasNext, setBooks } = useBookList({
    pageSize: 20,
  });

  return (
    <Box as="section" h="100%" display="flex" flexDirection="column" gap="20px">
      <Text as="h1" fontSize="32px" color="var(--main-color)">
        도서 관리
      </Text>
      <ScrollArea.Root
        as="article"
        flex="1"
        rounded="xl"
        variant="hover"
        bg="var(--bg-color)"
      >
        <ScrollArea.Viewport>
          <ScrollArea.Content paddingEnd="3" textStyle="sm">
            <>
              {books.map((book) => (
                <Flex
                  key={book.id}
                  align="center"
                  justify="space-between"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  p="10px 20px"
                  h="120px"
                  gap="10px"
                >
                  <Flex align="center" h="100%" gap="10px">
                    <Image
                      src={book.cover || "/no-image.png"}
                      alt={book.title}
                      w="62.5px"
                      h="100px"
                      borderRadius="md"
                    />
                    <Box>
                      <Text fontWeight="semibold" lineClamp="2">
                        {book.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600" lineClamp="2">
                        {book.author}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="center" gap="10px" shrink="0">
                    <Text>재고 : {book.stock}</Text>
                  </Flex>
                </Flex>
              ))}
              {hasNext && (
                <Box p="20px" textAlign="center">
                  <Button
                    bg="var(--main-color)"
                    borderRadius="full"
                    onClick={() => fetchBooks()}
                  >
                    더보기
                  </Button>
                </Box>
              )}
            </>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />
      </ScrollArea.Root>
    </Box>
  );
};

export default BookManagement;
