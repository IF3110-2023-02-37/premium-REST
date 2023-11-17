const express = require('express')
const router = express.Router()
import { getSubs, getPendingSubs, acceptSubs, rejectSubs } from '../controllers/subsControl';
import { Request, Response } from 'express';
import { accessValidation } from '../accessValidation/accessValidation';

const userAccess = accessValidation(["user"]);

router.post('/:podcaster', userAccess, (req: Request, res: Response) => {
    getSubs(req, res);
});

router.post('/pendingsubs/:podcaster', userAccess, (req: Request, res: Response) => {
    getPendingSubs(req, res);
});

router.post('/accsubs/:podcaster/:username', userAccess, (req: Request, res: Response) => {
    acceptSubs(req, res);
});

router.post('/rejsubs/:podcaster/:username', userAccess, (req: Request, res: Response) => {
    rejectSubs(req, res);
});

module.exports = router;
