import { User } from './../../entities/user';
import { JsonController, Post, Res, Body } from 'routing-controllers';
import { Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as config from '../../config/server';

@JsonController()
export class SecurityController {
  @Post('/login')
  async login(@Res() response: Response, @Body() credential: { username: string; password: string }) {
    // Check if username and password are set
    const username = credential.username;
    const password = credential.password;
    if (!(username && password)) {
      return response.sendStatus(400);
    }

    // Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      return response.sendStatus(401);
    }

    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      response.sendStatus(401);
      return;
    }

    // Sign JWT, valid for 15 min
    const token = jwt.sign({ userId: user.id, username: user.username }, config.secretKey, { expiresIn: config.tokenLife });

    // Send the jwt in the response
    response.send(token);
  }
}
