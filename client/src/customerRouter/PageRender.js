import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import NotFound from "../components/NotFound";

function generatePage(pageName){
    function component() {
        return require(`../pages/${pageName}`).default;
    }

    try{
        return React.createElement(component());
    } catch (e){
        return <NotFound/>;
    }
}

function PageRender(){
    const {page, id} = useParams();
    const auth = useSelector(state => state.auth);
    
    let pageName = '';

    if(auth.token){
        if(id){
            pageName = `${page}/[id]`;
        } else {
            pageName = `${page}`;
        }
    }

    return generatePage(pageName);
}

export default PageRender;