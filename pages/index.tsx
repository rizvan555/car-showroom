import { Inter } from 'next/font/google';
import HomePage from './home';
import FindCar from './findcar';
import About from './about';
import Cars from './cars';
import News from './news';
import Contact from './contact';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { motion, useScroll, useSpring } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [light, setLight] = useState<boolean>(true);
  const router = useRouter();
  const { user } = useUser();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!user) {
      router.replace('/sign-in');
    }
  }, [user, router]);
  return (
    <div>
      <HomePage light={light} setLight={setLight} />
      <FindCar />
      <About />
      <Cars />
      <News />
      <Contact />
    </div>
  );
}
