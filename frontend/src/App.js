import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignupFormPage from "./components/SignupFormPage";
import SpotFormPage from './components/createSpotFormPage';
import Navigation from './components/Navigation';
import IndividualSpotPage from './components/individualSpotPage';
import EditSpotFormPage from './components/editSpotFormPage';
import HomePage from './components/homePage';
import ReviewFormPage from './components/createReviewPage';
import EditReviewFormPage from './components/editReviewPage';
import BookingFormPage from './components/bookingFormPage'
import NotFoundPage from './components/notFoundPage'
import PersonalBookingPage from './components/personalBookingPage'
import SearchPage from './components/searchPage'
import * as sessionActions from "./store/session";
import LoginFormModal from './context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const redirectToLinkedIn = () => {
    window.location.assign("https://www.linkedin.com/in/jason-arnold-539005183/")
  }
  const redirectToGithub = () => {
    window.location.assign("https://github.com/QuantitativeSneezing")
  }
  return (
    <div className='topLevel'>
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path="/login">
              <LoginFormModal />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/spots/new">
              <SpotFormPage />
            </Route>
            <Route path="/spots/:spotId/edit">
              <EditSpotFormPage />
            </Route>
            <Route path="/reviews/:reviewId/edit">
              <EditReviewFormPage />
            </Route>
            <Route path="/spots/:spotId/reviews">
              <ReviewFormPage />
            </Route>
            <Route path="/spots/:spotId/bookings">
              <BookingFormPage />
            </Route>
            <Route path="/spots/:spotId">
              <IndividualSpotPage />
            </Route>
            <Route path="/bookings/personal">
              <PersonalBookingPage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        )}
      </>
      {isLoaded && (
        <div className='footer'>
          <div className='footerContent'>
            <span className="myLinks">
              <span onClick={redirectToLinkedIn} >Made by Jason <FontAwesomeIcon icon={faGithub} />   </span>
              <span onClick={redirectToGithub}>  Arnold  <FontAwesomeIcon icon={faLinkedin} /> </span>
            </span>
            <span>
              Inspired by Airbnb
            </span>
          </div>
        </div>
      )}
    </div>
  );
}



export default App;
