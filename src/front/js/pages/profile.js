import React, { useEffect } from "react"
import '../../styles/profile.css';
import cinePals from "../../img/cinePals.jpg";

const Profile = () => {


        return (
          
            <> 
            <div className="sideBar m-3">
                <button className="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Profile</button>  

                <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                    <div className="offcanvas-header">
                        <h2 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Your profile</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body m-3">
                        <img className="img-fluid rounded-circle" src={cinePals} alt="User Profile" />
                        <h3 className="m-2">User Name</h3>
                        <h4 className="m-2">Email</h4>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary" type="button">Edit profile</button>
                            <button className="deleteButton btn btn-primary" type="button">Delete profile</button>
                        </div>
                    </div>
                </div>
            </div>
          
            <h1 class="text-center">My Lists</h1>

            <div className="row row-cols-1 row-cols-md-3 g-4 m-5 p-3">
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
                </div>
                
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a short card.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
                </div>
                
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }

export default Profile;