import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toaster } from "../ui/toaster"; // 🔹 toaster.jsx에서 불러오기

const LoginForm = () => {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccess = await login(email, password);
    if (isSuccess) {
      // 🔹 toaster 사용
      toaster.create({
        title: "로그인 성공",
        description: "환영합니다!",
        type: "success",
        duration: 2000,
      });
      navigate("/kt_3team_project_2025");
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      width="500px"
      height="350px"
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
    >
      <VStack spacing={6} width="100%">
        <Input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isRequired
          size="lg"
          borderRadius="md"
          boxShadow="sm"
          focusBorderColor="teal.400"
          backgroundColor={"#ffffffff"}
        />

        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isRequired
          size="lg"
          borderRadius="md"
          boxShadow="sm"
          focusBorderColor="teal.400"
          backgroundColor={"#ffffffff"}
        />

        <HStack justify="space-between" width="100%">
          <Link fontSize="sm" color="#0A400C" href="#">
            아이디 찾기
          </Link>
          <Link fontSize="sm" color="#0A400C" href="#">
            비밀번호 찾기
          </Link>
          <Link fontSize="sm" color="#0A400C" href="#">
            회원가입
          </Link>
        </HStack>

        <Button
          type="submit"
          width="100%"
          height="45px"
          backgroundColor={"#0A400C"}
          colorScheme="teal"
          fontWeight="bold"
          isLoading={loading}
          loadingText="로그인 중..."
        >
          로그인
        </Button>

        {error && (
          <Text color="red.500" fontSize="sm" mt={2}>
            {error}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default LoginForm;
