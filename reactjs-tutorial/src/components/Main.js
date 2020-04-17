import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import FirstApp from './FirstApp'
import { HooksApp } from './Hooks'
import { TVSeries, SingleTVSeries } from './TVSeries'

const Main = (props) => (
        <Switch>
            <Route exact path="/first" component={FirstApp} />
            <Route exact path="/hooks" component={HooksApp} />
            <Route exact path="/tvseries" component={TVSeries} />
            <Route path="/tvseries/:id" component={SingleTVSeries} />
        </Switch>
    )

export default Main