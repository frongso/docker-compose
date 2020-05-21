import { User } from '../../entities/user';
import { JsonController, Get, Post, Body, Delete, Put, QueryParam, Res } from 'routing-controllers';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';

@JsonController('/user')
export class UserController {
  @Get('/')
  getAll() {
    return User.find();
  }
  @Post('/register')
  register(@Body() user: User) {
    const hashPassword = bcrypt.hashSync(user.password);
    user.password = hashPassword;
    return User.save(user);
  }
  @Delete('/delete')
  delete(@QueryParam('id') id: number, @Res() response: Response) {
    User.delete(id);
    return response.sendStatus(200);
  }
}
