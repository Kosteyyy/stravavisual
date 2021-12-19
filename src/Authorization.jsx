import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Authorization({ authInfo, handleData }) {
    //Сюда приходит переадресация со стравы и здесь мы получаем токены и обозначаем авторизацию

    const [message, setMessage] = useState();
    let location = useLocation(); //для выделения кода авторизации из адреса
    let navigate = useNavigate();

    let params = new URLSearchParams(location.search);
    let clientCode = params.get("code"); // выделили код присланный Стравой из адреса
    const data = {code: clientCode};

    async function fetchAuthInfo() {
        if (!authInfo.isAuth) {
            fetch('/api/gettokenfromcode', {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
            .then(res => res.json())
            .then(res => {
                console.log('fetchAuthInfo: response: ', res);
                if (res.errors) {
                    setMessage('Ошибка авторизации'); 
                    setTimeout(() => {navigate('/notauth')}, 5000);
                    console.log("Ошибка: ", res.message, ' ', res.errors);
                } else { 
                    handleData({isAuth: true, ...res}); //Чтобы избежать ререндеринга Роутера пока статус оставляем unauth, обработаем в App
                    navigate('/activities');
                }
            })
            .catch(err => {console.log(err); navigate('/')});
        } else {
            navigate('/');
        }
    }

    useEffect(() => fetchAuthInfo(), []);
  
    return(
        <div>
            <h1>{message}</h1>
        </div>
    )
}