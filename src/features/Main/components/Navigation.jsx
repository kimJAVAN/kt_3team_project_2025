import { Box, Container, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Box as="nav" py={3} top={0} zIndex={10}>
      <Container as="ul" maxW="1200px">
        <HStack as="li" spacing={8} justify="center">
          <Link
            as={Link}
            to=""
            fontWeight="600"
            fontSize="var(--font-medium)"
            _hover={{ textDecoration: 'none' }}
          >
            국내도서
          </Link>
          <Link
            as={Link}
            to=""
            fontWeight="600"
            _hover={{ textDecoration: 'none' }}
          >
            해외도서
          </Link>
          <Link
            as={Link}
            to=""
            fontWeight="600"
            _hover={{ textDecoration: 'none' }}
          >
            11월 추천도서
          </Link>
          <Link
            as={Link}
            to=""
            fontWeight="600"
            _hover={{ textDecoration: 'none' }}
          >
            {' '}
            계절도서
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navigation;
