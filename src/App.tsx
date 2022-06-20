import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToggleMenuProvider } from "./contexts/ToggleMenuContext";
import { AuthProvider } from "./contexts/UserContext/authContext";
import Rotes from "./routes/routes";

const App: React.FunctionComponent = () => (
  <Router>
    <AuthProvider>
      <ToggleMenuProvider>
        <Rotes />
      </ToggleMenuProvider>
    </AuthProvider>
  </Router>
);

export default App;
