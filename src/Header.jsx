import React, { useContext } from "react";
import { ColorContext } from "./Context.js";
import { Link } from 'react-router-dom';

function setActiveClass() {
    document.querySelector(".header_burger").classList.toggle("active");
    document.querySelector(".header_menu").classList.toggle("active");
    document.querySelector("body").classList.toggle("lock");

}

export default function Header({ authInfo, signOut, signIn}) {
    const {appColors} = useContext(ColorContext);

    return (
        <header className="header" style={{backgroundColor: appColors.mainColor}}>
            <div className="container">
                <div className="header_body">
                    <HeaderAuthInfo authInfo={authInfo} signOut={signOut} signIn={signIn} /> 
                    <div className="header_burger" onClick={setActiveClass}>
                        <span></span>
                    </div>
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


function HeaderAuthInfo({ authInfo, signOut, signIn }) {
    return(
        <div className="header_userinfo">
            {authInfo.isAuth ? 
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
        <nav className="header_menu">   
            <Link onClick={setActiveClass} to="/">Главная</Link>{" "}
            <Link onClick={setActiveClass} to="activities">Тренировки</Link> 
            <Link onClick={setActiveClass} to="settings">Настройки</Link>{" "}
            <Link onClick={setActiveClass} to="reset">Reset</Link>{" "}
        </nav>
    )
}
