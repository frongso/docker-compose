import { JsonController, Post, Body, Authorized, Get, Delete, QueryParam, Res } from 'routing-controllers';
import { User } from '../../entities/user';
import logger from '../../utils/logger';
import * as bcrypt from 'bcryptjs';

@JsonController('/user')
export class UserController {
  // save new user
  @Post('/register')
  createUser(@Body() user: User) {
    logger.info(`Create new User: ${user.username}`);
    const hashPassword = bcrypt.hashSync(user.password);
    user.password = hashPassword;
    return User.save(user);
  }

  // get all user
  @Get('/getalluser')
  // @Authorized(['ADMIN'])
  getAll() {
    return User.find();
  }

  // delete user
  @Delete('/delete')
  @Authorized(['ADMIN'])
  delete(@QueryParam('id') id: number, @Res() response: Response) {
    User.delete(id);
    return response.sendStatus(200);
  }

  // get select user

  // update user
}
