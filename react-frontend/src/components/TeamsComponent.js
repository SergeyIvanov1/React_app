import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const TeamsComponent = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="album py-5 bg-light">
            <div className="container">

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div className="col">
                        <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top"
                                width="100%" height="225"
                                xmlns="http://www.w3.org/2000/svg" role="img"
                                aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
                                focusable="false">

                                <image width="100%" height="100%" xlinkHref={require('../images/example-team1.jpg')} />

                            </svg>

                            <div className="card-body">
                                <h4><span style={{ color: 'gray' }}>The company name.</span></h4>
                                <h5><span style={{ color: 'coral' }}>The name of your team.</span></h5>
                                <p className="card-text">This is a team example 1</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Request for admission</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Enter</button>
                                    </div>
                                    <small className="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top"
                                width="100%" height="225"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img" aria-label="Placeholder: Thumbnail"
                                preserveAspectRatio="xMidYMid slice" focusable="false">
                                <image width="100%" height="100%" xlinkHref={require('../images/example-team5.jpg')} />
                            </svg>

                            <div className="card-body">
                                <h4><span style={{ color: 'gray' }}>The company name.</span></h4>
                                <h5><span style={{ color: 'coral' }}>The name of your team.</span></h5>
                                <p className="card-text">This is a team example 2</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Request for admission</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Enter</button>
                                    </div>
                                    <small className="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top"
                                width="100%" height="225"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img" aria-label="Placeholder: Thumbnail"
                                preserveAspectRatio="xMidYMid slice" focusable="false">
                                <image width="100%" height="100%" xlinkHref={require('../images/example-team2.jpg')} />
                            </svg>

                            <div className="card-body">
                                <h4><span style={{ color: 'gray' }}>The company name.</span></h4>
                                <h5><span style={{ color: 'coral' }}>The name of your team.</span></h5>
                                <p className="card-text">This is a team example 3</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Request for admission</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Enter</button>
                                    </div>
                                    <small className="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamsComponent;
