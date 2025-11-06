import React, { useState } from "react";
import { Box, Flex, Heading, Text, Image, Button, HStack, VStack, IconButton } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { FiPlus, FiMinus } from "react-icons/fi";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "자바스크립트",
      price: 100,
      count: 1,
      image: "https://via.placeholder.com/80",
      selected: true,
    },
    {
      id: 2,
      name: "리액트",
      price: 120,
      count: 1,
      image: "https://via.placeholder.com/80",
      selected: false,
    },
  ]);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setItems(items.map((item) => ({ ...item, selected: checked })));
  };

  const handleSelect = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleCountChange = (id, delta) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(1, item.count + delta) }
          : item
      )
    );
  };

  const handleDeleteSelected = () => {
    const selectedCount = items.filter((item) => item.selected).length;
    if (selectedCount === 0) {
      alert("선택된 상품이 없습니다");
      return;
    }
    setItems(items.filter((item) => !item.selected));
    alert("선택한 상품을 삭제했습니다");
  };

  const handleDeleteAll = () => {
    if (items.length === 0) return;
    setItems([]);
    alert("모든 상품을 삭제했습니다");
  };

  const handlePay = () => {
    if (selectedItems.length === 0) {
      alert("상품을 선택해주세요");
      return;
    }
    alert("주문 페이지로 이동합니다");
  };

  const selectedItems = items.filter((item) => item.selected);

  const itemsTotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  let shippingFee = 0;
  if (itemsTotal > 0 && itemsTotal < 30000) {
    shippingFee = 3500;
  }

  const totalAmount = itemsTotal + shippingFee;

  return (
    <Box bg="var(--bg-color)" minH="100vh" py="40px">
      <Box maxW="1200px" mx="auto">
        <Flex gap="40px" direction={{ base: "column", lg: "row" }}>
          {/* 왼쪽 영역 - 장바구니 목록 */}
          <Box flex="2" bg="white" p="20px" borderRadius="16px" boxShadow="sm">
            <Heading size="xl" mb="20px" color="black">
              장바구니
            </Heading>

            <Flex justify="space-between" align="center" mb="16px">
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={items.length > 0 && selectedItems.length === items.length}
                  onChange={handleSelectAll}
                />
                <Text fontWeight="medium">
                  전체선택 ({selectedItems.length}/{items.length})
                </Text>
              </label>
              <HStack gap="8px">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleDeleteSelected}
                  bg="var(--sub-color)"
                  color="var(--bg-color)"
                  borderColor="var(--sub-color)"
                  _hover={{ bg: "#6d7a58" }}
                >
                  선택삭제
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleDeleteAll}
                  bg="var(--sub-color)"
                  color="var(--bg-color)"
                  borderColor="var(--sub-color)"
                  _hover={{ bg: "#6d7a58" }}
                >
                  전체삭제
                </Button>
              </HStack>
            </Flex>

            <Box borderBottom="1px solid" borderColor="gray.200" mb="16px" />

            {items.length === 0 ? (
              <Box textAlign="center" py="40px">
                <Text color="gray.500" fontSize="lg">
                  장바구니가 비어 있습니다.
                </Text>
              </Box>
            ) : (
              <VStack gap="0" align="stretch">
                {items.map((item, index) => (
                  <Box key={item.id}>
                    <Flex justify="space-between" align="center" py="16px">
                      <Flex align="center" gap="16px">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => handleSelect(item.id)}
                        />
                        <Image
                          src={item.image}
                          alt={item.name}
                          boxSize="80px"
                          borderRadius="8px"
                          objectFit="cover"
                        />
                        <VStack align="start" gap="4px">
                          <Text fontSize="md" fontWeight="medium" color="black">
                            {item.name}
                          </Text>
                          <Text fontSize="lg" fontWeight="bold" color="var(--bg-color)">
                            {item.price.toLocaleString()}원
                          </Text>
                        </VStack>
                      </Flex>

                      <HStack gap="8px">
                        <IconButton
                          aria-label="수량 감소"
                          size="sm"
                          onClick={() => handleCountChange(item.id, -1)}
                          disabled={item.count <= 1}
                          bg="var(--sub-color)"
                          color="var(--bg-color)"
                          _hover={{ bg: "#6d7a58" }}
                        >
                          <FiMinus />
                        </IconButton>
                        <Text fontWeight="medium" minW="30px" textAlign="center" color="black">
                          {item.count}
                        </Text>
                        <IconButton
                          aria-label="수량 증가"
                          size="sm"
                          onClick={() => handleCountChange(item.id, 1)}
                          bg="var(--sub-color)"
                          color="var(--bg-color)"
                          _hover={{ bg: "#6d7a58" }}
                        >
                          <FiPlus />
                        </IconButton>
                      </HStack>
                    </Flex>
                    {index < items.length - 1 && <Box borderBottom="1px solid" borderColor="gray.200" />}
                  </Box>
                ))}
              </VStack>
            )}
          </Box>

          {/* 오른쪽 영역 - 결제정보 */}
          <Box
            flex="1"
            bg="white"
            p="20px"
            borderRadius="16px"
            boxShadow="sm"
            h="fit-content"
            position={{ lg: "sticky" }}
            top="20px"
          >
            <Heading size="xl" mb="20px" color="black">
              결제정보
            </Heading>

            <VStack gap="12px" align="stretch" mb="16px">
              <Flex justify="space-between">
                <Text color="black">상품 금액</Text>
                <Text fontWeight="bold" color="black">{itemsTotal.toLocaleString()}원</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="black">배송비</Text>
                <Text fontWeight="bold" color={shippingFee === 0 ? "var(--bg-color)" : "black"}>
                  {shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}
                </Text>
              </Flex>
              <Box borderBottom="1px solid" borderColor="gray.200" />
              <Flex justify="space-between" fontSize="lg">
                <Text fontWeight="bold" color="black">결제 예정 금액</Text>
                <Text fontWeight="bold" color="var(--main-color)">
                  {totalAmount.toLocaleString()}원
                </Text>
              </Flex>
            </VStack>

            {itemsTotal > 0 && itemsTotal < 30000 && (
              <Box bg="var(--bg-color)" p="12px" borderRadius="8px" mb="16px">
                <Text fontSize="sm">
                  💡 30,000원 이상 구매 시 배송비 무료
                </Text>
              </Box>
            )}

            <Button
              size="lg"
              width="100%"
              onClick={handlePay}
              disabled={selectedItems.length === 0}
              bg="var(--main-color)"
              color="var(--bg-color)"
              _hover={{ bg: "var(--sub-color)" }}
            >
              주문하기
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Cart;