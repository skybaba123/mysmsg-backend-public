import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { createUser } from "@/models/user";
import Company from "@/models/company";
import sendEmail from "@/constants/sendEmail";
import { render } from "@react-email/render";
import WelcomeEmail from "@/email/WelcomeEmail";

const registerController = async (req: any, res: any) => {
  try {
    const companies = await Company.find({});
    const company = companies[0];
    if (!company) return res.status(404).send({ error: "No company info" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const userExistByEmail = await User.findOne({ email: req.body.email });
    if (userExistByEmail)
      return res
        .status(400)
        .send({
          error: "A User already exists with this email. Login instead",
        });

    const userExistByUsername = await User.findOne({
      username: req.body.username,
    });
    if (userExistByUsername)
      return res.status(400).send({
        error: "A User already exists with this username. Choose another",
      });

    const allUsers = await User.find({});

    const newUser = {
      username: req.body.username,
      email: req.body.email,
      hashedPassword,
      role: allUsers.length <= 0 ? "admin" : "user",
      manager: allUsers.length <= 0 ? "yes" : "no",
    };
    const savedUser = await createUser(newUser);

    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRETE, {
      expiresIn: "1d",
    });
    savedUser.sessionToken = token;
    await savedUser.save();

    if (company.welcomeEmail.status === "on") {
      const htmlEmail = render(
        WelcomeEmail({ userFirstname: savedUser.username, company })
      );

      await sendEmail(
        savedUser.email,
        "Welcome",
        company.welcomeEmail.emailMessage,
        htmlEmail,
        company
      );
    }

    res.status(200).send(savedUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default registerController;
