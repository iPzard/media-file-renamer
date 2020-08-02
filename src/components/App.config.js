import React from 'react';
import Rename from 'components/rename/Rename';
import Search from 'components/search/Search';
import Select from 'components/select/Select';
import { app } from 'utils/services';

/**
* @description - App configuration settings.
*
* @property component - React component; to display for a given "page".
* @property setScreenSize - Function; if not maximized, sets the screen size of the app.
* @memberof Services
*/

export const config = {
  1: {
    component: <Select />,
    setScreenSize: () => app.resize({ height: 600 })
  },
  2: {
    component: <Search />,
    setScreenSize: () => app.resize({ height: 600 })
  },
  3: {
    component: <Rename />,
    setScreenSize: () => app.resize({ height: 700 })
  }
};