import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import PrivateRouter from "./customerRouter/PrivateRouter";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ScrollToTop from './components/scrollToTop';

import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";

import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from './redux/actions/suggestionsAction';
import { getNotifies } from './redux/actions/notifyAction';

import io from 'socket.io-client';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import SocketClient from './SocketClient';
import Verify from "./pages/verify";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";


function App() {
	const auth = useSelector((state) => state.auth);
	const status = useSelector((state) => state.status);
	const dispatch = useDispatch();
	const isVerifyPage = window.location.pathname === "/verify";

	useEffect(() => {
		if (!isVerifyPage) {
			dispatch(refreshToken());
		  }

		const socket = io();
		dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
		return () => socket.close();
	}, [dispatch, isVerifyPage]);

	useEffect(() => {
		if (auth.token) {
			dispatch(getPosts(auth.token));
			dispatch(getSuggestions(auth.token));
			dispatch(getNotifies(auth.token));
		}
	}, [dispatch, auth.token]);

	return (
		<BrowserRouter>
			<Alert />
			{auth.token && <Header />}
			{status && <StatusModal />}
			{auth.token && <SocketClient />}
			<ScrollToTop />
			<Routes>
				<Route exact path="/" Component={auth.token ? Home : Login} />
				<Route exact path="/verify" Component={Verify}/>
				<Route exact path="/forgot-password" Component={ForgotPassword}/>
				<Route exact path="/reset/:token" Component={ResetPassword}/>

				<Route exact path="/register" Component={Register} />

				<Route exact path="/:page" Component={PrivateRouter} />
				<Route exact path="/:page/:id" Component={PrivateRouter} />
				{/* <PrivateRouter exact path="/:page" Component={PageRender} />
                <PrivateRouter exact path="/:page/:id" Component={PageRender} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;


