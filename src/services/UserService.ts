import { User } from "../interface/User.interface";
import prisma from "../config/db";
import * as bcrypt from "bcryptjs";
import { users } from "@prisma/client";
import { generateToken } from "../utils/GenerateToken";

export const registerUser = async (user: User): Promise<users | null> => {
  try {
    const { name, email, password } = user;

    const findUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!findUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });
      return newUser;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const loginUser = async (user: User): Promise<any> => {
  try {
    const { email, password } = user;
    const findUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (findUser) {
      const passwordCompare = await bcrypt.compare(password, findUser.password);
      if (passwordCompare) {
        const token = generateToken(findUser.id);
        const Userupdate = await prisma.users.update({
          where: {
            id: findUser.id,
          },
          data: {
            tokens: token,
          },
        });
        return Userupdate;
      }
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};


export const getUserService =async(id:number):Promise<any>=>{
  try {
    const getUsr = await prisma.users.findFirst({
    where:{
      id:id
    },select:{
      name:true,
      email:true,
      tickets:true,
      tokens:true
    }
    })
    return getUsr
  } catch (error) {
    throw new Error("Internal Server Error");

  }
}



export const getuserLogout =async(id:number):Promise<any>=>{
  try {
    const logoutuser = await prisma.users.update({
      where: {
        id:id,
      },
      data: {
        tokens:null,
      },
    });
    return logoutuser
  } catch (error) {
    throw new Error("Internal Server Error");

  }
}


export const updatePasswordService = async (id: number, oldPassword: any, newPassword: any): Promise<any> => {
  
  try {
    const getUserDetails = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });

    if (getUserDetails) {
      const isOldPasswordValid = await bcrypt.compare(oldPassword, getUserDetails.password);
      console.log("valid: ",isOldPasswordValid)
      if (isOldPasswordValid) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await prisma.users.update({
          where: {
            id: id,
          },
          data: {
            password: hashedNewPassword,
          },
        });

        return updatedUser;
      } else {
        throw new Error("Old password is incorrect");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error.message)
    throw new Error("Internal Server Error");
  }
};
