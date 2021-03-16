import * as express from 'express';
import * as path from 'path'
import apiRouter from './routes';

const app = express();

app.use(express.static('public'));
//this is the body parser middleware that parses the JSON content that's POSTed to the API and creates the req.body and passes it along to POST req
app.use(express.json());
//middleware router from apiRouter out of routes
app.use('/api', apiRouter);
// JS code handles some routes on front end that are serparate from routes on the back end
app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, '../public/index.html')); 
}) 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
