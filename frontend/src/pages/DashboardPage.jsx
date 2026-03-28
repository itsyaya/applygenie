import { ResumeUploadModal } from "../components/ResumeUploadModal";
import { FileText, Plus, Send, Clock, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("resumes");
  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleUploadSuccess = (newResume) => {
    setResumes([newResume, ...resumes]);
  };

  const handleMatch = async (jobId) => {
    if (resumes.length === 0) {
      alert("Please upload a resume first!");
      return;
    }
    
    try {
      // POST /job/{jobId}/match/{resumeId}
      const response = await api.post(`/job/${jobId}/match/${resumes[0].id}`);
      console.log("Matching result:", response.data.data);
      alert("AI Matching completed! Check the results.");
    } catch (err) {
      console.error("Matching failed", err);
      if (err.response?.status === 403) {
        alert("Usage limit reached! Please upgrade to PRO.");
      } else {
        alert("Error during AI Matching.");
      }
    }
  };

  const handleUpgrade = async () => {
    try {
      const response = await api.post("/api/payments/create-checkout-session");
      if (response.data?.data) {
        window.location.href = response.data.data; // Redirect to Stripe
      }
    } catch (err) {
      console.error("Upgrade failed", err);
      alert("Failed to initiate upgrade.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumesRes, jobsRes] = await Promise.all([
          api.get("/resume/user"),
          api.get("/job/user"),
        ]);
        setResumes(resumesRes.data.data?.content || []); // Added .content for Page
        setJobs(jobsRes.data.data?.content || []); // Added .content for Page
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-10">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
           <div className="flex items-center gap-2 mt-1">
              <p className="text-gray-500">Welcome back, {user?.name || "User"}!</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                user?.subscriptionTier === 'PRO' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}>
                {user?.subscriptionTier || 'FREE'}
              </span>
           </div>
        </div>
        <div className="flex gap-3">
          {user?.subscriptionTier !== 'PRO' && (
            <Button variant="outline" className="gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50" onClick={handleUpgrade}>
              <Sparkles className="w-4 h-4" /> Upgrade to PRO
            </Button>
          )}
          <Button className="gap-2">
             <Plus className="w-4 h-4" /> New Application
          </Button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-gray-200 mb-8">
         <TabButton active={activeTab === "resumes"} onClick={() => setActiveTab("resumes")}>Resumes</TabButton>
         <TabButton active={activeTab === "jobs"} onClick={() => setActiveTab("jobs")}>Job Descriptions</TabButton>
         <TabButton active={activeTab === "history"} onClick={() => setActiveTab("history")}>Generated Content</TabButton>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {activeTab === "resumes" && (
            resumes.length > 0 ? (
              resumes.map((resume) => (
                <StatusCard 
                  key={resume.id}
                  title={resume.fileName}
                  company="Your Resume"
                  status="Parsed"
                  date={new Date(resume.createdAt).toLocaleDateString()}
                  icon={<FileText className="w-6 h-6 text-primary-500" />}
                />
              ))
            ) : (
              <EmptyState message="No resumes uploaded yet." />
            )
          )}

          {activeTab === "jobs" && (
            jobs.length > 0 ? (
              jobs.map((job) => (
                <StatusCard 
                  key={job.id}
                  title={job.title}
                  company={job.company}
                  status="Active"
                  date={new Date(job.createdAt).toLocaleDateString()}
                  action={
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => handleMatch(job.id)}
                    >
                      <Sparkles className="w-4 h-4 text-primary-500" /> Match
                    </Button>
                  }
                />
              ))
            ) : (
              <EmptyState message="No job descriptions added yet." />
            )
          )}
        </div>

        <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100 h-fit">
           <h3 className="font-bold text-primary-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" /> Quick Actions
           </h3>
           <div className="space-y-3">
              <ActionItem 
                icon={<FileText className="w-4 h-4" />} 
                label="Upload New Resume" 
                onClick={() => setIsUploadModalOpen(true)}
              />
              <ActionItem icon={<Plus className="w-4 h-4" />} label="Add Job Description" />
              <ActionItem icon={<Send className="w-4 h-4" />} label="Generate Cover Letter" />
           </div>

           {user?.subscriptionTier !== 'PRO' && (
             <div className="mt-8 p-4 bg-white rounded-xl border border-indigo-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Pro Benefits</p>
                <ul className="text-xs text-gray-600 space-y-2">
                   <li className="flex items-center gap-2">🚀 Unlimited AI Matching</li>
                   <li className="flex items-center gap-2">⚡ Priority Processing</li>
                   <li className="flex items-center gap-2">💬 Custom Cover Letters</li>
                </ul>
                <Button fullWidth size="sm" className="mt-4 bg-indigo-600 hover:bg-indigo-700" onClick={handleUpgrade}>
                   Upgrade Now
                </Button>
             </div>
           )}
        </div>
      </div>

        <ResumeUploadModal 
          isOpen={isUploadModalOpen} 
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
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

function StatusCard({ title, company, status, date, icon, action }) {
  return (
    <div className="p-6 bg-white border border-gray-100 rounded-2xl flex justify-between items-center hover:shadow-md transition-shadow group">
       <div className="flex gap-4 items-center">
          <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-primary-50 transition-colors">
             {icon || <FileText className="w-6 h-6 text-gray-400" />}
          </div>
          <div>
             <h4 className="font-bold text-gray-900 group-hover:text-primary-900 transition-colors">{title}</h4>
             <p className="text-sm text-gray-500">{company}</p>
          </div>
       </div>
       <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
            {action}
            <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
               status === "Generated" || status === "Parsed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}>
               {status}
            </div>
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1 justify-end">
             <Clock className="w-3 h-3" /> {date}
          </p>
       </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
      <AlertCircle className="w-12 h-12 text-gray-300 mb-4" />
      <p className="text-gray-500 font-medium">{message}</p>
    </div>
  );
}

function ActionItem({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-primary-100 text-sm font-medium text-primary-900 hover:bg-primary-100 transition-colors text-left"
    >
       {icon} {label}
    </button>
  );
}
