import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-primary-600 rounded-lg group-hover:bg-primary-700 transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              ApplyGenie<span className="text-primary-600">.ai</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link to="/features" className="hover:text-primary-600 transition-colors">Features</Link>
            <Link to="/pricing" className="hover:text-primary-600 transition-colors">Pricing</Link>
            <Link to="/login" className="hover:text-primary-600 transition-colors">Sign In</Link>
            <Link to="/register">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
