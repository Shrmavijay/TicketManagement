import { tickets } from "../interface/Tickets.interface";
import prisma from "../config/db";
import { Priority, status } from "@prisma/client";


export const createTicket = async (ticket: tickets): Promise<tickets> => {
  try {
    const { user_id, title, description, priority, status, due_date } = ticket;
    console.log("Tikcet: ", ticket)
    const savedTicket = await prisma.tickets.create({
      data: {
        user_id: user_id,
        title: title,
        description: description,
        priority: priority as Priority,
        status: status as status,
        due_date: new Date(due_date)
      },
    });
    return savedTicket;
  } catch (error) {
    console.log(error.message)
    throw new Error("Failed to create ticket");
  }
};


export const getalltickets = async (): Promise<tickets[]> => {
  try {
    const getalltickets = await prisma.tickets.findMany({
      // include:{
      //   user:{
      //     select:{
      //       name:true
      //     }
      //   }
      // }
    });
      // console.log(getalltickets)
    return getalltickets;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};



export const updateticket = async (id: number, ticket: tickets): Promise<tickets> => {
  try {
    const { title, description, priority, status, due_date } = ticket;
    // console.log("due_date: ", due_date, typeof(due_date))
    const date = new Date(due_date)
    const updatedticket = await prisma.tickets.update({
      where: {
        id,
      },
      data: {
        title: title,
        description: description,
        priority: priority as Priority,
        status: status as status,
        due_date: date,
      },
    });
    return updatedticket;
  } catch (error) {
    console.log(error.message)
    throw new Error("Internal Server Error");
  }
};

export const getallUser = async (): Promise<any> => {
  try {
    const getallUser = await prisma.users.findMany({
      select:{
        name:true,
        id: true
      }
    });
    return getallUser;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const deleteTicket = async (id: number): Promise<void> => {
  try {
    await prisma.tickets.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};