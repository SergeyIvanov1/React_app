import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Calendar2Check } from "react-bootstrap-icons";
import "../index.css";

class HaederComponent extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                            <Calendar2Check color='orange' size={36} /></a>  
                            {/* Task tracking */}

                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/#" className="nav-link px-2 link-secondary">Home</a></li>
                            <li><a href="/#" className="nav-link px-2 link-dark">Features</a></li>
                            <li><a href="/add" className="nav-link px-2 link-dark">Add</a></li>
                            <li><a href="/#" className="nav-link px-2 link-dark">FAQs</a></li>
                            <li><a href="/#" className="nav-link px-2 link-dark">About</a></li>
                        </ul>

                        <div className="col-md-3 text-end">
                            <button type="button" className="btn btn-outline-primary me-2">Login</button>
                            <button type="button" className="btn btn-primary">Sign-up</button>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}

export default HaederComponent;