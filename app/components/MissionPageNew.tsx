"use client";

import { motion } from 'framer-motion';
import Particles from './Particles';
import LaserFlow from './LaserFlow';
import Footer from './Footer';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/navigation';

const MissionPageNew = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

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
    <>
      <div 
        className="relative h-screen w-full overflow-hidden text-white font-sans pt-8 pb-8 md:pt-0 md:pb-0"
        style={{ backgroundColor: '#0a0015' }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const el = revealRef.current;
          if (el) {
            el.style.setProperty('--mx', `${x}px`);
            el.style.setProperty('--my', `${y}px`);
          }
        }}
        onMouseLeave={() => {
          const el = revealRef.current;
          if (el) {
            el.style.setProperty('--mx', '-9999px');
            el.style.setProperty('--my', '-9999px');
          }
        }}
      >
      {/* Particles Background */}
      <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={50}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* 
      LaserFlow - Vertical Beam on Right
      <div 
        className="absolute right-0 top-0 w-full h-full z-5 hidden xl:block"
        style={{ 
          height: '100vh', 
          position: 'absolute', 
          overflow: 'hidden',
        }}
      >
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={-0.17}
          color="#CA94FF"
          flowStrength={0.1}
        />
      </div>
      */}

      {/* Logo Section - Top Left */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
        <div 
          className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          onClick={() => router.push('/')}
        >
          {/* Logo Image */}
          <img 
            src="/images/logo.svg" 
            alt="Paradize Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          {/* Logo Text */}
          <h1 className="text-sm sm:text-base md:text-lg tracking-[0.2em] font-[100] text-gray-300">
            P A R A D I Z E
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Main Heading Section */}
        <div className="flex-1 flex items-center justify-start pl-8 sm:pl-16 lg:pl-24">
          <div className="max-w-4xl">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[100] leading-tight text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Turning spare compute<br />
              into one shared brain.
            </motion.h1>
          </div>
        </div>

        {/* Bottom Content Box */}
        <div className="px-4 sm:px-8 lg:px-12 pb-12">
          <motion.div 
            className="w-full max-w-none relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              background: `
                radial-gradient(circle at 1px 1px, rgba(200, 200, 200, 0.3) 1px, transparent 1px),
                rgba(6, 0, 16, 0.6)
              `,
              backgroundSize: '20px 20px, 100% 100%',
              border: '1px solid #CA94FF',
              borderRadius: '20px',
              boxShadow: '0 0 40px rgba(255, 121, 198, 0.3)',
              backdropFilter: 'blur(10px)',
              width: '96%',
              margin: '0 auto'
            }}
          >
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Content Points */}
              <div className="flex-1 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-md sm:text-xl font-extralight leading-relaxed">
                    What if all the unused computers in the world could work together?
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-md sm:text-xl font-extralight leading-relaxed">
                    A network that borrows free computing power to train models faster and cheaper.
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-md sm:text-xl font-extralight leading-relaxed">
                    No big servers, just people sharing what they already have.
                  </p>
                </div>
              </div>

              {/* Email Subscription */}
              <div className="flex-shrink-0 w-full lg:w-auto lg:min-w-[400px] lg:ml-[-50px]">
                <div className="text-center mb-4">
                  <h3 className="text-lg sm:text-3xl font-light text-white mb-2">Join the Network</h3>
                  <p className="text-gray-400 text-base sm:text-lg">Be the first to know when we launch</p>
                </div>
                
                <form ref={form} onSubmit={handleNotifyMe} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="user_email"
                      className="flex-1 bg-transparent border-1 border-gray-600 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300"
                    />
                    <motion.button
                      type="submit"
                      className="bg-transparent border-1 border-white hover:border-[#CA94FF] text-white font-medium rounded-full px-8 py-3 hover:bg-[#CA94FF] hover:text-black transition-color duration-300 whitespace-nowrap cursor-pointer"
                    >
                      NOTIFY ME
                    </motion.button>
                  </div>
                  {message && (
                    <p className="mt-2 text-sm text-center transition-all duration-300">
                      {message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default MissionPageNew;