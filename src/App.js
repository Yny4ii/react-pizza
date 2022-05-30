import './App.css';
import './scss/app.scss'
import {useEffect, useState} from "react";
import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";
import Sort from "./components/sort/Sort";
import PizzaBlock from "./components/pizzaBlock/PizzaBlock";
import Loader from "./components/pizzaBlock/Loader";
import {Routes, Route, Link} from "react-router-dom";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";

function App() {


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
                </div>
            </div>
        </div>
    )
}


export default App;
