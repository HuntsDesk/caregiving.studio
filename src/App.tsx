import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import AuthRequired from './components/auth/AuthRequired';
import MainLayout from './components/layout/MainLayout';
import ConnectionProvider from './contexts/ConnectionContext';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <ConnectionProvider>
            <AuthRequired>
              <MainLayout />
            </AuthRequired>
          </ConnectionProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}