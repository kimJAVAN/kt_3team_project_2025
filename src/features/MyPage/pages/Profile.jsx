import { Box, Heading, Text } from "@chakra-ui/react";

const Profile = () => (
  <Box>
    <Heading size="md" mb={4}>내 정보</Heading>
    <Text>이름: 홍길동</Text>
    <Text>이메일: example@email.com</Text>
  </Box>
);

export default Profile;
