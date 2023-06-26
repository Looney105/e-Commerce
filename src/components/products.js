

import "./products.css"
import {CiShoppingCart} from "react-icons/ci"
import Rating from '@mui/material/Rating';
import { useState , useEffect} from "react";
import {FcSearch} from "react-icons/fc"

import axios from "axios";
import { ProductDetails } from "./productDetails.js";


export const Product = (props) => {
  const [allData,setAllData] = useState([])
  const [data,setData] = useState([])  
  const [chooseBrand,setChooseBrand] = useState([])
  const [choosePrice,setChoosePrice] = useState([0,10000])
  const [chooseRating,setChooseRating] = useState(0)
  const [chooseColor,setChooseColor] = useState([])
  const [chooseDiscount,setChooseDiscount] = useState(false)
  const [submit,setSubmit] = useState(false)
  const [addBasketProduct,setAddBasketProduct] = useState(false)
  const [searchData,setSearchData] = useState("")
  const [search,setSearch] = useState(false)
  const [filterBrands,setFilterBrands] = useState([])
  const [minmax,setMinMax] = useState([])
  const [show,setShow] = useState(false)
  const [showData,setShowData] = useState([])

 

 
  
    useEffect(()=>{
      const getAllData = async () => {
        try{
          const response = await axios.get("http://localhost:3001")
        
          await setData(response.data)
          await setAllData(response.data)
          
        }catch (err) {
          console.log(err);
        }
  
      }
      getAllData()
    },[])
    

    

    useEffect(()=>{
      
      const filterFunc =  () => {

        
        
       
         
         const filteredData = data.filter((e)=>{

          return (
            (chooseBrand!==[]?chooseBrand.includes(e.company):true)&&
            (minmax!==[]?e.price >= choosePrice[0] && e.price <= choosePrice[1]:e.price >= minmax[0] && e.price <= minmax[minmax.length])&&
            (chooseColor!==[]?true:e.options.some(r=>chooseColor.includes(r.color))?true:false)&&
            (chooseRating!==0?e.rating>chooseRating:true)&&
            (chooseDiscount!==false?e.discount>0:true)
            
          )
         })
         setData(filteredData)

         
       
        
      }
    filterFunc()
    },[submit])

    useEffect(()=>{
      if(addBasketProduct!==false){
        console.log(addBasketProduct);
        const addBasket = async () => {
          
          const userID = await window.localStorage.getItem("userID")
          try {
            const response = await axios.post("http://localhost:3001/auth/basket",{addBasketProduct, userID}
            )
            console.log(response)
          }catch (err){
            console.log(err);
          }
  
  
        }
        addBasket()
      }

    },[addBasketProduct])

    useEffect(()=>{
      
      const getSearchData =() => {
        const newData = allData.filter((e)=>{
          return e.keywords.includes(searchData)
        })
        if(newData.length===0){
          return 
        }
      setData(newData)
      }
      getSearchData()
    },[search])

    useEffect(()=>{
      const newArray = data.map((e)=>{
        return e.company
      })
      setFilterBrands([...new Set(newArray)])
     
    },[data])
    
    

    return (
        <div className="generalproductcontainer">
          
          <div>
            <ProductDetails show={show} setShow={setShow} data={showData}/>
          </div>
          

            <div className="productsearch">
            <input type="text" placeholder="Type here..." onChange={(event)=>{setSearchData(event.target.value)}}/><FcSearch style={{fontSize:"40px",position:"absolute",top:"86px",left:"960px",cursor:"pointer"}} onClick={()=>{setSearch(!search)}} />
            </div>

          
           <div className="product">


                <div className="filterbar">
                    <div className="fb1"><h3><span>{data.length} </span>product listed</h3></div>

                    <div className="fb2">
                      <nav className="fbbrand">
                        <ul>     
                                {filterBrands.map((e)=>{
                                  return(
                                    <li>
                                      <input type="checkbox" style={{height:"20px",width:"20px"}} value={e} onClick={(event) => { 
                                        setChooseBrand(prev=>[...prev,event.target.value])
                                      }} />
                                <label for>{e}</label>
                                    </li>
                                  )
                                })}
                          </ul>
                      </nav>
                    </div>

                    <div className="fb3">
                        <nav className="fbprice">
                        <ul>
                          <li>
                            <label>Select a price range</label>
                          </li>
                            <li>
                              <input type="radio" name="pricedef" onChange={()=>{
                                choosePrice===[0,50]?setChoosePrice(0):setChoosePrice([0,50])                                                                                     
                              }}/>
                              <label>0-50</label>
                            </li>
                            <li>
                            <input type="radio" name="pricedef" onChange={()=>{
                                choosePrice===[50,150]?setChoosePrice(0):setChoosePrice([50,150])                                                                                       
                              }}/>
                              <label>50-150</label>
                            </li>
                            <li>
                            <input type="radio" name="pricedef" onChange={()=>{
                                choosePrice===[150,450]?setChoosePrice(0):setChoosePrice([150,450])                                                           
                              }}/>
                              <label>150-450</label>
                            </li>
                            <li>
                            <input type="radio" name="pricedef" onChange={()=>{
                                choosePrice===[450,1000]?setChoosePrice(0):setChoosePrice([450,1000])                                                           
                              }}/>
                              <label>450-1000</label>
                            </li>
                            <li>
                            <input type="radio" name="pricedef" onChange={()=>{
                                choosePrice===[1000,10000]?setChoosePrice(0):setChoosePrice([1000,10000])                                                           
                              }}/>
                              <label>1000-10000</label>
                            </li>
                            <li>
                              <input type="text" placeholder="min" onChange={(event)=>{setMinMax([Number(event.target.value)]); console.log(minmax);}}/>
                              
                            </li>
                            <li>
                              <input type="text" placeholder="max" onChange={(event)=>{setMinMax(prev =>[...prev,Number(event.target.value)]);console.log(minmax);}}/>
                              
                            </li>
                            
                        </ul>


                        </nav>
                   
                    </div>

                    <div className="fb4">
                              <nav className="fbrating">
                                  <ul>
                                    <li>
                                      <input type="radio" name="ratingdef" onChange={()=>{chooseRating===4?setChooseRating(0):setChooseRating(4)}}/>
                                      <label>4 star n more</label>
                                    </li>
                                    <li>
                                      <input type="radio" name="ratingdef" onChange={()=>{chooseRating===3?setChooseRating(0):setChooseRating(3)}}/>
                                      <label>3 star n more</label>
                                    </li>
                                    <li>
                                      <input type="radio" name="ratingdef" onChange={()=>{chooseRating===2?setChooseRating(0):setChooseRating(2)}}/>
                                      <label>2 star n more</label>
                                    </li>
                                    <li>
                                      <input type="radio" name="ratingdef" onChange={()=>{chooseRating===1?setChooseRating(0):setChooseRating(1)}}/>
                                      <label>1 star n more</label>
                                    </li>
                                    
                                  </ul>
                              </nav>
                    </div>

                    <div className="fb5">
                              <nav className="fbcolor">
                                <ul>
                                <li>
                                    <input type="checkbox" onChange={()=>{chooseColor.includes("black")?setChooseColor(chooseColor.filter((e)=>{return e!=="black"})):setChooseColor((c)=>[...c,"black"]); console.log(chooseColor);}}/>
                                    <label style={{backgroundColor:"black"}}></label>
                                  </li>
                                  <li>
                                    <input type="checkbox" onChange={()=>{chooseColor.includes("yellow")?setChooseColor(chooseColor.filter((e)=>{return e!=="yellow"})):setChooseColor((c)=>[...c,"yellow"]); console.log(chooseColor);}}/>
                                    <label style={{backgroundColor:"yellow"}}></label>
                                  </li>
                                  <li>
                                    <input type="checkbox" onChange={()=>{chooseColor.includes("brown")?setChooseColor(chooseColor.filter((e)=>{return e!=="brown"})):setChooseColor((c)=>[...c,"brown"]); console.log(chooseColor);}}/>
                                    <label style={{backgroundColor:"brown"}}></label>
                                  </li>
                                  
                                  <li>
                                    <input type="checkbox" onChange={()=>{chooseColor.includes("pink")?setChooseColor(chooseColor.filter((e)=>{return e!=="pink"})):setChooseColor((c)=>[...c,"pink"]); console.log(chooseColor);}}/>
                                    <label style={{backgroundColor:"pink"}}></label>
                                  </li>
                                  <li>
                                    <input type="checkbox" onChange={()=>{chooseColor.includes("orange")?setChooseColor(chooseColor.filter((e)=>{return e!=="orange"})):setChooseColor((c)=>[...c,"orange"]); console.log(chooseColor);}}/>
                                    <label style={{backgroundColor:"orange"}}></label>
                                  </li>
                                  <li>
                                    <input type="checkbox" onChange={()=>{chooseColor.includes("gray")?setChooseColor(chooseColor.filter((e)=>{return e!=="gray"})):setChooseColor((c)=>[...c,"gray"]); console.log(chooseColor);}}/>
                                    <label style={{backgroundColor:"gray"}}></label>
                                  </li>
                                  <li>
                                    <input type="checkbox" onChange={()=>{chooseColor.includes("white")?setChooseColor(chooseColor.filter((e)=>{return e!=="white"})):setChooseColor((c)=>[...c,"white"]); console.log(chooseColor);}}/>
                                    <label style={{backgroundColor:"white",border:"1px solid gray"}}></label>
                                  </li>
                                  <li>
                                    <input type="checkbox" onChange={()=>{chooseColor.includes("red")?setChooseColor(chooseColor.filter((e)=>{return e!=="red"})):setChooseColor((c)=>[...c,"red"]); console.log(chooseColor);}}/>
                                    <label style={{backgroundColor:"red"}}></label>
                                  </li>
                                  <li>
                                    <input type="checkbox" onChange={()=>{chooseColor.includes("blue")?setChooseColor(chooseColor.filter((e)=>{return e!=="blue"})):setChooseColor((c)=>[...c,"blue"]); console.log(chooseColor);}}/>
                                    <label style={{backgroundColor:"blue"}}></label>
                                  </li>
                                  <li>
                                    <input type="checkbox" onChange={()=>{chooseColor.includes("purple")?setChooseColor(chooseColor.filter((e)=>{return e!=="purple"})):setChooseColor((c)=>[...c,"purple"]); console.log(chooseColor);}}/>
                                    <label style={{backgroundColor:"purple"}}></label>
                                  </li>
                                </ul>
                              </nav>
                    </div>

                    <div className="fb6">
                        <input type="checkbox" onClick={()=>{chooseDiscount?setChooseDiscount(false):setChooseDiscount(true)}}/>
                        <label>Only discounts</label>
                    
                    </div>
                    <div className="fb7">
                              <button type="submit" onClick={()=>{setSubmit(!submit)}}>Submit</button>
                    </div>
                    
                </div>




                    <div className="productcontainer">
                       
                    {data.map((e)=> {

                    
                                return ( 
                                    <div className="productcard" >
                                    <div className="cardimg" onClick={()=>{setShow(true);setShowData(e)}}><img src={e.options[0].src} alt=""/></div>
                                    {e.discount>0?<div className="carddiscount">{e.discount}% Discount</div>:""}
                                    <div className="cardinfo">
                                    
                                        <span className="cardinfotitle"><b style={{fontSize:"20px"}}> {e.company} </b> {e.description}</span>
                                        <span className="cardinfostar">
        
                                            <Rating 
                                            readOnly
                                        size="small"
                                        value={e.rating}
                                        sx={{
                                            "& .MuiRating-iconFilled": {
                                                color: "pink"
                                            }}}
                                            
                                            />
                                        <div style={{display:"flex",position:"absolute",left:"6.2vw",top:"0",fontSize:"16px"}}>{e.rating}</div>
                                        </span>
                                        {e.discount>0?<span className="cardinfopricendis"><b>{e.price}$</b><span style={{fontSize:"15px",color:"gray",marginLeft:"5px",textDecorationLine:"line-through"}}>{Math.floor(e.price+e.price*e.discount/100+1)}$</span></span>:<span className="cardinfoprice"><b>{e.price}$</b></span>}
                                      
                                        <div className="cardinfobuy" ><div class="card-button"><CiShoppingCart onClick={(event)=>{
                                          event.target.style.transform="rotate(360deg)";event.target.style.transition="1s";
                                          setAddBasketProduct(e)
                                      
                                      }} style={{height:"30px",width:"30px"}}/></div></div>
                                        
                                        
                                    </div>
                                </div>
                                )
                       })}
                        
                    </div>
                    
           </div>
        </div>
    )
}