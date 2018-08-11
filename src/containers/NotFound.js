
import React from 'react';
import '../styles/test.css';


export default class NotFound
    extends React.Component {

    render() {
        return (
            <div>
                <div className="background-404"></div>
                <div className="title-404">
                    Whoops! This page doesn’t exist.
                </div>
                <div className="content-404 mt-3">You can head over to our
                    <a href='/home'>homepage</a> or
                    <a href="mailto:streetfoodmapper@gmail.com?Subject=Report">shoot us a message</a>.</div>
            </div>
        );
    }
}