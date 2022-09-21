import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";

import "./style/style.scss";


ReactDOM
	.createRoot(document.getElementById('root'))
	.render(
		//<React.StrictMode>                           //в React 18+ не переходит по ссылкам router Link to, в строгом режиме
        	<App />
		//</React.StrictMode>,

	);