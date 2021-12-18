import React from "react";
import { Link } from 'react-router-dom';

export default function Header({ authData, signOut, signIn }) {
    return (
        <header className="header">
            <div className="container">
                <div className="header_body">
                    <HeaderAuthInfo authData={authData} signOut={signOut} signIn={signIn}/> 
                    <Nav />
                </div>
            </div>
        </header>
    )
}

const Avatar = ({link}) => {
    return (
        <div className="header_avatar">
            <img src={link || null} />
        </div>
    )
}

const UserName = ({firstname, lastname}) => {
    return <span className="header_username">{firstname || ''} {lastname || ''}</span>
}


function HeaderAuthInfo({ authData, signOut, signIn }) {
    let authInfo = authData.stravaAuthInfo;
    let displayUserInfo = (authData.status == "authorized");
    return(
        <div className="header_userinfo">
            {displayUserInfo ? 
                <>
                    <Avatar link={authInfo.athlete.profile} />
                    <UserName firstname={authInfo.athlete.firstname} lastname={authInfo.athlete.lastname} /> 
                    <button onClick={signOut}>Выйти</button>
                </>
                : <button onClick={signIn}>Войти</button>}
        </div>

    )
}

const Nav = () => {
    return(
        <nav>   
        <Link to="/">Home</Link>|{" "}
        <Link to="map">Места</Link> 
        </nav>
    )
}
