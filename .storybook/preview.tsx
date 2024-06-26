import type { Preview } from '@storybook/react';
import React from 'react';

import BrowserApiClient from '../src/core/api/client/BrowserApiClient';
import createStore from '../src/core/store';
import Environment from '../src/core/env/Environment';
import Providers from '../src/core/Providers';
import RosaLuxemburgUser from '../integrationTesting/mockData/users/RosaLuxemburgUser';
import { ThemeProvider } from '@mui/material';
import { newTheme } from '../src/theme';

const store = createStore();
const env = new Environment(store, new BrowserApiClient(), {
  MUIX_LICENSE_KEY: null,
  ZETKIN_APP_DOMAIN: 'https://app.zetkin.org',
});

const preview: Preview = {
  decorators: [
    (story) => (
      <Providers
        env={env}
        lang="en"
        messages={{}}
        store={store}
        user={RosaLuxemburgUser}
      >
        <ThemeProvider theme={newTheme}>{story()}</ThemeProvider>
      </Providers>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
