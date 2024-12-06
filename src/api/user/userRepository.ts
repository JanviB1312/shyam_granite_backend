import type { User } from "@/api/user/userModel";
import {query} from "@/common/models/database"

export class UserRepository {

  async findByEmailAsync(email:string) : Promise<User|null>{
    const sql="SELECT * FROM users WHERE email=$1";
    const result=await query(sql,[email]);
    return result[0];
  }

}
