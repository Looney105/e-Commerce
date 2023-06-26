
import axios from "axios"
import "./basket.css"
import { useEffect, useState } from "react"
import {TfiTrash} from "react-icons/tfi"

export const Basket = () => {
    const [data,setData] = useState([])
    const [price,setPrice] = useState([])
    const [remove,setRemove] = useState(true)
    useEffect(()=>{
        const getDataFunc = async () => {
           try {
            const userID = await window.localStorage.getItem("userID")
            const response = await axios.get(`http://localhost:3001/auth/basket/${userID}`)
            console.log(response.data.basket);
            await setData(response.data.basket)
           
           }catch(err){
            console.log(err);
           }
        }
        getDataFunc()
    },[remove])
    useEffect(()=>{
        setPrice(0)
        data.map((e)=>{
                setPrice(prev=>Math.floor(prev+e.price))
            })
    },[data])

    return (
        <div>
            <div className="basket">
                <div className="basketcnt">
                    <h1>My Basket({data.length})</h1>
                    <div className="productarea">
                            
                                {data.map((e)=>{
                                    return ( 
                                        <div className="product">
                                            <img src={e.options[0].src} alt=""/>
                                            <span className="title">{e.description}</span>
                                            <span className="price">{e.price}$</span>
                                            <TfiTrash className="trash" onClick={async ()=>{
                                                const userID =await  window.localStorage.getItem("userID")
                                                await axios.delete(`http://localhost:3001/auth/basket/${userID}/${e._id}`)
                                                setRemove(!remove)
                                            }}/>
                                           
                                        </div>
                                    )
                                })}
                       
                            
                    </div>
                    <div className="orderinfo">
                        <h2>Basket({data.length})</h2>
                        <span>Choosen Products : {price}</span>
                        <span >Delivery : 10$</span>
                        <span >Subtotal : {price+10}$</span>
                        <button className="btn1">Complate the Order</button>    
                        <button className="btn2">Use Coupon</button>    
                    </div>
                </div>
            </div>
        </div>
    )
}