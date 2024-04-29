import { Request, Response } from "express";
import * as userService from "../services/UserService";
import { User } from "../interface/User.interface";
import { StatusCodes } from "http-status-codes";
import globalRequestHandler from "../utils/GlobalRequestHandler";

export const createUser = globalRequestHandler(
  async (req: Request, res: Response): Promise<void> => {
    const newUser: User = req.body;
    // console.log(newUser)
    const createdUser = await userService.registerUser(newUser);
    // console.log(createdUser);
    if (createdUser&& Object.keys(createdUser).length !== 0) {
      res.status(StatusCodes.CREATED).json({
        message: "Create user successfully",
        data: createdUser,
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User Already Exists",
        error: "Invalid user data",
      });
    }
  }
);

export const userloginController = globalRequestHandler(
  async (req: Request, res: Response): Promise<any> => {
    const userdata: User = req.body;
    const save = await userService.loginUser(userdata);
    if (save) {
      res.status(StatusCodes.OK).json({
        message: " User login successfully",
        data: save,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Invalid credentials",
      });
    }
  }
);


export const getUserController = globalRequestHandler(async(req:Request,res:Response):Promise<void>=>{
  const getUserid = parseInt(req.params.id)
  const get = await userService.getUserService(getUserid)
  if (get) {
    res.status(StatusCodes.OK).json({
      message: " User get successfully",
      data: get,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "User Not Found !",
    });
  }})



  export const userLogout = globalRequestHandler(async(req:Request,res:Response):Promise<void>=>{
    const getUserid = parseInt(req.params.id)
    const get = await userService.getuserLogout(getUserid)
    if (get) {
      res.status(StatusCodes.OK).json({
        message: " Delete successfully",
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "User Not Found !",
      });
    }})