import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
import {v2 as cloudinary} from 'cloudinary'

dotenv.config();

const router = express.Router(); 

router.post("/api/genimage", async (req, res) => {
  try {
    const apikey = process.env.apiKey;    
    const { prompt } = req.body;
    const url = "https://api.getimg.ai/v1/stable-diffusion/text-to-image";     
    const options = {
      method: "POST",
      headers: { 
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${apikey}`,   
      },
      body: JSON.stringify({
        prompt,      
        steps: 100,
        height: 512,   
        width: 512,
        output_format: "jpeg",
        model: "stable-diffusion-v1-5",   
      }),
    };

    fetch(url, options)
      .then((res) => res.json(res))
      .then((json) => res.json(json))
      .catch((err) => res.json("error:" + err));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router; 

