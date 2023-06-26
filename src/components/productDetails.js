import { useState } from "react";
import "./productDetails.css"
import Rating from '@mui/material/Rating';
import {CgCloseO} from "react-icons/cg"
export const ProductDetails = (props) => {
    const [img,setImg] = useState(0)
    
    return (
        props.show?<div className="productdetails" >
            <div onClick={()=>{props.setShow(!props.show)}}><CgCloseO className="close"/></div>
            <div className="image"><img src={props.data.options[img].src} alt=""/></div>
            <div className="options">
                <span className="colortitle">Choose the color</span>

            {props.data.options.map((e)=>{
                return (
                    <div className="color" onClick={(event)=>{setImg(props.data.options.indexOf(e));event.target.style.border="3px solid black";event.target.style.transition="0.5s"}}>{e.color} <span style={{backgroundColor:e.color,opacity:"0.7"}}></span></div>
                    
                )
            })}
            </div>
            <div className="title"><span style={{fontSize:"30px",marginRight:"10px"}}><b>{props.data.company}</b> </span>{props.data.description}</div>
            <div className="details">
                <div><b>Details</b></div>
                {props.data.details}
            </div>
            <div className="price">{props.data.price} $</div>
            <div className="rating">
            <Rating 
                                            readOnly
                                        size="large"
                                        value={props.data.rating}
                                        sx={{
                                            "& .MuiRating-iconFilled": {
                                                color: "pink"
                                            }}}
                                            
                                            />
                <span>| {props.data.rating}</span>
            </div>

        </div>:""
    )
}