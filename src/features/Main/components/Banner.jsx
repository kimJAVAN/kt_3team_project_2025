import { Image } from '@chakra-ui/react';
import banner1 from '@/assets/banner1.png';
import banner2 from '@/assets/banner2.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  return (
    <Swiper
      className="home-banner"
      style="--swiper-theme-color: #fff;"
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay]}
      loop
    >
      <SwiperSlide>
        <Image src={banner1} alt="배너1" w="100%" h="auto" objectFit="cover" />
      </SwiperSlide>

      <SwiperSlide>
        <Image src={banner2} alt="배너2" w="100%" h="auto" objectFit="cover" />
      </SwiperSlide>

      <SwiperSlide>
        <Image src={banner1} alt="배너3" w="100%" h="auto" objectFit="cover" />
      </SwiperSlide>

      <SwiperSlide>
        <Image src={banner2} alt="배너4" w="100%" h="auto" objectFit="cover" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
