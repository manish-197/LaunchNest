const userModel = require("../models/user.model");
require("dotenv").config();
const bycryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const ImageKit = require("imagekit");
const { toFile } = require("imagekit");

const registerUser = async (req, res) => {
  const { name, email, password, profileImage } = req.body;

  const isUserExist = await userModel.findOne({
    email,
  });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  //   const hashPassword = crypto.createHash("md5").update(password).digest("hex");
  const hashPassword = bycryptjs.hashSync(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashPassword,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("JWT_TOKEN", token);

  res.status(201).json({
    message: "User registered successfully........",
    user: {
      username: user.name,
      email: user.email,
      profileImage: user.profileImage,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(409).json({
      message: "user not Found",
    });
  }

  const isPasswordMatch = await bycryptjs.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("JWT_TOKEN", token);

  res.status(200).json({
    message: "User logged in successfully",
    token,
  });
};

const imagekit = new ImageKit({
 publicKey: process.env.IMAGEKIT_PUBLIC_KEY, 
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const updateUser = async (req, res) => {
  try {
    const { name, company, role, bio, location, profileImage } = req.body;
    let updateData = { name, company, role, bio, location, profileImage };

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer, 
        fileName: `profile-${req.user.id}.jpg`, 
        folder: "/profile_pictures",
      });

      updateData.profileImage = uploadResponse.url;
      console.log("Image link: ", uploadResponse.url);
      
    }

    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true },
    );

    res.status(200).json({ message: "Profile updated!", user });

    // let user = await userModel.findById(req.user.id);
    // if (!user) return res.status(404).json({ msg: "User not found" });

    // user.name = name || user.name;
    // user.bio = bio || user.bio;
    // user.location = location || user.location;
    // user.profileImage = profileImage || user.profileImage;
    // user.company = company || user.company;
    // user.role = role || user.role;

    // await user.save();

    // res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { registerUser, loginUser, updateUser, getUserData };
