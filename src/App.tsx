import React from 'react'
import './App.css';
import Header from "./components/header/Header";
import {NavBar} from "./components/navBar/NavBar";
import {HashRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Users from "./components/Users/Users";
import {Container, Grid, Paper} from "@material-ui/core";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.text.secondary,
            marginRight: theme.spacing(1),
        },

    }),
);
const App = () => {
    const classes = useStyles();
    return (
        <HashRouter>
            <Container>
                <Header/>
                <Grid container>
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>xs=12</Paper>
                        <NavBar/>
                    </Grid>
                    <Grid item xs={10}>
                        <div className='appWraper'>
                            <Routes>
                                <Route path='/'
                                       element={<Profile/>}>

                                </Route>
                                <Route path='/dialogs/*'
                                       element={<Dialogs/>}>

                                </Route>
                                <Route path='/users/'
                                       element={<Users/>}>

                                </Route>
                            </Routes>
                        </div>
                    </Grid>
                </Grid>

            </Container>
        </HashRouter>
    );
}

export default App;
