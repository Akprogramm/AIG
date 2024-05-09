import express from "express"
import * as dotenv from "dotenv"
import cors from 'cors';
import connectDB from "./mongodb/connect.js";  
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js'
import bodyParser from "body-parser"; 

const app = express();  
 
app.use(bodyParser.json({ limit: '50mb' }));      
 
dotenv.config();    

app.use(cors({
    origin: 'https://aig-3.onrender.com/' 
}));

app.use(express.json({limit: '50mb'}));            
 
app.use("/api/v1/post",postRoutes);
app.use("/api/v1/dalle",dalleRoutes); 
 
app.get('/',async (req,res)=>{ 
    res.send("AI-Image-Generator");
})
  
const startServer = async() => { 
     
    try{
        connectDB(process.env.MONGODB_URL); 
        app.listen(8080,()=>{
            console.log("Server has started on server on http://localhost:8080");
         })
    }
    catch(error){  
        console.log(error);
    }    
    
}
startServer();







