import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import SignUp from './Authentification/SignUp'; 
import reportWebVitals from './reportWebVitals';
import SignIn from './Authentification/SignIn';
import Formulaire from  './Formulaire';
import Joboffer from './joboffer';
import JobOfferDetails from './JobOfferDetails';
import Profile from './profile';
import Dashboard from './Gestionaire/dashboard/dashboard';
import Test from './Gestionaire/ListOfCandidate';
import MoreInformation from './Gestionaire/MoreIformations';

import JoboofersForm from './Gestionaire/JobOffer';

import ALLJobOffer from './Gestionaire/ListeOfSessions';
import Registration from './SingUp/SignUp';
import EditApplication from './Mycondidate/mycondidate';
import Header from './header';
import AboutUs from './About_US/AboutUs';
import ChartsPage from './Gestionaire/dashboard/PieCHart';



ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/registre" element={<Formulaire />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/joboffer" element={<Joboffer />} />
      <Route exact path="/job/:id"  element={<JobOfferDetails/>} />
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ListOfCandidate" element={<Test />}/>
      <Route path="/MoreInformation/:id" element={<MoreInformation />}/>
      <Route path="/JoboofersForm" element={<JoboofersForm />}/>
      <Route path="/ALLJobOffer" element={<ALLJobOffer />}/>
      <Route path="/Registration" element={<Registration />}/>
      <Route path="/EditApplication" element={<EditApplication />}/>
      <Route path="/header"element={<Header />}/>
      <Route path="/AboutUs"element={<AboutUs />}/>
      <Route path="/PieChart"element={<ChartsPage />}/>
      
      
    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();








