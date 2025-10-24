import type { Metadata } from 'next';
import LoginForm from './_components/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
