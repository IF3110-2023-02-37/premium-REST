const express = require('express')
const router = express.Router()
import { getSubs, getPendingSubs, acceptSubs, rejectSubs, getAllPendingSubs } from '../controllers/subsControl';
import { Request, Response } from 'express';
import { accessValidation } from '../accessValidation/accessValidation';

const adminAccess = accessValidation(["admin"]);

router.post('/:podcaster', adminAccess, (req: Request, res: Response) => {
    getSubs(req, res);
});

router.post('/pendingsubs/:podcaster', adminAccess, (req: Request, res: Response) => {
    getPendingSubs(req, res);
});

router.get('/', adminAccess, (req: Request, res: Response) => {
    getAllPendingSubs(req, res);
});

router.post('/accsubs/:podcaster/:username', adminAccess, (req: Request, res: Response) => {
    acceptSubs(req, res);
});

router.post('/rejsubs/:podcaster/:username', adminAccess, (req: Request, res: Response) => {
    rejectSubs(req, res);
});

module.exports = router;
