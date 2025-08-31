import { NextApiRequest, NextApiResponse } from 'next';
import { CareerPathsService } from '../../../services/careerPaths';

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
    console.error('Career paths API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { category, difficulty, search, featured } = req.query;

  try {
    let careerPaths;

    if (search && typeof search === 'string') {
      careerPaths = await CareerPathsService.searchCareerPaths(search);
    } else if (category && typeof category === 'string') {
      careerPaths = await CareerPathsService.getCareerPathsByCategory(category);
    } else if (difficulty && typeof difficulty === 'string') {
      careerPaths = await CareerPathsService.getCareerPathsByDifficulty(difficulty);
    } else if (featured === 'true') {
      careerPaths = await CareerPathsService.getFeaturedCareerPaths();
    } else {
      careerPaths = await CareerPathsService.getAllCareerPaths();
    }

    res.status(200).json(careerPaths);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch career paths' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  // Only admins can create career paths
  // You would implement authentication middleware here
  
  try {
    const careerPathData = req.body;
    
    // Validate required fields
    if (!careerPathData.title || !careerPathData.description || !careerPathData.category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create career path using Supabase directly since this is an admin operation
    const { createClient } = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('career_paths')
      .insert(careerPathData)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create career path' });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create career path' });
  }
}



