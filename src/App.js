import './App.css';
import './scss/app.scss'
import {Route, Routes} from "react-router-dom";
import React from 'react'
import Header from "./components/header/Header";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import {useState} from "react";

export const SearchContext = React.createContext("");

function App() {

    const [searchInput, setSearchInput] = useState("");

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchInput, setSearchInput}}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home searchInput={searchInput}/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    )
}


export default App;
