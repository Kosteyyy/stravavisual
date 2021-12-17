import React from 'react';
import { render } from 'react-dom';
import { Link, Routes, Route, BrowserRouter } from 'react-router-dom';

function Report() {
    return(
        <div>
            This is Report
        </div>
    )
}

function About() {
    return(
        <div>
            This is about
        </div>
    )
}

const Page = () => { 
    return(
        <div>
            <h1>This is Page</h1>

        </div>

     )
}



function App() {
    return(
        <div title="Outer div">
            <h1>Hello World! </h1>
            <button onClick={goThere}>Go There</button>

        </div>
    )
}

const Nav = () => {
    return(
        <nav
        style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem"
        }}
    >   
        <Link to="/">Home</Link>|{" "}
        <Link to="about">About</Link> |{" "}
        <Link to="report">Report</Link>
    </nav>
    )
}





function goThere() {
    const firstAuthLink = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=activity:read"
    document.location.href = firstAuthLink;
}

render(
    <BrowserRouter>
        <Page />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="about" element={<About />} />
            <Route path="report" element={<Report />} />
        </Routes>
        <Nav />
    </BrowserRouter>, 
    document.getElementById('root'));