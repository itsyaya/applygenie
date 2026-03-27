import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { FileText, Plus, Send, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("resumes");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-10">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
           <p className="text-gray-500 mt-1">Welcome back, John! Manage your applications here.</p>
        </div>
        <Button className="gap-2">
           <Plus className="w-4 h-4" /> New Application
        </Button>
      </div>

      <div className="flex gap-8 border-b border-gray-200 mb-8">
         <TabButton active={activeTab === "resumes"} onClick={() => setActiveTab("resumes")}>Resumes</TabButton>
         <TabButton active={activeTab === "jobs"} onClick={() => setActiveTab("jobs")}>Job Descriptions</TabButton>
         <TabButton active={activeTab === "history"} onClick={() => setActiveTab("history")}>Generated Content</TabButton>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Dashboard Cards would go here */}
        <div className="md:col-span-2 space-y-4">
           <StatusCard 
              title="Senior Frontend Engineer"
              company="Google"
              status="Generated"
              date="2 hours ago"
           />
           <StatusCard 
              title="Product Designer"
              company="Meta"
              status="Pending"
              date="5 hours ago"
           />
        </div>

        <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
           <h3 className="font-bold text-primary-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" /> Quick Actions
           </h3>
           <div className="space-y-3">
              <ActionItem icon={<FileText className="w-4 h-4" />} label="Upload New Resume" />
              <ActionItem icon={<Plus className="w-4 h-4" />} label="Add Job Description" />
              <ActionItem icon={<Send className="w-4 h-4" />} label="Generate Cover Letter" />
           </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`pb-4 text-sm font-medium transition-colors border-b-2 ${
        active 
        ? "border-primary-600 text-primary-600" 
        : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

function StatusCard({ title, company, status, date }) {
  return (
    <div className="p-6 bg-white border border-gray-100 rounded-2xl flex justify-between items-center hover:shadow-md transition-shadow">
       <div className="flex gap-4 items-center">
          <div className="p-3 bg-gray-50 rounded-xl">
             <FileText className="w-6 h-6 text-gray-400" />
          </div>
          <div>
             <h4 className="font-bold text-gray-900">{title}</h4>
             <p className="text-sm text-gray-500">{company}</p>
          </div>
       </div>
       <div className="text-right">
          <div className={`text-xs font-semibold px-2 py-1 rounded-full inline-block mb-1 ${
             status === "Generated" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          }`}>
             {status}
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1 justify-end">
             <Clock className="w-3 h-3" /> {date}
          </p>
       </div>
    </div>
  );
}

function ActionItem({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-primary-100 text-sm font-medium text-primary-900 hover:bg-primary-100 transition-colors text-left">
       {icon} {label}
    </button>
  );
}
