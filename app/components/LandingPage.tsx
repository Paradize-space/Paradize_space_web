"use client";

import { useState, useRef } from 'react';
import CountdownTimer from './CountdownTimer';
import emailjs from '@emailjs/browser';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const form = useRef<HTMLFormElement>(null);

  const SERVICE_ID = 'service_otbykvo';
  const TEMPLATE_ID = 'template_0eecaim';
  const PUBLIC_KEY = 'esBdZb18IMwdoeOPm';

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && form.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
        .then((result) => {
          console.log(result.text);
          setMessage('Thank you! We will notify you when we launch.');
          setEmail(''); // Clear email input on success
        }, (error) => {
          console.log(error.text);
          setMessage('Failed to send email. Please try again later.');
        });
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden text-white font-sans">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          src="/videos/galaxy-2.webm"
        ></video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center md:items-start md:justify-start h-full text-center md:text-left p-6 sm:p-12 md:p-20 lg:p-28">
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
              <div className="flex items-center justify-start space-x-2 mt-4">
                <span className="text-white text-lg font-[100] tracking-tight pointer-events-none">
                  DISCUSS. DEVELOP. GROW.
                </span>
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
                name="user_email" // Added name attribute for Email.js
              />
              <input type="hidden" name="message" value="You will be notified when we launch!" />
              <button
                type="submit" // Changed to type="submit"
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
    </div>
  );
};

export default LandingPage;