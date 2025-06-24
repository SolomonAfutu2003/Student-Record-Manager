// for the routes of the server
import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
  getStudentById
} from "../controllers/students.controllers.js";

const studentsRoute = Router();

studentsRoute.get("/", getAllStudents);
studentsRoute.get("/:id", getStudentById);
studentsRoute.post("/", createStudent);
studentsRoute.put("/:id", updateStudent);
studentsRoute.delete("/:id", deleteStudent);

export default studentsRoute;
