"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CountdownTimer from './CountdownTimer';
import emailjs from '@emailjs/browser';
import Footer from './Footer';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentFadeLeft, setContentFadeLeft] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const SERVICE_ID = 'service_wwz6y9h';
  const TEMPLATE_ID_USER = 'template_7w9zhwi'; 
  const TEMPLATE_ID_ADMIN = 'template_pkir7h4'; 
  const PUBLIC_KEY = 'yANzsioyREUuX2qRK';

  const handleKnowMore = () => {
    setIsAnimating(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; 
      videoRef.current.play();
      
      // Fade content to left after 3.2 seconds
      setTimeout(() => {
        setContentFadeLeft(true);
      }, 3200);
      
      videoRef.current.onended = () => {
        // Navigate to mission page immediately when video ends
        router.push('/mission');
      };
    }
  };

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
          setEmail('');

          const updatedEmails = [...registeredEmails, email];
          localStorage.setItem('registeredEmails', JSON.stringify(updatedEmails));
        }, (error) => {
          console.log('Failed to send user email:', error.text);
          setMessage('Failed to process your request. Please try again later.');
        });

      // 2. Send email to admin
      const adminTemplateParams = {
        user_email: email,
        message: `New user registered: ${email}`,
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
      <>
          <div className="relative min-h-screen w-full text-white font-sans">
      {/* Landing Page Content */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Videos */}
        <div className="absolute inset-0 z-0">
          {/* Default Galaxy Video */}
          <motion.video
            className="h-full w-full object-cover contrast-125 opacity-60"
            autoPlay
            loop
            muted
            src="/videos/galaxy-2.webm"
            animate={{
              opacity: isAnimating ? 0 : 0.6
            }}
            transition={{ duration: 1 }}
          />
          
          {/* Animation Video */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover contrast-125"
            loop={false}
            muted
            src="/videos/galaxy_anime.webm"
            style={{
              opacity: isAnimating ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
          />
          
          {/* Dark overlay for animation video */}
          <div 
            className="absolute inset-0 bg-black/40 pointer-events-none"
            style={{
              opacity: isAnimating ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
          />
          
          <div className="absolute inset-0"></div>
        </div>

        {/* Landing Page Content */}
        <motion.div 
          className="relative z-10 flex flex-col h-full text-center md:text-left p-6 sm:p-12 md:p-20 lg:p-28"
          animate={{
            x: contentFadeLeft ? -1000 : 0,
            opacity: contentFadeLeft ? 0 : 1
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
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

          {/* Know More Button - Bottom Center */}
          <div className="flex justify-center xl:-mb-10 xl:pb-0 pb-8">
            <motion.button
              onClick={handleKnowMore}
              disabled={isAnimating}
              className="relative bg-transparent border-1 border-white text-white font-[200] px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm scale-125"></div>
              
              <span className="relative z-10">
                {isAnimating ? 'Loading...' : 'KNOW MORE'}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
      </>
  );
};

export default LandingPage;