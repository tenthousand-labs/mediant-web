'use client';

import LoginForm from '@components/forms/LoginForm';

export default function LoginPage() {
  return (
    <main className="relative isolate m-4">
      <div className="mx-auto my-48 max-w-2xl">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          Welcome back
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
