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
    
    res.status(200).json({ data: newPodcast});
  } catch (error) {
    console.error("error "+ error);
    res.status(400).json({ message: 'Failed to create the podcast' })
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
      },
      orderBy: {
        date: 'desc', 
      },
    })

    return res.status(200).json({ data: podcasts});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "failed to fetch data" })
  }
}

// const updatePodcast =async (req:Request, res:Response) => {
//   const {title, audio, picture} = req.body;
//   if (!title || !audio || !picture) {
//     return res.status(400).json({ message: 'Blank field' });
//   }
//   const id = parseInt(req.params.id);
//   try {
//     await prisma.podcast.update({
//       where: {
//         id: id
//       },
//       data: {
//         title,
//         audio,
//         picture
//       }
//     })
//     res.status(200).json({ message: 'Success '})
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'error update' })
//   }
// }
const updatePodcast = async (req: Request, res: Response) => {
  const { title, audio, picture } = req.body;
  if (!title && !audio && !picture) {
    return res.status(400).json({ message: 'No fields provided for update' });
  }

  const id = parseInt(req.params.id);

  try {
    const existingPodcast = await prisma.podcast.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingPodcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    const dataToUpdate: Record<string, any> = {};

    if (title !== undefined) {
      dataToUpdate.title = title;
    }

    if (audio !== undefined) {
      dataToUpdate.audio = audio;
    }

    if (picture !== undefined) {
      dataToUpdate.picture = picture;
    }

    const updatedPodcast = await prisma.podcast.update({
      where: {
        id: id,
      },
      data: dataToUpdate,
    });

    res.status(200).json({ message: 'Success', data: updatedPodcast });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating podcast' });
  }
};


const deletePodcast =async (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "missing value" })
  }
  try {
    const podcast = await prisma.podcast.delete({
      where: {
        id: id
      }
    })
    res.status(200).json({ data:podcast, message: "success" })
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error"});
  }
}

export {getAllPodcast, createPodcast, readPodcast, updatePodcast, deletePodcast}
