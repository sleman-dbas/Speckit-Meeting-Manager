import { useEffect, useState } from 'react';
import createMeetingService, { MeetingCreatePayload, MeetingResponse } from '../services/meetingService';
import MeetingForm from '../components/MeetingForm';

interface MeetingsPageProps {
  apiBaseUrl: string;
}

function MeetingsPage({ apiBaseUrl }: MeetingsPageProps) {
  const [meetings, setMeetings] = useState<MeetingResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const meetingService = createMeetingService(apiBaseUrl);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const data = await meetingService.getMeetings();
      setMeetings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load meetings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleCreateMeeting = async (payload: MeetingCreatePayload) => {
    setError(null);
    try {
      const meeting = await meetingService.createMeeting(payload);
      setMeetings((current) => [meeting, ...current]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create meeting.');
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Create a Meeting</h2>
        <MeetingForm onSubmit={handleCreateMeeting} />
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Meetings</h2>
          {loading ? <span className="text-sm text-slate-500">Loading...</span> : null}
        </div>
        {meetings.length === 0 ? (
          <p className="mt-4 text-slate-600">No meetings yet. Create one to get started.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{meeting.title}</h3>
                    <p className="text-sm text-slate-500">{meeting.date} • {meeting.startTime} • {meeting.durationMinutes} min</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {meeting.status}
                  </span>
                </div>
                <p className="mt-3 text-slate-600">{meeting.location}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MeetingsPage;
