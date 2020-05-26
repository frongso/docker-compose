import * as jwt from 'jsonwebtoken';
import { refreshScertKey, refreshTokenLife, secretKey, tokenLife } from '../../config/server';
import { UserProfile } from './user-profile';
import { UserToken } from '../../entities/user-token';

export const generateAccessToken = (payload: UserProfile): string => {
  return jwt.sign({ ...payload }, secretKey, { expiresIn: tokenLife, issuer: 'ktitsak_o' });
};

export const generateRefreshToken = (payload: { username: string }): string => {
  return jwt.sign({ ...payload }, refreshScertKey, {
    expiresIn: refreshTokenLife,
    issuer: 'ktitsak_o',
  });
};

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    if (!token.startsWith('Bearer')) {
      // Reject if there is no Bearer in the token
      return reject('Token is invalid');
    }

    // Remove Bearer from string
    token = token.slice(7, token.length);
    jwt.verify(token, secretKey, (err: Error, decodedToken: UserProfile) => {
      if (err) {
        return reject(err.message);
      }
      // Check the decoded user
      if (!decodedToken) {
        return reject('Token is invalid cant find decodedToken');
      }
      resolve(decodedToken);
    });
  });
};
