import { StrictMode, useState } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchParams from "./SearchParams";
import Detail from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("darkblue");

  return (
    <ThemeContext.Provider value={theme}>
      <div>
      <Router>
      <header>
      <Link to="/">
      <h1>Adopt Me!</h1>
      </Link>
      </header>
        <Switch>
        <Route path="/details/:id">
          <Detail/>
        </Route>
        <Route path="/">
        <SearchParams />;
        </Route>
        </Switch>
      </Router>
    </div>
    </ThemeContext.Provider>
  );
};

render(<StrictMode><App /></StrictMode>, document.getElementById("root"));
