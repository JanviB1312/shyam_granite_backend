import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class UserController {

  public signIn: RequestHandler = async(req: Request, res: Response) =>{
    const {email,password} = req.body;
    const serviceResponse = await userService.signIn(email,password);
    return handleServiceResponse(serviceResponse,res);
  };

}

export const userController = new UserController();
