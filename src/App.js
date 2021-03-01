import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactState from "./components/context/contact/ContactState";
import AlertState from "./components/context/alert/AlertState";

import Header from "./components/Header";
import About from "./screens/About";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AuthState from "./components/context/auth/AuthState";
import PrivateRoute from "./components/routing/PrivateRoute";

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Header />

            <main className="py-4">
              <Container>
                <Switch>
                  <PrivateRoute path="/" component={HomeScreen} exact />
                  <Route path="/login" component={LoginScreen} />
                  <Route path="/register" component={RegisterScreen} />

                  <Route path="/about" component={About} />
                </Switch>
              </Container>
            </main>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
