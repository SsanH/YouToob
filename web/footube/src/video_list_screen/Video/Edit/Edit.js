function Edit(){
 
    return(
<form class="form">
  <div class="form-group row">
        <label for="input" class="col-md-5 col-form-label"></label>
        <div>
        <input type="input" class="form-control" id="inputArtist" placeholder="Title"/>
        </div>
    </div>
        <label for="inputPassword3" class="col-sm-2 col-form-label"></label>

        <input type="input" class="form-control" id="inputPassword3" placeholder="Artist name"/>
    
        <label for="input" class="col-sm-2 col-form-label"></label>
            <input type="email" class="form-control" id="inputEmail3" placeholder="Video"/>
    <div class="row">
        <button type="submit" class="btn btn-primary">Save Changes</button>

        
        <button type="delete" class="btn btn-secondary">
            <img src="./trash.svg"/> Delete Video</button>
    
    </div>
    
</form>




    );

}
export default Edit;