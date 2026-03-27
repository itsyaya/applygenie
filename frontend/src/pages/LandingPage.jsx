import React from "react";
import { Button } from "../components/ui/Button";
import { Sparkles, Brain, Clock, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 pt-24 pb-32 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span>New: Support for any career field</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Genie-grade <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">Job Applications</span> <br /> in seconds.
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed">
          Stop spending hours tailoring resumes and cover letters. ApplyGenie uses advanced AI to craft the perfect application for every job, instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="rounded-full gap-2 px-8">
              Get Started for Free <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="secondary" size="lg" className="rounded-full px-8">
            See it in Action
          </Button>
        </div>
        
        {/* Trusted By */}
        <div className="mt-20">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
             <span className="text-2xl font-bold text-gray-800 italic">Google</span>
             <span className="text-2xl font-bold text-gray-800 italic">Meta</span>
             <span className="text-2xl font-bold text-gray-800 italic">Amazon</span>
             <span className="text-2xl font-bold text-gray-800 italic">OpenAI</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why use ApplyGenie?</h2>
            <p className="text-gray-600">We handle the boring stuff, so you can focus on the interview.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
             <FeatureCard 
                icon={<Brain className="w-8 h-8 text-indigo-600" />}
                title="AI-Powered Precision"
                description="Our algorithms analyze job descriptions to highlight your most relevant skills."
             />
             <FeatureCard 
                icon={<Clock className="w-8 h-8 text-primary-600" />}
                title="Finish in Seconds"
                description="What used to take an hour now takes a click. Apply to 10x more jobs with zero quality loss."
             />
             <FeatureCard 
                icon={<ShieldCheck className="w-8 h-8 text-emerald-600" />}
                title="Safe & Private"
                description="Your resume is your data. We secure it with industry-standard encryption."
             />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
      <div className="mb-4 inline-block p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
