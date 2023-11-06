import { Request, Response } from 'express';
import prisma from "../prismaClient";

const getAllPodcast =async (req:Request, res:Response) => {
  const podcasts = await prisma.podcast.findMany();

  return res.status(200).json(podcasts);
}

const createPodcast = async (req: Request, res: Response) => {
  const {podcaster, title, audio, picture} = req.body;
  if (!podcaster || !title || !audio || !picture) {
    return res.status(400).json({ message: 'Blank field' });
  }

  const podcast = await prisma.podcast.findFirst ({
    where: {
      podcaster,
      title,
    }
  });

  if (podcast) {
    return res.status(400).json({ message: 'Podcast with this title already existed' })
  }
  
  try {
    const newPodcast = await prisma.podcast.create({
      data: {
        podcaster,
        title,
        audio,
        picture,
      },
    });
    
    res.status(200).json(newPodcast);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create the podcast' })
  }
};

const readPodcast =async (req:Request, res:Response) => {
  const podcaster = req.params.podcaster;
  if (!podcaster) {
    return res.status(400).json({ message: 'missing podcaster'})
  }
  try {
    const podcasts = await prisma.podcast.findMany({
      where: {
        podcaster
      }
    })

    return res.status(200).json(podcasts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "failed to fetch data" })
  }
}

const updatePodcast =async (req:Request, res:Response) => {
  const {title, audio, picture} = req.body;
  if (!title || !audio || !picture) {
    return res.status(400).json({ message: 'Blank field' });
  }
  const id = parseInt(req.params.id);
  try {
    await prisma.podcast.update({
      where: {
        id: id
      },
      data: {
        title,
        audio,
        picture
      }
    })
    res.status(200).json({ message: 'Success '})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error update' })
  }
}

const deletePodcast =async (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "missing value" })
  }
  try {
    await prisma.podcast.delete({
      where: {
        id: id
      }
    })
    res.status(200).json({ message: "success" })
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error"});
  }
}

export {getAllPodcast, createPodcast, readPodcast, updatePodcast, deletePodcast}
