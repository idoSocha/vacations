//imports
import bodyParser from "body-parser";
import cors from "cors"; //npm install cors
import express from "express";
import fileUpload from "express-fileupload";
// import loginRouter from "./Routes/LoginRoutes";
import router from "./Routes/Routes";
import config from "./Utils/config";
import logic from "./Logic/Logic";
import ErrorHandler from "./MiddleWare/route-not-found";

//create server
const server = express();

//handle cors
server.use(cors());

//how we send the data back (JSON,XML,RAW,String)
server.use(express.json());

//where i will save the vacations
server.use(express.static("vacations_img"));

//enable file uploading, and create a path for the files if it not exists
server.use(fileUpload({ createParentPath: true }));

//parse the body as json , for easy work
server.use(bodyParser.json());

//how to use the routes
server.use("/api/v1/vacations", router);
// server.use("/api/v1/users", loginRouter);

//create our tables if they not exists
console.log("check if table exists...");
logic.createVacationTable();
logic.createUserTable();
logic.createFollowerTable();
// logic.createFollowersTable();

//handle errors (route not found)
server.use("*", ErrorHandler);

//start the server
server.listen(config.WebPort, () => {
  console.log(`listening on http://${config.mySQLhost}:${config.WebPort}`);
});
