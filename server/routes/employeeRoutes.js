import { Router } from "express";
import {
  listEmployees,
  addEmployee,
  editEmployee,
  removeEmployee
} from "../controllers/employeeController.js";

const router = Router();

router.get("/", listEmployees);
router.post("/", addEmployee);
router.patch("/:id", editEmployee);
router.delete("/:id", removeEmployee);

export default router;
