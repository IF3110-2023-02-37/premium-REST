import { Request, Response } from 'express';
import { getSubsClient,getPendingSubsClient,acceptSubsClient,rejectSubsClient, getAllPendingSubsClient, parseXML } from '../service/soapUtil';


async function getSubs(req: Request, res: Response) {
  const podcaster = req.params.podcaster;

  try {
    const result = await getSubsClient(podcaster);
    res.send(parseXML(result, "getSubs"));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

async function getAllPendingSubs(req: Request, res: Response) {
  const podcaster = req.params.podcaster;

  try {
    const result = await getAllPendingSubsClient();
    res.send(parseXML(result, "getAllPendingSubs"));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getPendingSubs = async (req: Request, res: Response) => {
  const podcaster = req.params.podcaster;

  try {
    const result = await getPendingSubsClient(podcaster);
    res.send(parseXML(result, "getPendingSubs"));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const acceptSubs = async (req: Request, res: Response) => {
  const podcaster = req.params.podcaster;
  const subscriber = req.params.subscriber;

  try {
    const result = await acceptSubsClient(podcaster, subscriber);
    res.send(parseXML(result, "acceptSubs"));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const rejectSubs = async (req: Request, res: Response) => {
  const podcaster = req.params.podcaster;
  const subscriber = req.params.subscriber;

  try {
    const result = await rejectSubsClient(podcaster, subscriber);
    res.send(parseXML(result, "rejectSubs"));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export {getSubs, getPendingSubs, acceptSubs, rejectSubs, getAllPendingSubs}