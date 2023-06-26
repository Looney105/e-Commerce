import "./navbar.css"
import {RiSearch2Line} from "react-icons/ri"
import {RxPerson} from "react-icons/rx"
import {HiOutlineShoppingCart} from "react-icons/hi"
import {Link} from "react-router-dom"
import { useState } from "react"

export const Navbar = () => {
    const [style,setStyle] = useState("inputoff")
    return ( 
        <div>
            <div className="navbar">
                
                <img src="/images/logo.png" alt=""/>
                <div>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/shop">Shop</Link>
                <Link className="link" to="/latest">Latest</Link>
                <Link className="link" to="/contact">Contact</Link>

                </div>
                <div>
                <RiSearch2Line className="icon" onClick={()=>{setStyle(style=="inputon"?"inputoff":"inputon")}}/>
                <Link className="iconlink" to="/profile"><RxPerson className="icon"/></Link>
                <Link className="iconlink" to="/basket"><HiOutlineShoppingCart className="icon"/></Link>
                </div>

                

            </div>
            <div className="containerbtmnav">

            <div className="bottomnavbar">
            <div>Smartphones</div>
            <div>Home Decorations</div>
            <div>Necklaces</div>
            <div>Chairs</div>
            <div>Rings</div>
            <div>Running Shoes</div>
            <div>Computers</div>
            <div>Game Consoles</div>
            <div>Sunglasses</div>
            <div>T-shirts</div>
            <div>Sweatshirts</div>

            </div>
           
            </div>
            

            <div>
            <input className={style}/>
            <RiSearch2Line />
                </div>

        </div>
    )
}