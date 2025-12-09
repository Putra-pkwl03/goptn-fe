'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { CheckCircle2, AlertTriangle, Info, X, Trash2 } from 'lucide-react';

type AlertVariant = 'success' | 'info' | 'warning' | 'error' | 'delete';

interface AlertState {
  variant: AlertVariant;
  title: string;
  description?: string;
}

interface AlertContextValue {
  showAlert: (alert: AlertState) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return ctx;
}

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showAlert = useCallback((newAlert: AlertState) => {
    setAlert(newAlert);

    // auto hide setelah 2.5 detik
    setTimeout(() => {
      setAlert((current) =>
        current === newAlert ? null : current
      );
    }, 2500);
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const getBorderColor = (variant: AlertVariant) => {
    switch (variant) {
      case 'success':
        return 'border-green-100';
      case 'info':
        return 'border-blue-100';
      case 'warning':
        return 'border-yellow-100';
      case 'error':
        return 'border-red-200';
      case 'delete':
        return 'border-red-100';
      default:
        return 'border-gray-200';
    }
  };

  const getIcon = (variant: AlertVariant) => {
    switch (variant) {
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-500 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500 mt-0.5" />;
      case 'error':
      case 'delete':
        return <Trash2 className="w-6 h-6 text-red-500 mt-0.5" />;
      default:
        return null;
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      {/* Global Alert UI */}
      {alert && (
        <div className="fixed top-6 right-6 z-[9999]">
          <div
            className={`flex items-start gap-4 bg-white shadow-xl rounded-xl px-5 py-4 border ${getBorderColor(
              alert.variant
            )} transition-all duration-300 ease-out`}
          >
            {getIcon(alert.variant)}

            <div className="max-w-xs">
              <p className="text-base font-semibold text-gray-800">
                {alert.title}
              </p>
              {alert.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {alert.description}
                </p>
              )}
            </div>

            <button
              onClick={hideAlert}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}
