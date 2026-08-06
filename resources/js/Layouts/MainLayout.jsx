import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}