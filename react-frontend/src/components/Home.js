import React, { useState, useEffect } from "react";
import "../carusel.css"
import UserService from "../services/user.service";

const Home = () => {
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
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      {/* <main> */}
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true"
            aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">

            <img src={require('../images/4.jpg')} class="d-block w-100" alt="..."></img>
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Todo application</h1>
                <p>This is study project.</p>
                <p><a className="btn btn-lg btn-primary" href="/">Sign up today</a></p>
              </div>
            </div>
          </div>
          <div className="carousel-item">

            <img src={require('../images/5.jpg')} class="d-block w-100" alt="..."></img>
            <div className="container">
              <div className="carousel-caption">
                <h1>Another example headline.</h1>
                <p>Some representative placeholder content for the second slide of the carousel.</p>
                <p><a className="btn btn-lg btn-primary" href="/#">Learn more</a></p>
              </div>
            </div>
          </div>
          <div className="carousel-item">

            <img src={require('../images/3.jpg')} class="d-block w-100" alt="..."></img>
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>The project was created to practice working with cool technologies.</h1>
                <p>Yes, we are also reaching to better.</p>
                <p><a className="btn btn-lg btn-primary" href="/#">Browse gallery</a></p>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>




      <div className="container marketing">


        <div className="row">
          <div className="col-lg-4">
            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg"
              role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
            </svg>

            <h2 className="fw-normal">React</h2>
            <p>Some representative placeholder content for the three columns of text below the carousel. This is the first
              column.</p>
            <p><a className="btn btn-secondary" href="/#">View details &raquo;</a></p>
          </div>
          <div className="col-lg-4">
            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg"
              role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <image x="0" y="0" width="100%" height="100%" xlinkHref={require('../images/docker.png')} />
              {/* <rect width="100%" height="100%" fill="#777" /> */}
              {/* <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text> */}
            </svg>

            {/* <img src={require('../images/docker.png')} className="d-block w-100 "  alt="..."></img> */}
            <h2 className="fw-normal">Spring-boot</h2>
            <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.
            </p>
            <p><a className="btn btn-secondary" href="/#">View details &raquo;</a></p>
          </div>
          <div className="col-lg-4">
            {/* <img src={require('../images/defaultAvatar.png')} className="img-fluid avatar" alt="" /> */}
            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg"
              role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
            </svg>

            <h2 className="fw-normal">Docker</h2>
            <p>And lastly this, the third column of representative placeholder content.</p>
            <p><a className="btn btn-secondary" href="/#">View details &raquo;</a></p>
          </div>
        </div>




        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1"><span className="text-muted">Autorization and authentication are implemented with reliable Spring security.
            </span></h2>
            <p className="lead">To register, you will need to confirm your email address.</p>
          </div>
          <div className="col-md-5">
            <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
              height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
               
              <image width="100%" height="100%" xlinkHref={require('../images/confirm.jpg')} />
            </svg>
            
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">This application will allow your team to feel in control of the workflow.  
            <span  style={{color: 'coral'}}> Focus on your tasks.</span></h2>
            <p className="lead">Add tasks to application, allocate between yourself and control them with application. </p>
          </div>
          <div className="col-md-5 order-md-1">
            <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
              height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <image width="100%" height="100%" xlinkHref={require('../images/control.jpg')} />
            </svg>

          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">And lastly, this one. <span className="text-muted">Checkmate.</span>
            </h2>
            <p className="lead">And yes, this is the last block of representative placeholder content. Again, not really
              intended to be actually read, simply here to give you a better view of what this would look like with some
              actual content. Your content.</p>
          </div>
          <div className="col-md-5">
            <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
              height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
            </svg>

          </div>
        </div>

        <hr className="featurette-divider" />



      </div>
      {/* </main> */}
    </div>
  );
};

export default Home;
