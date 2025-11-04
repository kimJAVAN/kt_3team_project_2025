import {
  Box,
  Container,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import { SlBasket } from 'react-icons/sl';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoIosSearch } from 'react-icons/io';
import Logo from '../assets/logo.png';

export default function Header() {
  return (
    <Container
      maxW={'container.xl'}
      my={6}
      borderBottom={'1px solid #eee'}
      pb={2}
    >
      <HStack>
        <Image
          src={Logo}
          alt="사이트 로고"
          boxSize="60px"
          objectFit="contain"
          cursor="pointer"
        />
        <Box>
          <InputGroup startElement={<IoIosSearch />}>
            <Input placeholder="Username" />
          </InputGroup>
        </Box>
        <HStack>
          <IconButton
            variant="ghost"
            size="sm"
            css={{
              _icon: {
                width: '5',
                height: '5',
              },
            }}
          >
            <Icon as={SlBasket} />
          </IconButton>
          <IconButton
            variant="ghost"
            size="sm"
            css={{
              _icon: {
                width: '5',
                height: '5',
              },
            }}
          >
            <Icon as={IoIosHeartEmpty} />
          </IconButton>
        </HStack>
      </HStack>
    </Container>
  );
}
