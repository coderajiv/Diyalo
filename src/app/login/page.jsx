import { Suspense } from 'react';
import LoginForm from '../components/LoginForm';

// A simple loading component to show as a fallback
function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <p>Loading form...</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}