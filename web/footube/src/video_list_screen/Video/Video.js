import Edit from "./Edit/Edit";
import "./Video.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";


function Video({id,img, title, artist, publication_date ,views, category, video_src}){

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

return(
    <div class="card" styles="width: 18rem">
        <Link to = "html.?id{id}">
  <img src={img} className="card-img-top" alt="Responsive image"/>
  
  <div class="card-body">
  <p class="card-text"> {title}</p>
 
    <div class="card-footer" styles="background-color:trasparent">
      <div class="row">
        <div class ="col-10">
    <div class="artist"> {artist}</div>
      <text class="text-body-secondary">{views} | {publication_date}</text>
      </div>
    
      </div>
    
  </div>
         
</div>
</Link>
<div class ="col-2">
       <button onClick={toggleForm}>
       <img src="pencil-fill.svg"/>
       </button>
      </div>
{showForm && (< Edit />)
}
</div>
);
}

export default  Video;