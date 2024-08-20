import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import withAuth from './hocs/withAuth/withAuth';
import withoutAuth from './hocs/withoutAuth/withoutAuth';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS from './constants';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import TransactionsPage from './pages/TransactionsPage/TransactionsPage';
import HowItWorksPage from './pages/HowItWorksPage/HowItWorksPage';
import EventsPage from './pages/EventsPage/EventsPage';
import EventsContainer from './components/Events/EventsContainer/EventsContainer';
import OffersReviewPage from './pages/OffersReviewPage/OffersReviewPage';

const { CREATOR, CUSTOMER, MODERATOR } = CONSTANTS;

class App extends Component {
  render() {
    return (
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={withoutAuth(LoginPage)} />
          <Route
            exact
            path="/registration"
            component={withoutAuth(RegistrationPage)}
          />
          <Route exact path="/payment" component={withAuth(Payment)} />
          <Route
            exact
            path="/start-contest"
            component={withAuth(StartContestPage)}
          />
          <Route
            exact
            path="/start-contest/name-contest"
            component={withAuth(ContestCreationPage, {
              contestType: CONSTANTS.NAME_CONTEST,
              title: 'Company Name',
            })}
          />
          <Route
            exact
            path="/start-contest/tagline-contest"
            component={withAuth(ContestCreationPage, {
              contestType: CONSTANTS.TAGLINE_CONTEST,
              title: 'TAGLINE',
            })}
          />
          <Route
            exact
            path="/start-contest/logo-contest"
            component={withAuth(ContestCreationPage, {
              contestType: CONSTANTS.LOGO_CONTEST,
              title: 'LOGO',
            })}
          />
          <Route
            exact
            path="/dashboard"
            component={withAuth(Dashboard, null, [CUSTOMER, CREATOR])}
          />
          <Route exact path="/contest/:id" component={withAuth(ContestPage)} />
          <Route exact path="/account" component={withAuth(UserProfile)} />
          <Route
            exact
            path="/transactions"
            component={withAuth(TransactionsPage)}
          />
          <Route exact path="/how-it-works" component={HowItWorksPage} />
          <Route
            exact
            path="/events"
            component={withAuth(EventsPage, null, [CUSTOMER])}
          />
          <Route
            exact
            path="/offers-review"
            component={withAuth(OffersReviewPage, null, [MODERATOR])}
          />
          <Route component={NotFound} />
        </Switch>
        <ChatContainer roles={[CUSTOMER, CREATOR]} />
        <EventsContainer roles={[CUSTOMER]} />
      </Router>
    );
  }
}

export default App;
