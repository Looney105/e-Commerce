

import {Swiper , SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "./foryou.css"
import {Navigation, Pagination} from "swiper"
import { useEffect,useState } from "react"

import axios from "axios"

export const Foryou = (props) => {
  const [data,setData] = useState([])
  useEffect(()=>{
      const getData = async () =>{
        try{
          const response = await axios.get(props.url)
        setData(response.data)
        }catch(err){
          console.log(err);
        }
      }
      getData()
  },[])

    return(
        <div className="foryou">
            <div className="title"><p>{props.title}</p></div>

            
                   
                    <Swiper
                    
                    style={{width:"85%",height:"50vh",zIndex:"0",borderRadius:"1vh"}}
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      >
        
        {data.map((e)=>{
          return (
            <SwiperSlide style={{borderRadius:"3vh"}} >
              <div className="cardtitle">Take a look</div>
              <span className="price">{e.price}$</span>
              <img src={e.options[0].src}  alt=""/>
              
              </SwiperSlide>

          )
        })}
        

          
        
      </Swiper>
                    
            
        </div>
    )
}
