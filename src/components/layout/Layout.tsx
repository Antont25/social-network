import {Container, Grid, Paper} from '@material-ui/core';
import {Header} from '../header/Header';
import style from '../header/header.module.css';
import NavBar from '../navBar/NavBar';
import {Outlet} from 'react-router-dom';
import Footer from '../footer/Footer';
import React from 'react';

export const Layout = () => {
    return (
        <Container>
            <Header/>
            <div className={'containerBorder'}>
                <Grid container spacing={2} className={'container'}>
                    <Grid item
                          sm={4} md={3}
                          className={'navBarApp'}
                    >
                        <Paper className={style.navBar}>
                            <NavBar/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <div className="appWrapper">
                            <Outlet/>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </Container>
    )
}