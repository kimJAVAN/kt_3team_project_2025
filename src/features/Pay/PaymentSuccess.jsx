import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Heading, Stack, Flex, Text, Image } from '@chakra-ui/react';

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      const response = await fetch("/api/confirm/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        throw { message: json.message, code: json.code };
      }

      return json;
    }

    confirm()
      .then((data) => {
        setResponseData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        navigate(`/fail?code=${error.code}&message=${error.message}`);
      });
  }, [searchParams]);

  if (isLoading) {
    return (
      <Box bg="white" minH="100vh" py="40px">
        <Box maxW="800px" mx="auto" px="20px">
          <Flex justify="center" align="center" minH="400px">
            <Text fontSize="20px" color="#666">결제 승인 처리 중...</Text>
          </Flex>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="white" minH="100vh" py="40px">
      <Box maxW="800px" mx="auto" px="20px">
        <Stack gap="32px" align="center">
          {/* 성공 이미지 및 타이틀 */}
          <Box bg="#F7F6ED" p="40px" borderRadius="15px" w="100%" textAlign="center">
            <Image 
              src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" 
              w="100px" 
              mx="auto" 
              mb="24px"
            />
            <Heading fontSize="28px" color="#0A400C" mb="16px">
              결제가 완료되었습니다
            </Heading>
            <Text fontSize="16px" color="#666">
              주문이 정상적으로 처리되었습니다.
            </Text>
          </Box>

          {/* 결제 정보 */}
          <Box bg="#F7F6ED" p="32px" borderRadius="15px" w="100%">
            <Heading fontSize="24px" mb="24px" color="#000">
              결제 정보
            </Heading>
            <Stack gap="16px">
              <Flex justify="space-between" py="12px" borderBottom="1px solid #e2e8f0">
                <Text fontSize="16px" fontWeight="bold" color="#000">결제금액</Text>
                <Text fontSize="18px" fontWeight="bold" color="#0A400C">
                  {`${Number(searchParams.get("amount")).toLocaleString()}원`}
                </Text>
              </Flex>
              <Flex justify="space-between" py="12px" borderBottom="1px solid #e2e8f0">
                <Text fontSize="16px" fontWeight="bold" color="#000">주문번호</Text>
                <Text fontSize="16px" color="#666">
                  {searchParams.get("orderId")}
                </Text>
              </Flex>
              <Flex justify="space-between" py="12px">
                <Text fontSize="16px" fontWeight="bold" color="#000">결제키</Text>
                <Text 
                  fontSize="14px" 
                  color="#666" 
                  maxW="400px" 
                  wordBreak="break-all"
                  textAlign="right"
                >
                  {searchParams.get("paymentKey")}
                </Text>
              </Flex>
            </Stack>
          </Box>

          {/* 응답 데이터 (개발용) */}
          {responseData && (
            <Box bg="#F7F6ED" p="32px" borderRadius="15px" w="100%">
              <Heading fontSize="24px" mb="16px" color="#000">
                Response Data
              </Heading>
              <Box 
                bg="white" 
                p="16px" 
                borderRadius="10px" 
                fontSize="14px" 
                fontFamily="monospace"
                overflowX="auto"
              >
                <pre>{JSON.stringify(responseData, null, 2)}</pre>
              </Box>
            </Box>
          )}

          {/* 버튼 영역 */}
          <Stack direction={{ base: 'column', md: 'row' }} gap="16px" w="100%">
            <Button
              as={Link}
              to="/"
              bg="#0A400C"
              color="#FFFFFF"
              fontSize="18px"
              h="60px"
              borderRadius="15px"
              _hover={{ bg: '#0d5010' }}
              flex="1"
            >
              홈으로 가기
            </Button>
            <Button
              as={Link}
              to="/mypage/orders"
              bg="white"
              color="#0A400C"
              fontSize="18px"
              h="60px"
              borderRadius="15px"
              border="2px solid #0A400C"
              _hover={{ bg: '#F7F6ED' }}
              flex="1"
            >
              주문 내역 보기
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}