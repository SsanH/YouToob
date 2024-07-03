import '../Homepage.css'

function SideBar(){

    return (
        <div className="sidebar_Homepage">
        <div className="sidebar__categories_Homepage">
            <div className="sidebar__category_Homepage">
                <i className="material-icons">home</i>
                <span>Home</span>
            </div>
            <div className="sidebar__category_Homepage">
                <i className="material-icons">local_fire_department</i>
                <span>Trending</span>
            </div>
            <div className="sidebar__category_Homepage">
                <i className="material-icons">subscriptions</i>
                <span>Subcriptions</span>
            </div>
        </div>
        <hr />
        <div className="sidebar__categories_Homepage">
            <div className="sidebar__category_Homepage">
                <i className="material-icons">history</i>
                <span>History</span>
            </div>
            <div className="sidebar__category_Homepage">
                <i className="material-icons">play_arrow</i>
                <span>Your Videos</span>
            </div>
            <div className="sidebar__category_Homepage">
                <i className="material-icons">thumb_up</i>
                <span>Liked Videos</span>
            </div>
        </div>
        <hr />
    </div>

    );

}

export default SideBar