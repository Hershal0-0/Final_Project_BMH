import React from 'react'
import {Link} from 'react-router-dom'
const Problem = ({problem}) => {
    return (
        <div className="d-flex problem">
            <div style={{marginLeft:"0.5rem"}}>
                <div style={{marginBottom:"1rem"}}>
                <p className="prob-title">{problem.problem_title}</p>            
                </div>
                <div>
                <p>By:{problem.faculty_name}</p>
                </div>
            </div>
            <div className="solve-btn-container">
                <button className="solve-btn"><Link to={`/solve/${problem._id}`} >Solve Now</Link></button>
            </div>
        </div>
    )
}

export default Problem
