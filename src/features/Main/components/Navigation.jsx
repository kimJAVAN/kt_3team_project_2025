import { memo } from 'react';
import { Box, Container, HStack, Button } from '@chakra-ui/react';

const Navigation = memo(function Navigation({
  items,
  activeIndex = -1,
  sticky = true,
}) {
  return (
    <Box
      as="nav"
      aria-label="주요 도서 카테고리"
      borderBottomWidth="1px"
      position={sticky ? 'sticky' : 'static'}
      top={sticky ? 0 : undefined}
      zIndex={9}
    >
      <Container maxW="container.xl" px={{ base: 3, md: 4 }}>
        <HStack
          spacing={0}
          overflowX="auto"
          py={1}
          sx={{
            '::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Button
                key={`${item.label}-${idx}`}
                variant="ghost"
                px={{ base: 3, md: 4 }}
                py={4}
                borderRadius={0}
                fontWeight={isActive ? '700' : '600'}
                position="relative"
                whiteSpace="nowrap"
              >
                {item.label}
              </Button>
            );
          })}
        </HStack>
      </Container>
    </Box>
  );
});

export default Navigation;
