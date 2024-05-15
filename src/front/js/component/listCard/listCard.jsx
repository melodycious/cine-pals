import React from "react"


const ListCard = () => {


    return (

                <div className="col ">
                    <div className="card h-100 text-center">
                        <div className="card-body">
                            <h4 className="card-title mt-2">Netflix</h4>
                            <p className="card-text">Movies (30) <br></br> Series (60)</p>
                            <button className="btn btn-primary btn-sm m-1" type="button">Edit</button>
                            <button className="deleteButton btn btn-primary btn-sm" type="button">Delete</button>
                        </div>
                    </div>
                </div>

        )
    }

export default ListCard;