import React, { ReactElement } from 'react';

import { Container, Grid, Paper } from '@material-ui/core';
import { Outlet } from 'react-router-dom';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import style from 'components/Header/header.module.css';
import { NavBar } from 'components/Header/NavBar';

export const Layout = (): ReactElement => {
  return (
    <Container>
      <Header />
      <div className="containerBorder">
        <Grid container spacing={2} className="container">
          <Grid item sm={4} md={3} className="navBarApp">
            <Paper className={style.navBar}>
              <NavBar />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <div className="appWrapper">
              <Outlet />
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </Container>
  );
};
