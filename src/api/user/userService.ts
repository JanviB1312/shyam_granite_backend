import { StatusCodes } from "http-status-codes";

import type { User } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async signIn(email:string, password:string): Promise<ServiceResponse<{ token: string } | null>>{
    try{
      const user=await this.userRepository.findByEmailAsync(email);
      if(!user){
        return ServiceResponse.failure("Invalid email!", null, StatusCodes.UNAUTHORIZED);
      }else{
        //const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = password === user.password;
        if (!isPasswordValid) {
          return ServiceResponse.failure("Invalid password!", null, StatusCodes.UNAUTHORIZED);
        }else{
          const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: "24h",
          });
          return ServiceResponse.success("Sign-in successful", { token });
        }
      }
    }catch(e){
      const errorMessage = `Error during sign-in: ${e}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred during sign-in", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

}

export const userService = new UserService();
