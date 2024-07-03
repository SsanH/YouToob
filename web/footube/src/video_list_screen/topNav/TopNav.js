import React, { useState } from 'react';

function TopNav(){

  return(
    <div>
    <div class="collapse container" id="navbarToggleExternalContent"> 
    <div class="bg-light p-4"> 
        <button class="btn btn-success" type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasWithBackdrop" 
            aria-controls="offcanvasWithBackdrop"> 
        </button> 
    </div> 
</div> 
<div class="offcanvas offcanvas-start" tabindex="-1" 
    id="offcanvasWithBackdrop" 
    aria-labelledby="offcanvasWithBackdropLabel"> 
    <div class="offcanvas-header"> 
        <h5 class="offcanvas-title" id="navbarToggleExternalContent"> 
        <li class="dropdown">
         <div>Home</div>
          <ul class="dropdown-menu">
            <li><a href="#">Page 1-1</a></li>
            <li><a href="#">Page 1-2</a></li>
            <li><a href="#">Page 1-3</a></li>
          </ul>
        </li>
        </h5> 
        <button type="button" class="btn-close text-reset" 
            data-bs-dismiss="offcanvas" aria-label="Close"> 
        </button> 
    </div> 
</div> 
<div class="container"> 
    <nav class="navbar navbar-light"> 
        <div class="container-fluid"> 
            <button class="navbar-toggler" type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarToggleExternalContent" 
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false" aria-label="Toggle navigation"> 
                <span class="navbar-toggler-icon"></span> 
            </button> 
        </div> 
    </nav> 
</div>     
</div>
  );
}
export default TopNav;