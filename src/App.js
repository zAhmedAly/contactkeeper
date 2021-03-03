import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthState from "./context/auth/AuthState";
import ContactState from "./context/contact/ContactState";
import AlertState from "./context/alert/AlertState";

import Header from "./components/Header";
import About from "./screens/About";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./components/routing/PrivateRoute";

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <ContactState>
          <Router>
            <>
              <Header />
              <main className="py-4">
                <Container>
                  <Switch>
                    <PrivateRoute exact path="/" component={HomeScreen} />
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/register" component={RegisterScreen} />
                    <Route exact path="/about" component={About} />
                  </Switch>
                </Container>
              </main>
            </>
          </Router>
        </ContactState>
      </AuthState>
    </AlertState>
  );
};

export default App;
