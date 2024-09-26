import express ,{Request ,Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import myUserRoute from './routes/myUserRoute'
dotenv.config();
const app = express();
 app.use(cors(
   {
      origin: '*',  // Adjust this based on your security needs
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: 'Authorization, Content-Type',
    }
 ));
app.use(express.json())
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{console.log("Connected to DataBase")})

app.use('/api/my/user' , myUserRoute);

app.get('/health' , async (req : Request , res : Response)=>{
    res.send("Health is Ok !")
})

 app.listen(7000 ,()=>{
    console.log({message : "everything run fine"})
 })