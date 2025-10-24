import type { Metadata } from 'next';
import RegisterForm from './_components/RegisterForm';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
}
