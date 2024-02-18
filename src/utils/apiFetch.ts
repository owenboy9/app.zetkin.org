import { IncomingHttpHeaders } from 'node:http';

export type ApiFetch = (path: string, init?: RequestInit) => Promise<Response>;

export const createApiFetch = (
  headers: IncomingHttpHeaders,
  prefix = 'api'
): ApiFetch => {
  return (path, init) => {
    const protocol = process.env.ZETKIN_APP_PROTOCOL;
    const apiUrl = `${protocol}://${process.env.ZETKIN_APP_HOST}/${prefix}${path}`;
    return fetch(apiUrl, {
      ...init,
      headers: {
        cookie: headers.cookie || '',
        ...init?.headers,
      },
    });
  };
};
