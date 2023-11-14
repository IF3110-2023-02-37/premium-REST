import { Request, Response } from 'express';
import { getSubsClient } from '../service/soapUtil';


async function getSubs(req: Request, res: Response) {
  const podcaster = req.params.podcaster;

  try {
    const result = await getSubsClient(podcaster);
    res.json({
      success: true,
      message: "You arrive at subs",
      data: result
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getPendingSubs = async (req: Request, res: Response) => {

};

const acceptSubs = async (req: Request, res: Response) => {

};

const rejectSubs = async (req: Request, res: Response) => {

};

export {getSubs, getPendingSubs, acceptSubs, rejectSubs}