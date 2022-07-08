import React, {useEffect} from 'react'
import './App.css';
import Header from "./components/header/Header";
import NavBar from "./components/navBar/NavBar";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Users from "./components/users/Users";
import {Container, Grid, Paper,} from "@material-ui/core";
import style from './components/header/header.module.css'
import {connect} from "react-redux";
import {AppStoreType} from "./redux/store";
import {showMenuHandler} from "./redux/headerReduser";
import Footer from "./components/footer/Footer";
import axios from "axios";
import {UserProfileType} from "./redux/profileReduser";
import {
    AuthorizedUserType,
    setAuthorizedCode,
    setAuthorizedProfileUser,
    setAuthorizedUser,
    setIsLoading
} from "./redux/authorizedReduser";
import {api} from "./api/api";


type MapStateToProps = {
    menuIsShow: boolean
    isLoading: boolean
}
type AppType = MapStateToProps & {
    showMenuHandler: () => void
    setIsLoading: (payload: boolean) => void
    setAuthorizedUser: (payload: AuthorizedUserType) => void
    setAuthorizedProfileUser: (payload: UserProfileType) => void
    setAuthorizedCode: (payload: number) => void
}


const App = (props: AppType) => {


    useEffect(() => {
        async function fetchAuthorized() {
            try {
                props.setIsLoading(true)
                let response = await api.authorizedMe()
                if (response.resultCode === 0) {
                    props.setAuthorizedUser(response.data)
                    props.setAuthorizedCode(0)
                } else {
                    props.setAuthorizedCode(1)

                }
                let responseUser = await api.getUserProfile(response.data.id)
                props.setAuthorizedProfileUser(responseUser)
                props.setIsLoading(false)
            } catch (er) {
                console.log(er)

            }

        }

        fetchAuthorized()
    }, [])


    // if (props.isLoading) {
    //     return <Loading/>
    // }

    return (
        <HashRouter>
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
                            <div className='appWraper'>
                                <Routes>
                                    <Route path='/profile/*'
                                           element={<Profile/>}>
                                        {/*<Route path=':id' element={<Profile/>}/>*/}
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
                </div>
                <Footer/>
            </Container>
        </HashRouter>
    );
}

function mapStateToProps(state: AppStoreType): MapStateToProps {
    return {
        menuIsShow: state.headerPage.menuIsShow,
        isLoading: state.authorized.isLoading,
    }
}

export default connect(mapStateToProps, {
    showMenuHandler,
    setIsLoading,
    setAuthorizedUser,
    setAuthorizedProfileUser,
    setAuthorizedCode
})(App);
