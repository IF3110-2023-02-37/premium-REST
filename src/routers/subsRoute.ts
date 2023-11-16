const express = require('express')
const router = express.Router()
import { getSubs, getPendingSubs, acceptSubs, rejectSubs } from '../controllers/subsControl';
import { Request, Response } from 'express';
import { accessValidation } from '../accessValidation/accessValidation';

const userAccess = accessValidation(["user"]);

router.get('/:podcaster', userAccess, (req: Request, res: Response) => {
    getSubs(req, res);
});

router.get('/pendingsubs/:podcaster', userAccess, (req: Request, res: Response) => {
    getPendingSubs(req, res);
});

router.put('/accsubs/:podcaster/:username', userAccess, (req: Request, res: Response) => {
    acceptSubs(req, res);
});

router.put('/rejsubs/:podcaster/:username', userAccess, (req: Request, res: Response) => {
    rejectSubs(req, res);
});

module.exports = router;
