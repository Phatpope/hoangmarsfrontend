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
        className="mt-[8px] font-normal sm:text-[32px] text-[10px] text-center text-secondary-white"
      >
        <span className="font-extrabold text-white">MarApple</span> là chuyên cung cấp sản phẩm Apple, 
         với những kĩ thuật viên chuyên nghiệp và tận tâm. Shop luôn cam kết
         sử dụng những linh kiện chính thức từ Apple nhằm mang lại trải nghiệm Apple tốt nhất cho khách hàng khi mua các sản phẩm tại đây.{' '}
         Thời gian bảo hành hãng lên đến 1 năm hoặc theo thời gian bảo hành còn lại của thiết bị quí khách.. Let's{' '}
      
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
