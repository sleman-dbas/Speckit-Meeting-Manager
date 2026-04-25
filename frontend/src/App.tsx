import { useState, useEffect } from 'react';
import MeetingsPage from './pages/MeetingsPage';

function App() {
  const [apiBaseUrl] = useState(import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api');

  useEffect(() => {
    document.title = 'Meeting Management System';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white shadow-sm py-4">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-2xl font-semibold">Meeting Management System</h1>
          <p className="text-slate-600">Organize meetings, tasks, notifications, and audits in one dashboard.</p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <MeetingsPage apiBaseUrl={apiBaseUrl} />
      </main>
    </div>
  );
}

export default App;
