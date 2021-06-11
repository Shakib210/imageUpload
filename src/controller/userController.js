import asyncHandler from "../utills/async.js";
import bcrypt from "bcryptjs";
import {
  registerService,
  findAllUsersService,
  userByEmailService,
  loadUserService,
} from "../services/authServices.js";
import { BadRequest, NotFound } from "../utills/error.js";
import sendTokenResponse from "../utills/sendTokenResponse.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import ImageModel from "../models/imageModel.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const userController = asyncHandler(async (req, res) => {
  console.log(req.author);
  const data = await findAllUsersService();
  res
    .status(200)
    .json({ success: true, data, msg: "User fetched successfully" });
});

const signupController = asyncHandler(async (req, res) => {
  const user = req.body;
  const userExists = await userByEmailService(user.email);
  if (userExists) {
    throw new Error("User already exists");
  }
  user.password = await bcrypt.hash(user.password, 11);
  const registeredUser = await registerService(user);
  res
    .status(200)
    .json({ success: true, registeredUser, msg: "User register success" });
});

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userByEmailService(email);
  if (!user) {
    throw new Error("Email does not exist!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequest("Invalid credentials");
  }
  sendTokenResponse(user, 200, res);
});

const userLoader = asyncHandler(async (req, res) => {
  const userId = req.author.id;
  const response = await loadUserService(userId);
  res.json(response);
});

const uploadController = asyncHandler(async (req, res) => {
  const file = req.files.myFile;
  
  const filePath = `${__dirname}/../../resource/${file.name}`;
  await file.mv(filePath, (err) => {
    if (err) {
      console.log(err);
    }
    const newImage = fs.readFileSync(filePath);
  const encodedImage = newImage.toString("base64");

  const image = {
    contentType: req.files.myFile.mimetype,
    size: req.files.myFile.size,
    img: Buffer(encodedImage, "base64"),
  };

  const response =  ImageModel.create({ image, 'name':'shakib' });
  res.json(response);
  });

  
});

export {
  userController,
  signupController,
  loginController,
  userLoader,
  uploadController,
};
