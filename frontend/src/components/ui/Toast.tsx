import React from 'react';
import Toast, { Toaster as HotToaster } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export const Toaster = () => <HotToaster position="top-right" />;

export const showToast = {
  success: (message: string) =>
    Toast.custom(
      (t) => (
        <div
          className={`flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lg border border-green-200 ${
            t.visible ? 'animate-in' : 'animate-out'
          }`}
        >
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
      ),
      { duration: 3000 }
    ),

  error: (message: string) =>
    Toast.custom(
      (t) => (
        <div
          className={`flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lg border border-red-200 ${
            t.visible ? 'animate-in' : 'animate-out'
          }`}
        >
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
      ),
      { duration: 3000 }
    ),

  info: (message: string) =>
    Toast.custom(
      (t) => (
        <div
          className={`flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lg border border-blue-200 ${
            t.visible ? 'animate-in' : 'animate-out'
          }`}
        >
          <Info className="h-5 w-5 text-blue-600" />
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
      ),
      { duration: 3000 }
    ),

  loading: (message: string) => Toast.loading(message),

  dismiss: (id?: string) => {
    if (id) {
      Toast.dismiss(id);
    } else {
      Toast.dismiss();
    }
  },
};
