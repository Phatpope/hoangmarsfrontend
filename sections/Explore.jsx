import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from '../styles';
import { staggerContainer } from '../utils/motion';
import { ExploreCard, TitleText, TypingText } from '../components';

const Explore = ({ categories }) => {
  const [active, setActive] = useState('world-2');

  // Combine exploreWorlds with categories
  const combinedData = [
    ...exploreWorlds, // Use existing exploreWorlds data
    ...categories.map(category => ({
      id: category.id,
      title: category.attributes.name,
      cate: category.attributes.name
    }))
  ];

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Các Danh Mục MarApple Cung Cấp :" textStyles="text-center" />
        <TitleText
          title={<>Chọn Thư Mục Mà Bạn <br className="md:block hidden" /> Quan Tâm</>}
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {combinedData.map((item, index) => (
            <ExploreCard
              key={item.id || index} // Use id if available, otherwise use index
              title={item.title}
              cate={item.cate}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
