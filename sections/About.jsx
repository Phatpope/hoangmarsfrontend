'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About MarApple" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        <span className="font-extrabold text-white">MarApple</span> ShopDunk Care là trung tâm bảo hành ủy quyền chính thức của Apple, 
         với những kỹ thuật viên chuyên nghiệp và tận tâm, được Apple đào tạo. ShopDunk Care tuân theo những tiêu chuẩn nghiêm ngặt và cao cấp, cam kết
         sử dụng những linh kiện chính thức từ Apple nhằm mang lại trải nghiệm Apple tốt nhất cho quý khách hàng khi mua các sản phẩm tại ShopDunk.{' '}
        <span className="font-extrabold text-white">
          MarApple
        </span>{' '}
        Chuyen nghiep, using only{' '}
        <span className="font-extrabold text-white">VR</span> Máy được thay thế theo đúng tiêu chuẩn và chính sách của Apple.
         Thời gian bảo hành hãng lên đến 90 ngày hoặc theo thời gian bảo hành còn lại của thiết bị quý khách.. Let's{' '}
        <span className="font-extrabold text-white">explore</span> MarApple
        de nhan nhieu uu dai.
      </motion.p>

      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
