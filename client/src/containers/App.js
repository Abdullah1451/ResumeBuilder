import React from "react";
import Templates from '../components/templates/Templates'
import TopBar from "../components/topbar/TopBar";
import Register from "../pages/login_register/Register";
import Login from "../pages/login_register/Login";
import Home from "../pages/home/Home";
import ResumeContextProvider from "../contexts/ResumeContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TemplateProvider } from '../contexts/TemplateContext';
import { UserContext } from '../contexts/UserContext';
import UserDetails from "../pages/userDetails/UserDetails";

import "./app.css";



function App() {
  return (
    <div className="app">

      <ResumeContextProvider>
        <UserContext>


          <BrowserRouter>

            <TopBar />

            <Switch>
              <Route exact path="/"> <Home /> </Route>
              <Route path="/register"> <Register /> </Route>
              <Route path="/login"> <Login /> </Route>

              <TemplateProvider>
                <Route path='/template/:id' > <UserDetails /> </Route>
                <Route path='/templates' > <Templates /> </Route>
              </TemplateProvider>
            </Switch>

          </BrowserRouter>
        </UserContext >

      </ResumeContextProvider>
    </div>
  );
}

export default App;
