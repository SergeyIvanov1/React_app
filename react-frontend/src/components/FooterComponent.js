import React, { Component } from 'react';
import { Github } from "react-bootstrap-icons";
import { Linkedin } from "react-bootstrap-icons";

class FooterComponent extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top ">
                        <div className="col-md-4 d-flex align-items-center">
                            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                                <svg className="bi" width="30" height="24"><use xmlnsXlink="#bootstrap" /></svg>
                            </a>
                            <span className="mb-3 mb-md-0 text-muted">&copy; 2023 Company, Inc</span>
                        </div>

                        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                            
                            <li className="ms-3"><a className="text-muted" href="https://github.com/SergeyIvanov1"><Github /><use xmlnsXlink="#github" /></a></li>
                            <li className="ms-3"><a className="text-muted" href="https://www.linkedin.com/in/%D1%81%D0%B5%D1%80%D0%B3%D0%B5%D0%B9-%D0%B8%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2-75790325b/"><Linkedin /><use xmlnsXlink="#github" /></a></li>                            
                        </ul>
                    </footer>
                </div>
            </div>
        );
    }
}

export default FooterComponent;