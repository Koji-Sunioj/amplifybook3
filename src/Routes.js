import { Routes as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListItem from "./pages/ListItem";

const Routes = () => (
  <Router>
    <Route path="/" element={<HomePage />} />
    <Route path="/list-item/:itemId" element={<ListItem />} />
  </Router>
);

export default Routes;
