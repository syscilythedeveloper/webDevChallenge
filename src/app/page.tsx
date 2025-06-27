"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf5ec] via-[#e0f2ef] to-[#fefcf5]">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-[#334b35]">Ultai</div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-[#334b35] hover:text-[#4a6b4a] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-[#334b35] hover:text-[#4a6b4a] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#about"
              className="text-[#334b35] hover:text-[#4a6b4a] transition-colors"
            >
              About
            </a>
          </div>
          <Link href="/dashboard">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#6b8e6b',
                '&:hover': {
                  backgroundColor: '#5a7a5a',
                },
                color: 'white',
                px: 3,
                py: 1,
                borderRadius: '9999px',
                fontWeight: 500,
                textTransform: 'none',
              }}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#334b35] mb-8 leading-tight">
            Your AI-Powered
            <span className="block bg-gradient-to-r from-[#6b8e6b] to-[#4a6b4a] bg-clip-text text-transparent">
              Skincare Expert
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#5a6b5a] mb-12 max-w-3xl mx-auto leading-relaxed">
            Get personalized skincare recommendations powered by advanced AI.
            Discover products tailored to your unique skin needs and concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#6b8e6b',
                  color: 'white',
                  px: 4,
                  py: 2,
                  borderRadius: '9999px',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: '#5a7a5a',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                Start Your Consultation
              </Button>
            </Link>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#6b8e6b',
                color: '#6b8e6b',
                '&:hover': {
                  backgroundColor: '#6b8e6b',
                  color: 'white',
                  borderColor: '#6b8e6b',
                },
                px: 4,
                py: 2,
                borderRadius: '9999px',
                fontSize: '1.125rem',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#334b35] mb-6">
              Why Choose Ultai?
            </h2>
            <p className="text-xl text-[#5a6b5a] max-w-2xl mx-auto">
              Revolutionary AI technology meets expert skincare knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#6b8e6b] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#334b35] mb-4 text-center">
                AI-Powered Analysis
              </h3>
              <p className="text-[#5a6b5a] text-center leading-relaxed">
                Advanced AI analyzes your skin type, concerns, and preferences
                to create personalized recommendations
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#6b8e6b] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#334b35] mb-4 text-center">
                Smart Product Search
              </h3>
              <p className="text-[#5a6b5a] text-center leading-relaxed">
                Lightning-fast search through thousands of products to find
                exactly what your skin needs
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#6b8e6b] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#334b35] mb-4 text-center">
                Personalized Care
              </h3>
              <p className="text-[#5a6b5a] text-center leading-relaxed">
                Every recommendation is tailored to your unique skin profile and
                beauty goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-6 bg-white/30 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#334b35] mb-6">
              How It Works
            </h2>
            <p className="text-xl text-[#5a6b5a] max-w-2xl mx-auto">
              Get personalized skincare recommendations in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#6b8e6b] rounded-full flex items-center justify-center mb-6 mx-auto text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#334b35] mb-4">
                Chat with AI
              </h3>
              <p className="text-[#5a6b5a] leading-relaxed">
                Tell our AI about your skin type, concerns, and skincare goals
                through a friendly conversation
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#6b8e6b] rounded-full flex items-center justify-center mb-6 mx-auto text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#334b35] mb-4">
                Get Recommendations
              </h3>
              <p className="text-[#5a6b5a] leading-relaxed">
                Receive personalized ingredient and product recommendations
                based on your unique profile
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#6b8e6b] rounded-full flex items-center justify-center mb-6 mx-auto text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#334b35] mb-4">
                Discover Products
              </h3>
              <p className="text-[#5a6b5a] leading-relaxed">
                Browse and compare products that match your needs, save
                favorites, and build your perfect routine
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#334b35] mb-6">
            Ready to Transform Your Skin?
          </h2>
          <p className="text-xl text-[#5a6b5a] mb-8 leading-relaxed">
            Join thousands of users who have discovered their perfect skincare
            routine with Ultai
          </p>
          <Link href="/dashboard">
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#6b8e6b',
                color: 'white',
                px: 6,
                py: 2.5,
                borderRadius: '9999px',
                fontSize: '1.25rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#5a7a5a',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#334b35] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-3xl font-bold mb-4">Ultai</div>
          <p className="text-[#a0b5a0] mb-8">
            AI-Powered Skincare for Everyone
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <a
              href="#"
              className="hover:text-[#6b8e6b] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-[#6b8e6b] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-[#6b8e6b] transition-colors"
            >
              Contact
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-[#4a6b4a] text-[#a0b5a0] text-sm">
            © 2025 Ultai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
