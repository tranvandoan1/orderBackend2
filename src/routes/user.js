import express from "express";
const router = express.Router();

import {
  userById,
  list,
  remove,
  read,
  updateLogin,
  listUser,
  updateInfo,
} from "../controllers/user";
import { isAuthenticateUser } from "../middlewares/CheckAuth";


router.get("/users",  listUser);
router.get("/user/:userId",  read);
router.post("/user-upload",  updateInfo);
router.post("/user-upload-login",  updateLogin);
router.get("/user",  list);
router.delete("/user/:userId",  remove);

router.param("userId",  userById);

module.exports = router;
