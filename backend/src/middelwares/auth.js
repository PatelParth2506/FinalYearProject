import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/userModel.js";

export const auth = asyncHandler(async (req, res, next) => {
    console.log(req.cookies);

    try {
        let token = req.cookies.AccessToken;

        if (!token && req.header("auth")) {
            token = req.header("auth").replace("Bearer ", "").trim();
        }

        if (!token) {
            throw new ApiError(402, "Unauthorized Token");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken);

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(402, "Invalid Token");
        }

        req.user = user;
        next();
    } catch (error) {
        next(new ApiError(404, error.message));
    }
});
