import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ListCard = (props) => {
  const movieCount = props.movies ? props.movies.length : 0;
  const seriesCount = props.series ? props.series.length : 0;

  return (
    <Link to={`/users/${props.id}`} >
      <div className="col">
        <div className="card h-100 text-center">
          <div className="card-body">
            <h4 className="card-title mt-2">{props.name}</h4>
            <p className="card-text">
              Movies ({movieCount}) <br></br> Series ({seriesCount})
            </p>
            <button className="btn btn-primary btn-sm m-1" type="button">
              Edit
            </button>
            <button className="deleteButton btn btn-primary btn-sm" type="button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

ListCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  movies: PropTypes.array,
  series: PropTypes.array,
};

export default ListCard;