import { useContext } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactState from "./components/context/contact/ContactState";

import Header from "./components/Header";
import About from "./screens/About";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <ContactState>
      <Router>
        <Header />

        <main className="py-4">
          <Container>
            <Switch>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/login" component={LoginScreen} />
              <Route path="/about" component={About} />
            </Switch>
          </Container>
        </main>
      </Router>
    </ContactState>
  );
};

export default App;
