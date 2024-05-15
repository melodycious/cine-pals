import React, { useEffect } from "react"
import '../../styles/profile.css';
import cinePals from "../../img/cinePals.jpg";
import ListCard from "../component/listCard/listCard.jsx";

const Profile = () => {


        return (
          
            <> 
            <div className="d-inline m-1 p-2">            
                <button className="btn btn-outline-primary m-2 profileButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Profile</button>
                <button className="btn btn-primary newList" type="button">+ New List</button>
            </div>
            <div className="sideBar m-3">
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
            <div className="container center">
                <h1 class="text-center">My Lists</h1>
                <div className="divisor"></div>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4 m-2 p-1 align-items-center justify-content-md-center">
               <ListCard />
               <ListCard />
               <ListCard />
               <ListCard />
               <ListCard />
            </div>
        </>
        )
    }

export default Profile;