import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import PrivateRouter from "./customerRouter/PrivateRouter";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";

import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from './redux/actions/suggestionsAction';

import io from 'socket.io-client';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import SocketClient from './SocketClient';

function App() {
	const auth = useSelector((state) => state.auth);
	const status = useSelector((state) => state.status);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshToken());

		const socket = io();
        dispatch({type: GLOBALTYPES.SOCKET, payload: socket});
        return () => socket.close();
	}, [dispatch]);

	useEffect(() => {
		if (auth.token) {
			dispatch(getPosts(auth.token));
			dispatch(getSuggestions(auth.token));
		}
	}, [dispatch, auth.token]);

	return (
		<BrowserRouter>
			<Alert />
			{auth.token && <Header />}
			{status && <StatusModal />}
			{auth.token && <SocketClient />}
			<Routes>
				<Route exact path="/" Component={auth.token ? Home : Login} />
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
