const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path')
const cloudinary = require("../configs/cloudinary")
const fs = require('fs/promises')
exports.register = async (req, res, next) => {
  try {

    const { email, firstname, lastname, password, shopname, confirmPassword, profileImage } = req.body;
    const haveFile = !!req.file
    let uploadResult = {}
    if (haveFile) {
      console.log(req.file.path)
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,
        public_id: path.parse(req.file.path).name
      })
      fs.unlink(req.file.path)
    }



    const checkEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log("checkEmail", checkEmail);
    if (checkEmail) {
      // console.log("zsserhserhserse");
      return createError(400, "Email is already exits!!!");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);


    const profile = await prisma.user.create({
      data: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
        shopname: shopname,
        profileImage: uploadResult.secure_url || ''
      },
    });
    // Step 6 Response
    res.json({ message: "Register Success", profile });
  } catch (error) {
    console.log("Step 2 Catch");
    next(error);
  }
};

exports.login = async (req, res, next) => {
  //code
  try {
    // Step 1 req.body
    const { email, password } = req.body;
    // Step 2 Check email and password
    const profile = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!profile) {
      return createError(400, "Email, Password is invalid!!");
    }
    const isMatch = bcrypt.compareSync(password, profile.password);

    if (!isMatch) {
      return createError(400, "Email, Password is invalid!!");
    }

    // Step 3 Generate token
    const payload = {
      id: profile.id,
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      role: profile.role,
    };
    
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1d",
    });

    // console.log(token);
    // Step 4 Response
    res.json({
      message: "Login Success",
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    res.json({ message: "Hello, current user" });
  } catch (error) {
    next(error);
  }
};
