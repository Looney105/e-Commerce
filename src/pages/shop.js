

import { Foryou } from "../components/foryou"
import { Product } from "../components/products"
import "./shop.css"

export const Shop = (props) => {  
    return (
        <div>
            <div className="shop">
                <div className="shopad">
                    <img src="/images/trend.webp"/>
                </div>
                <div className="shopinput">
                    <div class="input-wrapper">
                        
                    </div>
                </div>
                <div className="categories">
                <div className="categoryitem"> 
                </div>
                </div>
                <Foryou url="http://localhost:3001/recent" title="Recent added products"/>
                <Foryou url="http://localhost:3001/discount" title="cheapest products"/>
                <Product />                          
            </div>
        </div>
    )
}