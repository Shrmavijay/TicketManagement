import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import globalRequestHandler from "../utils/GlobalRequestHandler";
import * as ticketService from "../services/TicketsService";
import { tickets } from "../interface/Tickets.interface";

export const getalltickets = globalRequestHandler(
    async (req: Request, res: Response): Promise<void> => {
      const alltickets = await ticketService.getalltickets();
      const allusers = await ticketService.getallUser();

      res.status(StatusCodes.OK).json({
        message: "all tickets found successfully",
        data: alltickets,
        userName:allusers
      });
    }
  );
 
  export const createtickets = globalRequestHandler(
    async (req: Request, res: Response): Promise<void> => {
      const newtickets:tickets = req.body;
      const createdticket = await ticketService.createTicket(newtickets);
      res.status(StatusCodes.CREATED).json({
        message: "Create ticket successfully",
        data: createdticket,
      });
    }
)

  

export const updateTicket = globalRequestHandler(
    async (req: Request, res: Response): Promise<void> => {
      const updateData: tickets = req.body;
      const id = parseInt(req.params.id);
      const Ticketupdate = await ticketService.updateticket(id, updateData);
      res.status(StatusCodes.CREATED).json({
        message: "update ticket successfully",
        data: Ticketupdate,
      });
    }
  );


  export const deleteTicket = globalRequestHandler(
    async (req: Request, res: Response): Promise<void> => {
      const ticketId = parseInt(req.params.id);
      await ticketService.deleteTicket(ticketId);
      res.status(StatusCodes.OK).send({
        message: "Delete ticket successful",
      });
    }
  );
  