import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginReg from "./LoginReg";

const UnauthApp = (props) => {
	return (
		<BrowserRouter>
			<div>
				<Routes>
					<Route element={<LoginReg />} path="/*" />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default UnauthApp;
