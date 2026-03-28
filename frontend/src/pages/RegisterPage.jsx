import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/register", formData);
      const { user, accessToken, refreshToken } = response.data.data;
      setAuth(user, accessToken, refreshToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-2 mb-6 group">
          <Sparkles className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-bold text-gray-900">ApplyGenie</span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input 
              label="Full Name"
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
            />
            
            <Input 
              label="Email address"
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="john@example.com"
            />

            <Input 
              label="Password"
              type="password" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
            />

            <div className="pt-2">
              <ul className="space-y-2 text-xs text-gray-500">
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> At least 8 characters</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Includes a special character</li>
              </ul>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          
          <p className="mt-6 text-center text-xs text-gray-400">
            By clicking "Create Account", you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
