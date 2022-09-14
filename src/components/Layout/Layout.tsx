import {Container, Grid, Paper} from '@material-ui/core';
import {Header} from '../Header/Header';
import style from '../Header/header.module.css';
import NavBar from '../NavBar/NavBar';
import {Outlet} from 'react-router-dom';
import Footer from '../Footer/Footer';
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