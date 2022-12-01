import React, { ReactElement } from 'react';

import { Paper } from '@material-ui/core';

export const Footer = (): ReactElement => {
  return (
    <Paper
      elevation={3}
      style={{ background: 'rgb(65, 72, 79)', height: '70px', width: '100%' }}
    />
  );
};
