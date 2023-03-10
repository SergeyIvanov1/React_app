import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Default file input example</label>
        <input className="form-control" type="file" id="formFile"/>
      </div>

      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputFirstName" className="form-label">First name</label>
          <input type="text" className="form-control" id="inputFirstName" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputLastName" className="form-label">Last name</label>
          <input type="text" className="form-control" id="inputLastName" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword4" />
        </div>
        {/* <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
          // value={currentTask.title}
          // onChange={handleInputChange} 
          />

        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div> */}
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">City</label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">State</label>
          <select id="inputState" className="form-select">
            <option defaultValue>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">Zip</label>
          <input type="text" className="form-control" id="inputZip" />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
