'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username: loginUsername,
        password: loginPassword,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid username or password');
      } else {
        router.push('/exercises'); // Redirect to exercises page after login
        router.refresh();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Welcome Back to OwNnit
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-purple-600 hover:text-purple-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}