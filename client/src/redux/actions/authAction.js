import { postDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from './globalTypes';
import valid from '../../utils/valid';

export function login(data) {                                                                                                                                                                                       //thunk action creator
    return async (dispatch) => {                                                                                                                                                                     //thunk function - nhận vào 2 tham số là dispatch và getState: cả 2 là method 
        try{
            dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} }); 
            const res = await postDataAPI('login', data);

            dispatch({ type: GLOBALTYPES.AUTH, payload: {
                token: res.data.access_token,
                user: res.data.user
            } }); 

            localStorage.setItem('firstLogin', true);

            dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} });            
        } catch(err){
            dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} });
        }
    }
}

export function refreshToken() {
    return async (dispatch) => {
        const firstLogin = localStorage.getItem('firstLogin');

        if(firstLogin){
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

            try{
                const res = await postDataAPI('refresh_token');
                dispatch({ type: GLOBALTYPES.AUTH, payload: {
                    token: res.data.access_token,
                    user: res.data.user
                } }); 

                dispatch({type: GLOBALTYPES.ALERT, payload: {}});
            } catch(err){
                dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} });
            }
        }
    }
}

export function register(data) {
    return async (dispatch) => {

        const check = valid(data);
        if(check.errLength > 0){
            return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg});
        }
        try{
            
            dispatch({type: GLOBALTYPES.ALERT, payload: {alert: true}});

            const res = await postDataAPI('register', data);
            dispatch({ type: GLOBALTYPES.AUTH, payload: {
                token: res.data.access_token,
                user: res.data.user
            } }); 

            localStorage.setItem('firstLogin', true);
            dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} });  
        } catch(err){
            dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} });
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try{
            localStorage.removeItem('firstLogin');
            await postDataAPI('logout');
            window.location.href = '/'; // nó tác động lên ứng dụng nên khi chạy sẽ điều hướng người dùng và xóa hết redux store
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} });
        }
    }
}
