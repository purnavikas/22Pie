'use client';

import { motion } from 'motion/react';

const TEXT = 'Skills that compound. Not just skills that expire.';

export function KineticIntro() {
  const words = TEXT.split(' ');

  return (
    <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] md:text-7xl">
      {words.map((word, index) => (
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, y: '0.6em', filter: 'blur(6px)' }}
          key={`${word}-${index}`}
          transition={{ duration: 0.6, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.6 }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </h2>
  );
}
