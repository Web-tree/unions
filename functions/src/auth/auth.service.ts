import * as functions from 'firebase-functions';
import {User} from './user';
import * as http from 'https';
import * as NodeCache from 'node-cache';

export class AuthService {
  constructor(private cache: NodeCache) {}

  getUser(token: string): Promise<User> {
    functions.logger.debug(token)
    const cachedUser = this.cache.get<User>(token);

    if (cachedUser) {
      functions.logger.debug('Cached user', cachedUser)
      return Promise.resolve(cachedUser);
    }

    const options = {
      hostname: 'auth-api.webtree.org',
      port: 443,
      path: '/rest/checkToken',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return new Promise<User>((resolve, reject) => {
      try {
        const request = http.request(options, res => {
          // functions.logger.log(res)
          res.on('data', data => {
            // functions.logger.log(data)
            const user = JSON.parse(data);
            if (res.statusCode === 200) {
              resolve(user)
            } else {
              reject(this.rejectHttpError(res))
            }
          });
        });
        request.on('error', e => reject(this.rejectHttpError(e)));

        request.write(token);
        request.end();
      } catch (e) {
        reject(this.rejectHttpError(e))
      }
    }).then(user => {
      this.cache.set(token, user);
      functions.logger.debug('Cached user', cachedUser)
      return user;
    });
  }

  private rejectHttpError(e: any) {
    return {error: {statusMessage: e.statusMessage, statusCode: e.statusCode}}
  }
}
