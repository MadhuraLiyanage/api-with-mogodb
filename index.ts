require("dotenv").config();

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { ResponseData } from './entities/ResponseData';
import { HttpStatus } from './enums/httpStatusEnum';
import { StatusCode } from './enums/statusCodeEnum';
import { StatusMessage } from './enums/statusMessage';
import branchRoute from './routes/branchRoute';

const dbConnect = require('./database/dbConnect');

const app = express();
const PORT = process.env.PORT || 5000
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
    next();
});
app.use(express.json());

//api routes
//Default response to a root request for both get and post
app.all("/", (req: Request, res: Response) => {
  const htmlString = 
    `<html>
      <head>
        <title>Member Nest
        </title>
      </head>
      <body>
        <center>
          <h1>Member Nest</h1>
          <hr />
          <br />
          <br/>
          <br/>
        </body>
      </html>`;

  // Send the HTML string as the response
  res.status(HttpStatus.OK).send(htmlString);
});
//end of default response for root request

app.use(branchRoute);


// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new ResponseData(StatusCode.InvalidRequest,StatusMessage.InvalidRequest, "Invalid or unauthorized request")
    return next(err);
});

// error handler
app.use((err: typeof ResponseData, req: Request, res: Response, next: NextFunction) => {
  const htmlString = 
  // Send the HTML string as the response
  res.status(HttpStatus.NotFound).send(err);
});

dbConnect()
.then(() => {
  console.log("Successfully connected to the Mongo database.");
  app.listen(PORT, () => {
    console.log(`Member Nest API server listen in ${PORT}`);   
  });
})
.catch((err: Error) => {
  console.log(`Error connecting to Mongo database. Exception : ${err.message}`);
  process.exit();
})

