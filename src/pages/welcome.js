
import "./welcome.css"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "./style.css";
import {Swiper , SwiperSlide} from "swiper/react"
import { Pagination ,EffectFade,Navigation,Autoplay} from "swiper"

export const Welcome = () => {    
    return(
        <div>
            <div className="welcome">
                <div className="slider">
               <Slide/>
               <Recommended/>
               
               
                </div>
            </div>
         
        </div>
    )
}

const Slide = () => {
    return(
        <div style={{display:"block"}}>
            <Swiper
            spaceBetween={100}
           
            
            style={{width:"65%",height:"90vh",position:"absolute",margin:"auto",top:"15vh",left:"1vh",zIndex:"-1",borderRadius:"1vh"}}
           
            autoplay={{
                delay:2500,
                isDisableOnInteract:false
            }}
            pagination={{
                dynamicBullets:true,
                color:"black"
                
            }}
            effect={"fade"}
            modules={[Pagination,EffectFade,Autoplay]}
            className="mySwiper"
            >

                <SwiperSlide><img src="/images/photo1.avif"/></SwiperSlide>
                <SwiperSlide><img src="/images/gamingpc.webp"/></SwiperSlide>
                <SwiperSlide><img src="/images/home.avif"/></SwiperSlide>
                <SwiperSlide><img src="/images/headphone.jpg"/></SwiperSlide>
                

            </Swiper>
        </div>
    )
}

const Recommended = () => {
    return(
        <div>
            <div className="recommended">
            <Swiper style={{height:"50vh",width:"30vw",top:"0vh",left:"0"}}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide ><img src="/images/kulaklik.jpg" style={{objectFit:"contain"}}/></SwiperSlide>
        <SwiperSlide ><img src="/images/kulaklik.jpg" style={{objectFit:"contain"}}/></SwiperSlide>
        <SwiperSlide ><img src="/images/kulaklik.jpg" style={{objectFit:"contain"}}/></SwiperSlide>
        
      </Swiper>
            </div>

            <div className="advertisement"><img src="/images/ad.png"/></div>
        </div>
    )
}



