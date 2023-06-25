import express, { NextFunction, Request, Response } from "express";
import Logic from "../Logic/Logic";
import upload from "../Logic/FileUpload";

//creating the router
const router = express.Router();

////Vacations/////

//adding a new vacation by admin
router.post(
  "/addVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const newVacation = request.body;
    const result = await Logic.addVacation(newVacation);
    response.status(201).json({
      newVacation: result,
      vacationId: result.vacation_code,
      message: "Vacation added successfully",
    });
  }
);
//for upload an image

router.post(
  "/upload/:id",
  upload.single("image"),
  (request: Request, response: Response) => {
    response.send("image uploaded successfully");
  }
);

//new code
// router.post(
//   "/uploadImage",
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       let sampleFile: UploadedFile;
//       let uploadPath: string;
//       if (!request.files || Object.keys(request.files).length === 0) {
//         throw new Error();
//       }
//       sampleFile = request.files.sampleFile as UploadedFile;
//       uploadPath = "../vacations_img/" + sampleFile.name;
//       sampleFile.mv(uploadPath, function (err: any) {
//         if (err) {
//           throw new Error();
//         }
//         console.log("File saved at:", uploadPath); // Log the file path
//         response.status(201).json({ message: "File uploaded!" });
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// deleting a vacation by vacation_code by admin
router.delete(
  "/deleteVacation/:vacation_code",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationCode = +request.params.vacation_code;
    Logic.deleteVacation(vacationCode);
    response.status(204).json();
  }
);
//getting a vacation by vacation code
router.get(
  "/list/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    const vacation = await Logic.getVacationByVacationCode(id);
    response.status(200).json(vacation);
  }
);

// updating a an existing vacation by vacation_code by admin
router.put(
  "/updateVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const updatedVacation = request.body;
    await Logic.updateVacation(updatedVacation);
    response.status(202).json();
  }
);

//get all the vacations
router.get(
  "/vacationList",
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await Logic.getAllVacations();
    response.status(200).json(result);
  }
);

///////users////////////

//adding a new user via register
router.post(
  "/addUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;
    const result = await Logic.addUser(newUser);
    response.status(201).json(result);
  }
);

router.post(
  "/getUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.body;
    const result = await Logic.getUser(user);
    response.status(200).json(result);
  }
);
router.post(
  "/getUserByEmail/:email",
  async (request: Request, response: Response, next: NextFunction) => {
    const email = request.params.email;
    const result = await Logic.getUserByEmail(email);
    response.status(200).json(result);
  }
);

//////followers//////

//adding a new follower by clicking the heart
router.post(
  "/addFollower",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = +request.body.user_code;
    const vacationId = +request.body.vacation_code;
    const result = await Logic.toggleLike(userId, vacationId);
    response.status(201).json(result);
  }
);
router.post("/getLikesByUser"),
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = +request.body.user_code;
    const result = await Logic.getLikesByUser(userId);
    response.status(200).json(result);
  };
//get likes per vacation
router.get(
  "/likesPerVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await Logic.getLikesPerVacation();
    response.status(200).json(result);
  }
);

// get all the followers by vacation id
router.get(
  "/vacationFollowers",
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await Logic.getLikesPerVacation();
    response.status(200).json(result);
  }
);

// // deleting a follower by clicking again on the heart
// router.delete(
//   "/deleteFollower/:user_code", // check if possible to delete by the user code
//   async (request: Request, response: Response, next: NextFunction) => {
//     const userCode = +request.params.user_code;
//     Logic.toggleLike(userCode);
//     response.status(204).json();
//   }
// );
//check if the main page works
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("Controller working !!!");
  }
);

export default router;
