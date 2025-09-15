"use client";

import { useState, useRef } from 'react';
import CountdownTimer from './CountdownTimer';
import emailjs from '@emailjs/browser';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const form = useRef<HTMLFormElement>(null);

  const SERVICE_ID = 'service_wwz6y9h';
  // Template for the email sent to the user
  const TEMPLATE_ID_USER = 'template_7w9zhwi'; 
  // IMPORTANT: Create a new template for the admin notification and add its ID here
  const TEMPLATE_ID_ADMIN = 'template_pkir7h4'; 
  const PUBLIC_KEY = 'yANzsioyREUuX2qRK';

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
    <div className="relative h-screen w-full overflow-hidden text-white font-sans">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover contrast-125 opacity-60"
          autoPlay
          loop
          muted
          src="/videos/galaxy-2.webm"
        ></video>
        <div className="absolute inset-0"></div>
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
    </div>
  );
};

export default LandingPage;
