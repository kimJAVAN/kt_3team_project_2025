import { useState, useEffect } from 'react';
import { Box, Button, Heading, Input, Textarea, Stack, HStack, Flex, Text, Image } from '@chakra-ui/react';
import { WidgetCheckoutPage } from './WidgetCheckout';

export default function PaymentPage() {
  const [customerType, setCustomerType] = useState('existing');
  const [addressType, setAddressType] = useState('existing');
  const [deliveryRequest, setDeliveryRequest] = useState('');
  const [customRequest, setCustomRequest] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const [triggerPayment, setTriggerPayment] = useState(0);
  const [phone1, setPhone1] = useState('010');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');

  // 전화번호 합치기
  const phoneNumber = `${phone1}${phone2}${phone3}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const orderItems = [
    { id: 1, title: '책 제목 1', image: 'https://via.placeholder.com/80', quantity: 2, price: 25 },
    { id: 2, title: '책 제목 2', image: 'https://via.placeholder.com/80', quantity: 1, price: 20 }
  ];

  const totalItemPrice = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 30;
  const remoteFee = isRemote ? 32 : 0;
  const finalPrice = totalItemPrice + deliveryFee + remoteFee;

  const orderName = orderItems.length > 1 
    ? `${orderItems[0].title} 외 ${orderItems.length - 1}건`
    : orderItems[0].title;

  const handlePaymentClick = () => {
    if (!agreed) {
      alert('구매 조건 및 결제 진행에 동의해주세요.');
      return;
    }
    if (!widgetReady) {
      alert('결제 준비 중입니다. 잠시만 기다려주세요.');
      return;
    }
    
    // 결제 시 사용할 데이터
    const paymentData = {
      phoneNumber: phoneNumber, // 010XXXXXXXX 형식
      orderName: orderName,
      finalPrice: finalPrice,
      orderItems: orderItems,
      // 필요한 다른 정보들...
    };
    
    console.log('결제 데이터:', paymentData);
    setTriggerPayment(prev => prev + 1);
  };

  return (
    <Box bg="white" minH="100vh" py="40px">
      <Box maxW="1400px" mx="auto" px="20px">
        <Heading fontSize="32px" mb="32px" color="#000">
          주문 / 결제
        </Heading>

        <Flex gap="20px" direction={{ base: 'column', lg: 'row' }}>
          {/* 좌측 영역 (70%) */}
          <Stack flex="7" gap="25px">
            {/* 주문 고객 */}
            <Box bg="var(--bg-color)" p="24px" borderRadius="15px">
              <Heading fontSize="24px" mb="16px" color="#000">
                주문 고객
              </Heading>
              <HStack gap="24px" mb="16px">
                <Button
                  bg={customerType === 'existing' ? 'var(--main-color)' : 'white'}
                  color={customerType === 'existing' ? '#FFFFFF' : '#000'}
                  onClick={() => setCustomerType('existing')}
                  fontSize="16px"
                  borderRadius="10px"
                  border={customerType === 'existing' ? 'none' : '1px solid #ddd'}
                >
                  기존 정보
                </Button>
                <Button
                  bg={customerType === 'new' ? 'var(--main-color)' : 'white'}
                  color={customerType === 'new' ? '#FFFFFF' : '#000'}
                  onClick={() => setCustomerType('new')}
                  fontSize="16px"
                  borderRadius="10px"
                  border={customerType === 'new' ? 'none' : '1px solid #ddd'}
                >
                  신규 수령인
                </Button>
              </HStack>
              <Stack gap="16px">
                <Input placeholder="이름" bg="white" fontSize="16px" borderRadius="15px" />
                <HStack gap="8px">
                  <Input 
                    placeholder="010" 
                    bg="white" 
                    fontSize="16px" 
                    borderRadius="15px"
                    maxLength="3"
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                  <Text fontSize="20px" color="#000">-</Text>
                  <Input 
                    placeholder="0000" 
                    bg="white" 
                    fontSize="16px" 
                    borderRadius="15px"
                    maxLength="4"
                    value={phone2}
                    onChange={(e) => setPhone2(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                  <Text fontSize="20px" color="#000">-</Text>
                  <Input 
                    placeholder="0000" 
                    bg="white" 
                    fontSize="16px" 
                    borderRadius="15px"
                    maxLength="4"
                    value={phone3}
                    onChange={(e) => setPhone3(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                </HStack>
                <Input placeholder="이메일" bg="white" fontSize="16px" borderRadius="15px" />
              </Stack>
            </Box>

            {/* 배송지 */}
            <Box bg="var(--bg-color)" p="24px" borderRadius="15px">
              <Heading fontSize="24px" mb="16px" color="#000">
                배송지
              </Heading>
              <HStack gap="24px" mb="16px">
                <Button
                  bg={addressType === 'existing' ? 'var(--main-color)' : 'white'}
                  color={addressType === 'existing' ? '#FFFFFF' : '#000'}
                  onClick={() => setAddressType('existing')}
                  fontSize="16px"
                  borderRadius="10px"
                  border={addressType === 'existing' ? 'none' : '1px solid #ddd'}
                >
                  등록된 배송지
                </Button>
                <Button
                  bg={addressType === 'new' ? 'var(--main-color)' : 'white'}
                  color={addressType === 'new' ? '#FFFFFF' : '#000'}
                  onClick={() => setAddressType('new')}
                  fontSize="16px"
                  borderRadius="10px"
                  border={addressType === 'new' ? 'none' : '1px solid #ddd'}
                >
                  신규 입력
                </Button>
              </HStack>
              {addressType === 'existing' ? (
                <select style={{
                  width: '100%',
                  padding: '12px',
                  background: 'white',
                  fontSize: '16px',
                  borderRadius: '15px',
                  border: '1px solid #e2e8f0'
                }}>
                  <option value="">배송지 선택</option>
                  <option value="home">집</option>
                  <option value="office">회사</option>
                </select>
              ) : (
                <Stack gap="16px">
                  <Input placeholder="우편번호" bg="white" fontSize="16px" borderRadius="15px" />
                  <Input placeholder="주소" bg="white" fontSize="16px" borderRadius="15px" />
                  <Input placeholder="상세주소" bg="white" fontSize="16px" borderRadius="15px" />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                    <input
                      type="checkbox"
                      onChange={(e) => setIsRemote(e.target.checked)}
                      style={{ width: '18px', height: '18px' }}
                    />
                    도서산간 지역
                  </label>
                </Stack>
              )}
            </Box>

            {/* 배송 요청사항 */}
            <Box bg="var(--bg-color)" p="24px" borderRadius="15px">
              <Heading fontSize="24px" mb="16px" color="#000">
                배송 요청사항
              </Heading>
              <select
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'white',
                  fontSize: '16px',
                  borderRadius: '15px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '16px'
                }}
                onChange={(e) => setDeliveryRequest(e.target.value)}
              >
                <option value="">요청사항 선택</option>
                <option value="door">문앞에 놓아주세요</option>
                <option value="security">경비실에 맡겨주세요</option>
                <option value="call">배송 전 연락주세요</option>
                <option value="custom">직접 입력</option>
              </select>
              {deliveryRequest === 'custom' && (
                <Textarea
                  placeholder="직접 입력하세요"
                  bg="white"
                  fontSize="16px"
                  borderRadius="15px"
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                />
              )}
            </Box>

            {/* 결제방법 선택 */}
            <Box bg="var(--bg-color)" p="24px" borderRadius="15px">
              <Heading fontSize="24px" mb="16px" color="#000">
                결제방법 선택
              </Heading>
              <Stack gap="12px">
                <WidgetCheckoutPage
                  amount={finalPrice}
                  orderName={orderName}
                  onReady={setWidgetReady}
                  triggerPayment={triggerPayment}
                />
              </Stack>
            </Box>
          </Stack>

          {/* 우측 영역 (30%) */}
          <Box
            flex="3"
            position={isSticky ? 'sticky' : 'relative'}
            top={isSticky ? '20px' : '0'}
            h="fit-content"
          >
            <Stack gap="25px">
              {/* 주문정보 */}
              <Box bg="var(--bg-color)" p="24px" borderRadius="15px">
                <Heading fontSize="24px" mb="16px" color="#000">
                  주문정보
                </Heading>
                <Stack gap="16px">
                  {orderItems.map((item) => (
                    <HStack key={item.id} gap="16px" align="start">
                      <Image src={item.image} boxSize="80px" borderRadius="10px" objectFit="cover" />
                      <Stack gap="4px" flex="1">
                        <Text fontSize="16px" fontWeight="bold" color="#000">
                          {item.title}
                        </Text>
                        <Text fontSize="14px" color="#666">
                          {item.quantity}권
                        </Text>
                        <Text fontSize="16px" color="#000">
                          {item.price.toLocaleString()}원
                        </Text>
                        <Text fontSize="16px" fontWeight="bold" color="var(--main-color)">
                          총 {(item.price * item.quantity).toLocaleString()}원
                        </Text>
                      </Stack>
                    </HStack>
                  ))}
                </Stack>
              </Box>

              {/* 최종 결제 금액 */}
              <Box bg="var(--bg-color)" p="24px" borderRadius="15px">
                <Heading fontSize="24px" mb="16px" color="#000">
                  최종 결제 금액
                </Heading>
                <Stack gap="12px">
                  <Flex justify="space-between">
                    <Text fontSize="16px" color="#000">상품금액</Text>
                    <Text fontSize="16px" color="#000">{totalItemPrice.toLocaleString()}원</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="16px" color="#000">배송비</Text>
                    <Text fontSize="16px" color="#000">+{deliveryFee.toLocaleString()}원</Text>
                  </Flex>
                  {isRemote && (
                    <Flex justify="space-between">
                      <Text fontSize="16px" color="#000">도서산간</Text>
                      <Text fontSize="16px" color="#000">+{remoteFee.toLocaleString()}원</Text>
                    </Flex>
                  )}
                  <Box h="1px" bg="var(--sub-color)" my="8px" />
                  <Flex justify="space-between">
                    <Text fontSize="24px" fontWeight="bold" color="#000">
                      최종 결제 금액
                    </Text>
                    <Text fontSize="24px" fontWeight="bold" color="var(--main-color)">
                      {finalPrice.toLocaleString()}원
                    </Text>
                  </Flex>
                </Stack>
              </Box>

              {/* 구매 조건 및 결제 진행 동의 */}
              <Box bg="var(--bg-color)" p="24px" borderRadius="15px">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', marginBottom: '16px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    style={{ width: '18px', height: '18px' }}
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  구매 조건 및 결제 진행 동의
                </label>
                <Box bg="white" p="16px" borderRadius="10px" fontSize="14px" color="#666">
                  <Text>• 전자상거래법 제8조에 따른 구매조건 확인</Text>
                  <Text>• 개인정보 제3자 제공 동의</Text>
                  <Text>• 전자금융거래 이용약관 동의</Text>
                </Box>
              </Box>

              {/* 결제하기 버튼 */}
              <Button
                bg={agreed && widgetReady ? "var(--main-color)" : "#ccc"}
                color="#FFFFFF"
                fontSize="24px"
                h="60px"
                borderRadius="15px"
                _hover={{ bg: agreed && widgetReady ? 'var(--main-color)' : '#ccc' }}
                onClick={handlePaymentClick}
                isDisabled={!agreed || !widgetReady}
                cursor={agreed && widgetReady ? 'pointer' : 'not-allowed'}
              >
                {widgetReady ? '결제하기' : '결제 준비 중...'}
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}