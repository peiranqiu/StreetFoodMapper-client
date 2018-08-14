import React from 'react';
import ReactDOM from 'react-dom';
import App from "./containers/App";
import Favicon from 'react-favicon';


ReactDOM.render(
    <div>
        <Favicon
            url="https://raw.githubusercontent.com/peiranqiu/CS5610-summer-2018-project-client-peiranqiu/master/src/resources/background/ico.ico"/>
        <App/></div>,
    document.getElementById('root')
);