import { Link } from "react-router-dom";

import '../styles/notFound.css';
import imgError from '../images/error-page.png';


function NotFound(){

    return(
        <div className="error-page">
            <div className="container">
                <div className="error-image-wrapper">
                    <img src={imgError} alt=""/>
                </div>
                <h1 className="error-title">404</h1>
                <h2 className="error-subtitlte">Oops, This Page Not Found!</h2>
                <p className="error-description">The link might be corrupted or the page may have been removed</p>
                <Link className="button" to='/'>Go To Home</Link>
            </div>
        </div>
    )
}

export default NotFound;