import { NextApiRequest, NextApiResponse } from 'next';
import { GuidanceSessionsService } from '../../../services/guidanceSessions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        await handleGet(req, res);
        break;
      case 'POST':
        await handlePost(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Guidance sessions API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { userId, role, status, mentorId } = req.query;

  try {
    let sessions;

    if (role === 'student' && userId) {
      sessions = await GuidanceSessionsService.getStudentSessions(userId as string);
    } else if (role === 'mentor' && mentorId) {
      if (status === 'pending') {
        sessions = await GuidanceSessionsService.getPendingMentorSessions(mentorId as string);
      } else {
        sessions = await GuidanceSessionsService.getMentorSessions(mentorId as string);
      }
    } else {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sessionData = req.body;
    
    // Validate required fields
    if (!sessionData.student_id || !sessionData.session_date || !sessionData.session_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create session
    const session = await GuidanceSessionsService.createSession(sessionData);

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
}



