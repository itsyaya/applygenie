import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  FileText,
  Zap,
  Lock,
  CheckCircle,
  ArrowRight,
  Users,
  TrendingUp,
} from 'lucide-react';
import { ROUTES } from '@/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Background decorative elements */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 mb-6"
          >
            <span className="text-sm font-medium text-indigo-700">
              🚀 Introducing ApplyGenie - Your AI Job Application Assistant
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mt-6 leading-tight">
            Your AI Job<br />
            <motion.span
              className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Application Assistant
            </motion.span>
          </h1>

          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Manage resumes, tailor applications, and land your dream job faster with AI-powered insights. Say goodbye to generic applications.
          </motion.p>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => navigate(ROUTES.REGISTER)}
              className="h-12 px-8 text-base"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(ROUTES.LOGIN)}
              className="h-12 px-8 text-base"
            >
              Sign In
            </Button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 rounded-2xl overflow-hidden border border-gray-200 shadow-2xl"
          >
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 aspect-video flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <div className="h-16 w-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-2xl">✨</span>
                  </div>
                </motion.div>
                <p className="mt-4 text-gray-600 font-medium">Dashboard Preview</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900">
            Powerful Features
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to manage your job search efficiently
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: FileText,
              title: 'Resume Management',
              description: 'Upload, organize, and manage multiple versions of your resumes in one secure location.',
            },
            {
              icon: Zap,
              title: 'AI-Powered Applications',
              description: 'Generate perfectly tailored cover letters and applications instantly with AI assistance.',
            },
            {
              icon: CheckCircle,
              title: 'Job Matching',
              description: 'Find jobs that match your skills and track your applications in real-time.',
            },
            {
              icon: Lock,
              title: 'Secure & Private',
              description: 'Your data is encrypted and secure. We never share your information with third parties.',
            },
            {
              icon: TrendingUp,
              title: 'Success Tracking',
              description: 'Track your application progress and success rates to optimize your job search strategy.',
            },
            {
              icon: Users,
              title: 'Collaboration',
              description: 'Share applications and get feedback from mentors and friends.',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group rounded-xl border border-gray-200 bg-white p-8 hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
            >
              <motion.div
                className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <feature.icon className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors" />
              </motion.div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900">
            How It Works
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              number: '1',
              title: 'Upload Your Resume',
              description: 'Start by uploading your resume and professional information securely.',
            },
            {
              number: '2',
              title: 'Find Your Dream Job',
              description: 'Browse and save job descriptions that match your career goals.',
            },
            {
              number: '3',
              title: 'Generate & Apply',
              description: 'Let AI generate tailored applications and cover letters instantly.',
            },
          ].map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="text-center">
              <motion.div
                className="h-16 w-16 mx-auto rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center font-bold text-xl text-indigo-600 shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                {step.number}
              </motion.div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Ready to land your dream job?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Join thousands of job seekers using ApplyGenie
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Button
              onClick={() => navigate(ROUTES.REGISTER)}
              size="lg"
              className="h-14 px-10"
            >
              Get Started for Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2024 ApplyGenie. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
