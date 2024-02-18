/* eslint-disable no-console */
import { IncomingHttpHeaders } from 'node:http';

export type ApiFetch = (path: string, init?: RequestInit) => Promise<Response>;

export const createApiFetch = (
  headers: IncomingHttpHeaders,
  prefix = 'api'
): ApiFetch => {
  return (path, init) => {
    const protocol = process.env.ZETKIN_APP_PROTOCOL || 'http';
    const apiUrl = `${protocol}://${process.env.ZETKIN_APP_HOST}/${prefix}${path}`;
    console.log('apiUrl', apiUrl);
    return fetch(apiUrl, {
      ...init,
      headers: {
        cookie: headers.cookie || '',
        ...init?.headers,
      },
    });
  };
};
