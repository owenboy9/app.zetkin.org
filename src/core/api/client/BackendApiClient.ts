import { IncomingMessage, ServerResponse } from 'http';

import FetchApiClient from './FetchApiClient';
import { getIronSession } from 'iron-session';
import requiredEnvVar from 'utils/requiredEnvVar';
import { ApiFetch, createApiFetch } from 'utils/apiFetch';

export default class BackendApiClient extends FetchApiClient {
  constructor(req: IncomingMessage, res: ServerResponse) {
    const innerFetch = createApiFetch(req.headers, '');
    const outerFetch: ApiFetch = async (path, init) => {
      const session = await getIronSession(req, res, {
        cookieName: 'zsid',
        password: requiredEnvVar('SESSION_PASSWORD'),
      });

      const output = await innerFetch(path, init);

      await session.save();

      return output;
    };

    super(outerFetch);
  }
}
