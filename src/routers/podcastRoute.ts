import { Request, Response } from 'express';
import {createPodcast, deletePodcast, getAllPodcast, readPodcast, updatePodcast} from '../controllers/podcastControl'
import {accessValidation} from '../accessValidation/accessValidation';

const express = require('express');
const router = express.Router();

// harus pake token user requestnya
const userAccess = accessValidation(["user"]);

// routing test to podcast
router.post('/', userAccess, createPodcast);
router.get('/:podcaster', userAccess, readPodcast);
router.put('/:id', userAccess, updatePodcast);
router.delete('/:id', userAccess, deletePodcast);

// for testing
router.get('/',  getAllPodcast);

module.exports = router;