import express from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  signin,
  updatePassword,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:cpf", updateUser);

router.put("/updatePassword/:cpf", updatePassword);

router.delete("/:cpf", deleteUser);
/*router.put("/deleteUser/:cpf", deleteUser);*/
router.delete("/", deleteAllUsers);

router.post("/signin", signin);

export default router;
