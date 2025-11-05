import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import LoginForm from "../components/auth/LoginForm";
import logo from "../assets/logo.png"; // 로고 이미지 불러오기

const LoginPage = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      width="100vw"
      height="100vh"
      bg="white"
    >
      {/* 🔹 로고 이미지 */}
      <Image
        src={logo}
        alt="README Logo"
        width="250px"
        mb="32px"
        objectFit="contain"
      />

      {/* 🔹 로그인 폼 영역 */}
      <Box
        bg="gray.50"
        p="48px 64px"
        borderRadius="12px"
        boxShadow="md"
        backgroundColor={"#FEFAE0"}
      >
        <LoginForm />
      </Box>
    </Flex>
  );
};

export default LoginPage;
