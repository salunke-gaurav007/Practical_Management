import express from "express";
import {
    createAdmin,
    createTeacher,
    createStudent,
    getAllAdmins,
    getAllTeachers,
    getAllStudents,
    getAllUsers,
} from "../controllers/userController.js"; 

import { createPractical,enrollStudent,getAllPracticals } from "../controllers/practicalController.js";
import { createSubject } from "../controllers/subjectController.js";
import { getAllSubjects } from "../controllers/subjectController.js";

import { isAdmin } from "../middleware/Middleware.js";
import { isTeacher } from "../middleware/Middleware.js";

const router = express.Router();

router.post("/admin/create", createAdmin);
router.post("/teacher/create", createTeacher); 
router.post("/student/create", createStudent);
router.post("/practical/create",isTeacher, createPractical);
router.post("/enroll/create", enrollStudent);
router.post("/subject/create",isAdmin, createSubject);


router.get("/admin/get",isAdmin, getAllAdmins);
router.get("/teacher/get",isAdmin, getAllTeachers);
router.get("/student/get",isAdmin,isTeacher, getAllStudents);
router.get("/users/get",isAdmin, getAllUsers);
router.get("/allpracticals/get", getAllPracticals);
router.get("/allsubjects/get", getAllSubjects);


export default router;
