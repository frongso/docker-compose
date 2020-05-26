import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Body, JsonController, Post, Res } from 'routing-controllers';
import { User } from '../../entities/user';
import { UserToken } from '../../entities/user-token';
import logger from '../../utils/logger';
import { generateAccessToken, generateRefreshToken } from './jwt.service';
import { UserProfile } from './user-profile';
import { secretKey, refreshScertKey } from '../../config/server';
import { isResponse } from '../../utils/response';
import { getConnection } from 'typeorm';

@JsonController()
export class SecurityContrller {
  @Post('/login')
  async login(@Res() response: Response, @Body() credentials: { username: string; password: string }) {
    const res: User | Response = await User.findOne({
      where: { username: credentials.username },
      // relations: ['roleMapUsers']
    })
      .then((user) => {
        if (!user) {
          logger.info(`Cant find username: ${credentials.username}.`);
          return response.sendStatus(401);
        }

        return user;
      })
      .catch((err) => {
        logger.error(err);
        return response.sendStatus(401);
      });

    if (isResponse(res)) {
      return res;
    } else {
      const user = res as User;

      if (bcrypt.compareSync(credentials.password, user.password)) {
        const payload = await getUserProfile(user);
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken({ username: user.username });

        UserToken.save(new UserToken(user.id, refreshToken));
        return { accessToken, refreshToken };
      } else {
        logger.info('Password is not match.');
        return response.sendStatus(401);
      }
    }
  }

  @Post('/refresh')
  async getNewAccessToken(@Res() response: Response, @Body() body: { refreshToken: string }) {
    const { refreshToken } = body;

    if (!refreshToken) {
      return response.sendStatus(403);
    }

    let decodeToken;
    try {
      decodeToken = jwt.verify(refreshToken, refreshScertKey);
    } catch (err) {
      response.sendStatus(403);
      throw err;
    }

    const userToken = await UserToken.findOne({ where: { refreshToken }, order: { id: 'DESC' } });

    if (!userToken) {
      return response.sendStatus(403);
    }

    const user = await User.findOneOrFail({ where: { username: decodeToken.username }, relations: ['roleMapUsers'] });

    if (user.id !== userToken.userId) {
      return response.sendStatus(403);
    }

    const payload = await getUserProfile(user);
    const accessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken({ username: user.username });

    await UserToken.save(new UserToken(user.id, newRefreshToken));

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(UserToken)
      .where('refreshToken != :refreshToken and userId = :userId', { userId: userToken.userId, refreshToken: newRefreshToken })
      .execute();

    return response.status(200).send({ accessToken, refreshToken: newRefreshToken });
  }
}

export const getUserProfile = async (param: User | string): Promise<UserProfile> => {
  const user: User = param instanceof User ? param : await User.findOne({ where: { username: param }, relations: ['roleMapUsers'] });

  const userProfile = new UserProfile(user.username, user.firstname, user.lastname, user.email);

  if (!user.rolemapusers || user.rolemapusers.length === 0) {
    return userProfile;
  }

  const roles = user.rolemapusers.map((roleMapUser) => roleMapUser.Roleid.rolename);
  userProfile.roles = roles;
  return userProfile;
};
