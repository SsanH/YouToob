import videos from "../../data/vid.json"
import Video from "../Video/Video";
import "../Video/Video.css";
import "./Vid_list.css"
import { useState } from 'react';

function Vid_list(){
const [videosList, setVideoList] = useState(videos);
return(
    
    <div class ="container">
    <div class="row row-cols-1 row-cols-md-4 g-6 ">{
        videosList.map((video)=>
            <div class="card col-xl-3 col-md-4 col-sm-5">
                   <div class="card h-100">
                <Video {...video}/>
                </div>
           </div>
)
}
</div>
</div>
); 

}
export default Vid_list;