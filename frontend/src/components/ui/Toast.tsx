import Toast, { Toaster as HotToaster } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export const Toaster = () => (
  <HotToaster
    position="top-right"
    toastOptions={{
      duration: 3500,
    }}
  />
);

export const showToast = {
  success: (message: string) =>
    Toast.custom(
      (t) => (
        <div
          className={`flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white/95 px-4 py-3 shadow-panel backdrop-blur ${
            t.visible ? 'animate-in' : 'animate-out'
          }`}
        >
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <p className="text-sm font-medium text-slate-900">{message}</p>
        </div>
      ),
      { duration: 3000 }
    ),

  error: (message: string) =>
    Toast.custom(
      (t) => (
        <div
          className={`flex items-center gap-3 rounded-2xl border border-rose-200 bg-white/95 px-4 py-3 shadow-panel backdrop-blur ${
            t.visible ? 'animate-in' : 'animate-out'
          }`}
        >
          <AlertCircle className="h-5 w-5 text-rose-600" />
          <p className="text-sm font-medium text-slate-900">{message}</p>
        </div>
      ),
      { duration: 3000 }
    ),

  info: (message: string) =>
    Toast.custom(
      (t) => (
        <div
          className={`flex items-center gap-3 rounded-2xl border border-sky-200 bg-white/95 px-4 py-3 shadow-panel backdrop-blur ${
            t.visible ? 'animate-in' : 'animate-out'
          }`}
        >
          <Info className="h-5 w-5 text-sky-600" />
          <p className="text-sm font-medium text-slate-900">{message}</p>
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
