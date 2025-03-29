import React from 'react'
import './card.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




const Card = (props) => {
    return (
        <div className="cardContainer">
            <div className="card" style={{ width: '20rem' }}>
                <img src={props.avatar} alt="" className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{props.firstName} {props.lastName}</h5>
                    <div className="action">
                        <div className="button" onClick={props.onEdit}><FaEdit />
                        </div>
                        <div className="button" onClick={props.onDelete}><MdDelete />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card