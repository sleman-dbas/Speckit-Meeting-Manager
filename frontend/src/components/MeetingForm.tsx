import { FormEvent, useState } from 'react';
import { MeetingCreatePayload } from '../services/meetingService';

interface MeetingFormProps {
  onSubmit: (payload: MeetingCreatePayload) => Promise<void>;
}

const defaultPayload: MeetingCreatePayload = {
  title: '',
  description: '',
  date: '',
  startTime: '09:00',
  durationMinutes: 60,
  location: '',
  confidentialityLevel: 'Public',
  status: 'Pending',
};

function MeetingForm({ onSubmit }: MeetingFormProps) {
  const [form, setForm] = useState<MeetingCreatePayload>(defaultPayload);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof MeetingCreatePayload, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
      setForm(defaultPayload);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Title</span>
          <input
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Location</span>
          <input
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Date</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Start Time</span>
          <input
            type="time"
            value={form.startTime}
            onChange={(e) => handleChange('startTime', e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Duration (minutes)</span>
          <input
            type="number"
            value={form.durationMinutes}
            min={1}
            onChange={(e) => handleChange('durationMinutes', Number(e.target.value))}
            required
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Confidentiality</span>
          <select
            value={form.confidentialityLevel}
            onChange={(e) => handleChange('confidentialityLevel', e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          >
            <option value="Public">Public</option>
            <option value="Internal">Internal</option>
            <option value="Restricted">Restricted</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Status</span>
          <select
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Description</span>
        <textarea
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {submitting ? 'Creating…' : 'Create Meeting'}
      </button>
    </form>
  );
}

export default MeetingForm;
