import './App.css';
import './scss/app.scss'
import {Route, Routes} from "react-router-dom";

import Header from "./components/header/Header";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";

function App() {


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
            </div>
        </div>
    )
}


export default App;
