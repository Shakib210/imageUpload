import express from 'express'
import connectDB from './mongoDb.js';
import cors from 'cors';
import dotenv from 'dotenv';
import configureAllRoutes from './src/routes/index.js';
import handleError from './src/middlewares/handleError.js';
import fileUpload from 'express-fileupload';

const app = express()
const port = 5000

dotenv.config()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('resource'));
app.use(fileUpload())


configureAllRoutes(app);

app.all('*', (req, res) => {
  return res.status(404).json({ success: false, msg: 'Route not found' });
});
// Handle error
app.use(handleError);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  connectDB()
})
