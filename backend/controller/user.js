import USER from "../model/userModel.js";
import yup from "yup";
import jwt from "jsonwebtoken";

const createUserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().max(32).required(),
  password: yup.string().required(),
});

export const userCreate = async (req, res) => {
  try {
    // Validate the request body against the schema
    await createUserSchema.validate(req.body, { abortEarly: false });

    const { name, email, password } = req.body;
    const checkUser = await USER.findOne({ email: email });

    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const data = await USER.create({ ...req.body });

    return res.status(201).json({ message: "Created", body: data });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = error.inner.map((err) => err.message);
      console.log(validationErrors);
      return res.status(400).json({ errors: validationErrors });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const loginSchema = yup.object({
      email: yup.string().min(8).max(32).required(),
      password: yup.string().required(),
    });
    // Validate the request body against the schema
    await loginSchema.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;
    let checkUser = await USER.findOne({ email: email });

    if (checkUser) {
      const dbPassword = checkUser.password;

      const currentTime = Math.floor(Date.now() / 1000);
      const token = await jwt.sign({ checkUser }, "secret", {
        expiresIn: "30d",
      });

      await USER.findByIdAndUpdate(checkUser._id, {
        loginTime: currentTime,
      });

      if (dbPassword === password) {
        return res.status(200).json({
          success: true,
          message: "Login success",
          body: {
            ...checkUser.toObject(), // Convert Mongoose document to plain JavaScript object
            token: token,
          },
        });
      } else {
        return res.status(404).json({ message: "password does not match" });
      }
    } else {
      return res.status(400).json({ message: "user not exsist" });
    }
  } catch (error) {
    console.log(error.message, "===== err rr rr r  r");
    return res.status(400).json({ message: error.message });
  }
};

export const userLogout = async (req, res) => {
  try {
    const id = req.user._id;
    console.log(id, "=-================= isisisisiis");
    const checkUser = await USER.findByIdAndUpdate(id, { loginTime: 0 });
  } catch (error) {
    console.log(error.message, "===== err rr rr r  r");
    return res.status(400).json({ message: error.message });
  }
};

export const getalluser = async (req, res) => {
  try {
    const pageSize = req.query.pageSize || 10;
    const page = req.query.page || 1;
    const searchQuery = req.query.search || "";

    let users;
    let totalUsers;

    if (searchQuery) {
      users = await USER.find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { email: { $regex: searchQuery, $options: "i" } },
        ],
      });
      totalUsers = users.length;
      users = users.slice((page - 1) * pageSize, page * pageSize); // Paginate filtered data
    } else {
      users = await USER.find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      totalUsers = await USER.countDocuments();
    }

    const totalPages = Math.ceil(totalUsers / pageSize);

    if (users.length === 0) {
      return res
        .status(200)
        .json({ code: 200, message: "Do not found any user data" });
    }

    return res.status(200).json({
      message: "All user data",
      body: users,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
