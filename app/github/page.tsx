'use client';

import { useState } from 'react';

export default function GitHubTokenForm() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MEDIANT_API_URL}/github`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
          credentials: 'include',
        }
      );

      if (res.ok) {
        setStatus('success');
        setToken('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">GitHub Token</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your GitHub token"
          className="border p-2 rounded-md"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {status === 'loading' ? 'Saving...' : 'Submit'}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-3 text-green-600">Token saved successfully!</p>
      )}
      {status === 'error' && (
        <p className="mt-3 text-red-600">Error saving token.</p>
      )}
    </div>
  );
}
