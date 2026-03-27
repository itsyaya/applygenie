import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] text-gray-900 font-sans selection:bg-primary-100 selection:text-primary-900">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ApplyGenie.ai. Built for career excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}
