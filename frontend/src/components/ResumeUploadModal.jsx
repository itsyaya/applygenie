import React, { useState } from "react";
import { X, Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./ui/Button";
import api from "../services/api";

export function ResumeUploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      setTimeout(() => {
        onUploadSuccess(response.data.data);
        onClose();
        setSuccess(false);
        setFile(null);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Upload Resume</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-8">
          {!success ? (
            <div className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-colors ${
                  file ? "border-emerald-200 bg-emerald-50" : "border-gray-200 hover:border-primary-400"
                }`}
              >
                <div className={`p-4 rounded-full mb-4 ${file ? "bg-emerald-100 text-emerald-600" : "bg-primary-50 text-primary-600"}`}>
                  <Upload className="w-8 h-8" />
                </div>
                {file ? (
                  <div className="text-center">
                    <p className="font-semibold text-emerald-900">{file.name}</p>
                    <p className="text-xs text-emerald-600">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">Select PDF resume</p>
                    <p className="text-xs text-gray-500 mt-1">Maximum 5MB</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept=".pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={handleFileChange}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 italic">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}

              <Button 
                className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary-200"
                disabled={!file || uploading}
                onClick={handleUpload}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  "Upload & Parse with AI"
                )}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Upload Success!</h3>
              <p className="text-gray-500 mt-2">Your resume has been parsed and stored.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
