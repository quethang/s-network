import React from 'react';
import { useSelector, useDispatch} from 'react-redux';

import Loading from './Loading';
import Toast from './Toast';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';


function Nofify(){

    const alert = useSelector((state) => state.alert);

    const dispatch = useDispatch();

    function close(){
        dispatch({type: GLOBALTYPES.ALERT, payload: {}});
    }
    return (
        <div>
            { alert.loading && <Loading /> }

            { alert.error && <Toast msg={{title: 'Error', body: alert.error}} handleShow={close} bgColor="bgColor-toast-error"/> }
            
            { alert.success && <Toast msg={{title: 'Success', body: alert.success}} handleShow={close} bgColor="bgColor-toast-success"/> }
        </div>
    )
}

export default Nofify;