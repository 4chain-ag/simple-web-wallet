import {BrowserRouter, Routes, Route, Navigate, NavLink} from "react-router";
import Home from "./routes/Home";
import CreateUser from "./routes/CreateUser.jsx";
import Wallet from "./routes/Wallet.jsx";

import logo from '/logo.svg'


export default function App() {

    return (
        <BrowserRouter>
            <div id="main">
                <nav>
                    <div className="logo">
                        <NavLink to="/">
                            <img src={logo} alt="logo"/>
                        </NavLink>
                    </div>

                    <ul className="menu">
                        <li>
                            <NavLink to="/create-user">Create User</NavLink>
                        </li>
                        <li>
                            <NavLink to="/wallet">Wallet</NavLink>
                        </li>
                    </ul>

                </nav>

                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/create-user" element={<CreateUser/>}/>
                        <Route path="/wallet" element={<Wallet/>}/>

                        <Route path="*" element={<Navigate to='/' replace/>}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>

    )
}

