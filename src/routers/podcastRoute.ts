import { Request, Response } from 'express';
import {createPodcast, deletePodcast, getAllPodcast, readPodcast, updatePodcast} from '../controllers/podcastControl'
import accessValidation from '../accessValidation';

const express = require('express');
const router = express.Router();

// harus pake token user requestnya
const userAccess = accessValidation(["user"]);

// routing test to podcast
router.post('/create', userAccess, createPodcast);
router.get('/read/:podcaster', userAccess, readPodcast);
router.put('/update/:id', userAccess, updatePodcast);
router.delete('/delete/:id', userAccess, deletePodcast);

// for testing
router.get('/getAll',  getAllPodcast);

module.exports = router;