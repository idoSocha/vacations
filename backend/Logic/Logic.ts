import Vacation from "../Models/Vacation";
import User from "../Models/User";
import Follower from "../Models/Follower";

import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";

//////vacations/////////

const addVacation = async (newVacation: Vacation) => {
  const SQLcommand = `
  INSERT INTO project03.vacations 
  (destination,description,start_date,end_date,price,file_img_name) 
  VALUES 
  ('${newVacation.destination}','${newVacation.description}','${newVacation.start_date}','${newVacation.end_date}','${newVacation.price}','${newVacation.file_img_name}');
  `;

  const result: OkPacket = await dal_mysql.execute(SQLcommand);
  return result.insertId;
};

const updateVacation = async (vacation: Vacation) => {
  const SQLcommands = `
    UPDATE
    project03.vacations
    SET destination = '${vacation.destination}', description = '${vacation.description}', price = '${vacation.price}', start_date = '${vacation.start_date}', end_date = '${vacation.end_date}', file_img_name = '${vacation.file_img_name}'
    WHERE
    (vacation_code = '${vacation.vacation_code}');
    `;
  await dal_mysql.execute(SQLcommands);
  return true;
};

const deleteVacation = (vacation_code: number) => {
  const SQLcommand = `DELETE FROM project03.vacations WHERE vacation_code=${vacation_code}`;
  dal_mysql.execute(SQLcommand);
  return true;
};

const getVacationByVacationCode = async (vacation_code: number) => {
  return await dal_mysql.execute(
    `SELECT * FROM project03.vacations WHERE vacation_code =${vacation_code}`
  );
};

const getAllVacations = async () => {
  const SQLcommand = `SELECT * FROM project03.vacations`;
  return await dal_mysql.execute(SQLcommand);
};

//users/////////

const addUser = async (newUser: User) => {
  const SQLcommand = `
    INSERT INTO project03.users 
    (private_name,last_name,email,password) 
    VALUES 
    ('${newUser.private_name}','${newUser.last_name}','${newUser.email}','${newUser.password}');
    `;
  //check if isAdmin is needed as a field
  const result: OkPacket = await dal_mysql.execute(SQLcommand);
  return result.insertId;
};

const getAllUsers = async () => {
  const SQLcommand = `SELECT * FROM project03.users`;
  return await dal_mysql.execute(SQLcommand);
};
const getUserByEmail = async (email: string) => {
  const SQLcommand = `SELECT * FROM project03.users WHERE email ='${email}'`;
  return await dal_mysql.execute(SQLcommand);
};

///////////followers////////

//adding a new follower by clicking the heart button
const addFollower = async (newFollower: Follower) => {
  const SQLcommand = `
    INSERT INTO project03.followers
    (user_code,vacation_code) 
    VALUES 
    ('${newFollower.user_code}','${newFollower.vacation_code}')`;
};

const deleteFollower = (user_code: number) => {
  const SQLcommand = `DELETE FROM project03.followers WHERE id=${user_code}`;
  dal_mysql.execute(SQLcommand);
  return true;
};

const getFollowersByVacationCode = async (vacation_code: number) => {
  return await dal_mysql.execute(
    `SELECT * FROM project03.followers WHERE vacation_code =${vacation_code}`
  );
};

// one time run on the server.ts file//
////tables///
const createVacationTable = () => {
  const SQLcommand = `CREATE TABLE IF NOT EXISTS project03.vacations (
    vacation_code INT NOT NULL AUTO_INCREMENT,
    destination VARCHAR(45) NULL,
    description VARCHAR(255) NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    price INT NULL,
    file_img_name VARCHAR(255) NULL,
    PRIMARY KEY (vacation_code));`;
  const response = dal_mysql.execute(SQLcommand);
};

const createUserTable = () => {
  const SQLcommand = `
    CREATE TABLE IF NOT EXISTS project03.users (
        user_code INT NOT NULL AUTO_INCREMENT,
        private_name VARCHAR(45) NOT NULL,
        last_name VARCHAR(45) NOT NULL,
        email VARCHAR(45) NOT NULL,
        password VARCHAR(45) NOT NULL,
        isAdmin BOOLEAN default false, 
        PRIMARY KEY (user_code));`;
  const response = dal_mysql.execute(SQLcommand);
};

const createFollowerTable = () => {
  const SQLcommand = `CREATE TABLE IF NOT EXISTS project03.followers (
    id INT NOT NULL AUTO_INCREMENT,
    user_code INT NOT NULL,
    vacation_code INT NOT NULL,
    FOREIGN KEY (user_code)
    REFERENCES project03.users (user_code),
    FOREIGN KEY (vacation_code)
    REFERENCES project03.vacations (vacation_code),
    PRIMARY KEY (id))`;
  const response = dal_mysql.execute(SQLcommand);
};

// to complete: to understand followers, to add JOIN to connect the followers table and vacation table
export default {
  addVacation,
  updateVacation,
  deleteVacation,
  getVacationByVacationCode,
  getAllVacations,
  createVacationTable,
  createUserTable,
  createFollowerTable,
  addUser,
  getAllUsers,
  getUserByEmail,
  addFollower,
  deleteFollower,
  getFollowersByVacationCode,
};
