import express, { Request, Response, NextFunction } from 'express';
import prisma from "../prismaClient";

const createReview = async (req: Request, res: Response) => {
  console.log("Masuk create review");
  try {
    const { podcaster, idPodcast , reviewer, review, rating } = req.body;

    if (!(podcaster && idPodcast && reviewer && review && rating)){
      throw new Error("400")
    }
    else if(1 > rating || rating > 5){
      throw new Error("400")
    }
    // error if podcaster or podcast doesnt exist 
    else if (!await prisma.podcast.findUnique({ where : {
                                                podcaster,
                                                id : idPodcast,}})){
      throw new Error("404")                            
    }

    const newReview = await prisma.review.create({
      data: {
        podcaster,
        idPodcast,
        reviewer,
        review,
        rating
      }
    });

    res.status(201).json({ tag: "success" })

  } catch (e){
    switch(e.message){
      case "400":
        res.status(400).json({ tag: "Bad Request", message: "Possible Blank Field, Invalid Value, etc."});
        break;
      case "404":
        res.status(404).json({ tag: "Not Found", message: "Item Not Found"});
        break;
      default:
        res.status(500).json({ tag: "Internal Server Error", message: e.message});
        break;
      }
  }
}

const getReview = async (req: Request, res: Response) => {
  try {

    const userName = req.params.username;
    const podcastId =  parseInt(req.params.podcastid, 10);
    
    const reviews = await prisma.review.findMany({ where : { podcaster: userName, idPodcast: podcastId}})
    
    res.status(200).send(reviews);
  } catch (e) {
    switch(e.message){
      case "400":
        res.status(400).json({ tag: "Bad Request", message: "Possible Blank Field, Invalid Value, etc."});
        break;
      case "404":
        res.status(404).json({ tag: "Not Found", message: "Item Not Found"});
        break;
      default:
        res.status(500).json({ tag: "Internal Server Error", message: e.message});
        break;
      }
  }
}

export { createReview , getReview }