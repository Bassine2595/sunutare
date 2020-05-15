import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute, AnonymousRoute } from "./component/Router";
import { Employer } from "./component/User/Employer/Employer";
import { Index as Service } from "./component/User/Service/Index";
import { Modele } from "./component/User/Modele/Modele";
import Dash from "./component/User/Index";
import Index from "./component/Index";
import { Add as AddService } from "./component/User/Service/Add";
import { Add as AddWorkshop } from "./component/User/Workshop/Add";
import { Setting } from "./component/User/Setting/Setting";
import { GenerateLinkReset } from "./component/ForgetPassword/GenerateLinkReset";
import { PasswordReset } from "./component/ForgetPassword/PasswordReset";
import { Register } from "./component/Register/Register";
import { Activate } from "./component/Activate";
import { Login } from "./component/Login/Login";
import { Error404, Error403 } from "./component/FeedBack/Result";
import { Order } from "./component/Order/Order";
import { Galerie } from "./component/Galerie/Galerie";
import { Notification } from "./component/User/Notification/Notification";
import { Customer } from "./component/User/Customer/Customer";
import { Service as EmployerService } from "./component/Employer/Service";
import { Provider } from "react-redux";
import store from "./Store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <AnonymousRoute path="/login" exact>
            <Login />
          </AnonymousRoute>
          <AnonymousRoute path="/forget-password" exact>
            <GenerateLinkReset />
          </AnonymousRoute>
          <AnonymousRoute path="/forget-password/:token" exact>
            <PasswordReset />
          </AnonymousRoute>
          <AnonymousRoute path="/workshop/:token" exact>
            <AddWorkshop />
          </AnonymousRoute>
          <AnonymousRoute path="/register" exact>
            <Register />
          </AnonymousRoute>
          <PrivateRoute path="/" exact>
            <Index />
          </PrivateRoute>
          <PrivateRoute path="/dash" exact>
            <Dash />
          </PrivateRoute>
          <PrivateRoute path="/employer" exact>
            <Employer />
          </PrivateRoute>
          <PrivateRoute path="/service/add" exact>
            <AddService />
          </PrivateRoute>
          <PrivateRoute path="/service" exact>
            <Service />
          </PrivateRoute>
          <PrivateRoute path="/setting" exact>
            <Setting />
          </PrivateRoute>
          <PrivateRoute path="/notification" exact>
            <Notification />
          </PrivateRoute>
          <PrivateRoute path="/modele/:id?" exact>
            <Modele />
          </PrivateRoute>
          <PrivateRoute path="/customer" exact>
            <Customer />
          </PrivateRoute>
          <PrivateRoute path="/employer/service" exact>
            <EmployerService />
          </PrivateRoute>
          <Route path="/galerie" component={Galerie} exact />
          <Route path="/order/:node?" component={Order} exact />
          <Route path="/activate/:token" component={Activate} exact />
          <Route path="/403" component={Error403} exact />
          <Route component={Error404} exact />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
