import { Navigate} from 'react-router-dom'; //*
import PageRender from './PageRender';

function PrivateRouter(){

    const firstLogin = localStorage.getItem('firstLogin');
    return firstLogin ? <PageRender /> : <Navigate to="/" replace={true} /> //*
}

export default PrivateRouter;