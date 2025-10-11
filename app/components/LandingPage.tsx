"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import emailjs from '@emailjs/browser';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Video transition logic
  const videoOpacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const videoOpacity2 = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  
  // Define missing transform variables
  const backgroundBlur = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const textBlur = useTransform(scrollYProgress, [0, 0.8], [0, 5]);
  const missionY = useTransform(scrollYProgress, [0.5, 1], [100, 0]);
  const missionOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const TEMPLATE_ID_USER = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER!;
  const TEMPLATE_ID_ADMIN = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN!;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails') || '[]');

      if (registeredEmails.includes(email)) {
        setMessage('You are already registered with us.');
        return;
      }

      // 1. Send email to the user
      const userTemplateParams = {
        user_email: email,
        message: "you will be notified when we will launch , thanks for registering with us",
      };

      emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, userTemplateParams, PUBLIC_KEY)
        .then((result) => {
          console.log('User email sent successfully:', result.text);
          setMessage('Thank you! We will notify you when we launch.');
          setEmail(''); // Clear email input

          // Add email to localStorage on successful submission
          const updatedEmails = [...registeredEmails, email];
          localStorage.setItem('registeredEmails', JSON.stringify(updatedEmails));
        }, (error) => {
          console.log('Failed to send user email:', error.text);
          setMessage('Failed to process your request. Please try again later.');
        });

      // 2. Send email to admin
      const adminTemplateParams = {
        user_email: email,
        message: `We have to notify ${email} when we will launch.`,
      };

      emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, adminTemplateParams, PUBLIC_KEY)
        .then((result) => {
          console.log('Admin notification sent successfully:', result.text);
        }, (error) => {
          console.log('Failed to send admin notification:', error.text);
        });

    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full text-white font-sans">
      {/* Fixed Landing Page Content */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <motion.video
            className="h-full w-full object-cover contrast-125 opacity-60"
            autoPlay
            loop
            muted
            src="/videos/galaxy-2.webm"
            style={{
              filter: useTransform(backgroundBlur, (value) => `blur(${value}px)`)
            }}
          />
          <div className="absolute inset-0"></div>
        </div>

        {/* Background Blur Overlay */}
        <motion.div 
          className="absolute inset-0 z-5 bg-black/10"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1])
          }}
        />

        {/* Original Content */}
        <motion.div 
          className="relative z-10 flex flex-col h-full text-center md:text-left p-6 sm:p-12 md:p-20 lg:p-28"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.3]),
            filter: useTransform(textBlur, (value) => `blur(${value}px)`)
          }}
        >
          {/* Top Section - Logo, Coming Soon, Email */}
          <div className="flex-1 flex flex-col items-center justify-center md:items-start md:justify-start">
            <div className="space-y-6 sm:space-y-8">
              {/* Logo/Text */}
              <div className="group">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-[100] whitespace-nowrap animate-paradize-entrance pointer-events-none group-hover:text-glow transition-all duration-300">
                  P A R A D I Z E
                </h1>
              </div>

              {/* Coming Soon Section */}
              <div className="flex flex-col md:flex-row items-center justify-start md:space-x-8 space-y-8 md:space-y-0 md:ml-20">
                <div className="self-center pointer-events-none flex flex-col items-center">
                  <CountdownTimer />
                </div>
                <div className="h-24 border-l border-white hidden md:block animate-line-grow"></div>
                <div className="animate-slide-in">
                  <div className="text-white text-4xl md:text-5xl font-[100] text-left pointer-events-none">
                    COMING <br className="hidden md:block"></br>SOON
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <form ref={form} onSubmit={handleNotifyMe} className="mt-8 flex flex-col items-start w-full max-w-lg md:ml-20">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                  <input
                    type="email"
                    placeholder="Your@email.com"
                    className="flex-grow bg-transparent border border-white rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 text-left"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="user_email"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black font-light border-white border-1 cursor-pointer rounded-full px-8 py-3 hover:bg-transparent hover:text-white transition-all duration-300"
                  >
                    NOTIFY ME
                  </button>
                </div>
                {message && (
                  <p className="mt-4 text-sm sm:text-base transition-all duration-300">
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>

        {/* Mission Content Overlay */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center p-6 sm:p-12"
          style={{
            y: missionY,
            opacity: missionOpacity
          }}
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Blurred Background Container */}
            <motion.div
              className="bg-black/100 backdrop-blur-xl border-2 border-orange-400/80 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl shadow-orange-500/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Main Title */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[100] leading-tight mb-8 text-white drop-shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Turning spare compute into one shared brain.
              </motion.h1>

              {/* Mission Statements */}
              <motion.div className="space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl font-[200] leading-relaxed">
                <motion.p
                  className="text-white/95 drop-shadow-md"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  What if all the unused computers in the world could work together?
                </motion.p>

                <motion.p
                  className="text-white/95 drop-shadow-md"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  A network that borrows free computing power to train models faster and cheaper.
                </motion.p>

                <motion.p
                  className="text-white/95 drop-shadow-md"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  No big servers, just people sharing what they already have.
                </motion.p>
              </motion.div>

              {/* Decorative element */}
              <motion.div
                className="w-24 h-0.5 bg-orange-400/80 mx-auto mt-8"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1.0, delay: 1.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
