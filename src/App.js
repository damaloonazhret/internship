import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import {AsyncPage} from "./pages/AsyncPage";
import {PromisePage} from "./pages/PromisePage";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route exact path="/" element={<AsyncPage/>}/>
                <Route path="/about" element={<PromisePage/>}/>
            </Routes>
        </Router>
    )
}

export default App;
