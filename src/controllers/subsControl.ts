import { Request, Response } from 'express';
import { getSubsClient,getPendingSubsClient,acceptSubsClient,rejectSubsClient } from '../service/soapUtil';


async function getSubs(req: Request, res: Response) {
  const podcaster = req.params.podcaster;

  try {
    const result = await getSubsClient(podcaster);
    res.send(result);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getPendingSubs = async (req: Request, res: Response) => {
  const podcaster = req.params.podcaster;

  try {
    const result = await getPendingSubsClient(podcaster);
    res.send(result);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const acceptSubs = async (req: Request, res: Response) => {
  const podcaster = req.params.podcaster;
  const subscriber = req.params.subscriber;

  try {
    const result = await acceptSubsClient(podcaster, subscriber);
    res.send(result);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const rejectSubs = async (req: Request, res: Response) => {
  const podcaster = req.params.podcaster;
  const subscriber = req.params.subscriber;

  try {
    const result = await rejectSubsClient(podcaster, subscriber);
    res.send(result);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export {getSubs, getPendingSubs, acceptSubs, rejectSubs}