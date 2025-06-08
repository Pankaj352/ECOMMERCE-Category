import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import model from "../models/User.js";
dotenv.config();
const key = process.env.JWT_KEY;
const time = process.env.EXPIRATION_TIME;
const auth = async (req, res, next) => {
     try {
      const token = req.headers["authorization"];

      if (!token) {
        return res
          .status(403)
          .send({ responseCode: 403, responseMessage: "Access denied!!!" });
      } else {
        const result = await model.find(
          { _id: token._id },
         
        );

        if (result) {
          jwt.verify(token, key, (err, result) => {
            if (err) {
              return res
                .status(400)
                .send({ responseCode: 400, responseMessage: "Bad request" });
            } else {
              req.userId = result._id;
              return next();
            }
          });
        } else {
          return res
            .status(403)
            .send({ responseCode: 403, responseMessage: "Unauthorized" });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .send({ responseCode: 500, responseMessage: "Something went wrong" });
  }
  }

export default auth;
