import createApiClient from './apiClient';

export interface MeetingCreatePayload {
  title: string;
  description: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  location: string;
  confidentialityLevel: 'Public' | 'Internal' | 'Restricted';
  status: 'Pending' | 'Confirmed';
}

export interface MeetingResponse {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  location: string;
  confidentialityLevel: string;
  status: string;
  organizerId: string;
}

const createMeetingService = (apiBaseUrl: string) => {
  const api = createApiClient(apiBaseUrl);

  const getMeetings = async (): Promise<MeetingResponse[]> => {
    const response = await api.get('/meetings');
    return response.data.data;
  };

  const createMeeting = async (payload: MeetingCreatePayload): Promise<MeetingResponse> => {
    const response = await api.post('/meetings', payload);
    return response.data;
  };

  return {
    getMeetings,
    createMeeting,
  };
};

export default createMeetingService;
