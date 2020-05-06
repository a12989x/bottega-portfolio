import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navigation from './components/others/Navigation';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Blog from './components/pages/Blog';
import BlogDetail from './components/pages/BlogDetail';
import PortfolioManager from './components/pages/PortfolioManager';
import Auth from './components/pages/Auth';
import NoMatch from './components/pages/NoMatch';
import Icons from './components/helpers/Icons';
import PortfolioDetail from './components/pages/PortfolioDetail';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedInStatus: 'NOT_LOGGED_IN' };

        Icons();
    }

    checkLoginStatus = () => {
        return axios
            .get('https://api.devcamp.space/logged_in', {
                withCredentials: true,
            })
            .then((response) => {
                const loggedIn = response.data.logged_in;
                const loggedInStatus = this.state.loggedInStatus;

                if (loggedIn && loggedInStatus === 'LOGGED_IN') {
                    return loggedIn;
                } else if (loggedIn && loggedInStatus === 'NOT_LOGGED_IN') {
                    this.setState({ loggedInStatus: 'LOGGED_IN' });
                } else if (!loggedIn && loggedInStatus === 'LOGGED_IN') {
                    this.setState({ loggedInStatus: 'NOT_LOGGED_IN' });
                }
            })
            .catch((error) => {
                console.log('checkLoginStatus', error);
            });
    };

    handleSuccessfulLogin = () => {
        this.setState({ loggedInStatus: 'LOGGED_IN' });
    };

    handleUnSuccessfulLogin = () => {
        this.setState({ loggedInStatus: 'NOT_LOGGED_IN' });
    };

    handleSuccessfulLogout = () => {
        this.setState({ loggedInStatus: 'NOT_LOGGED_IN' });
    };

    authorizePages = (path, name, props) => {
        return <Route path={path} component={name} />;
    };

    componentDidMount() {
        this.checkLoginStatus();
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Navigation
                        loggedInStatus={this.state.loggedInStatus}
                        handleSuccessfulLogout={this.handleSuccessfulLogout}
                    />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/portfolio/:slug"
                            component={PortfolioDetail}
                        />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contact" component={Contact} />
                        <Route
                            exact
                            path="/blog"
                            render={(props) => (
                                <Blog
                                    {...props}
                                    loggedInStatus={this.state.loggedInStatus}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/blog/:slug"
                            render={(props) => (
                                <BlogDetail
                                    {...props}
                                    loggedInStatus={this.state.loggedInStatus}
                                />
                            )}
                        />
                        {this.state.loggedInStatus === 'LOGGED_IN' ? (
                            <Route
                                exact
                                path="/portfolio-manager"
                                render={(props) => (
                                    <PortfolioManager
                                        {...props}
                                        loggedInStatus={
                                            this.state.loggedInStatus
                                        }
                                    />
                                )}
                            />
                        ) : null}
                        <Route
                            path="/auth"
                            render={(props) => (
                                <Auth
                                    {...props}
                                    handleSuccessfulLogin={
                                        this.handleSuccessfulLogin
                                    }
                                    handleUnSuccessfulLogin={
                                        this.handleUnSuccessfulLogin
                                    }
                                />
                            )}
                        />
                        <Route component={NoMatch} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
