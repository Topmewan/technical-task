import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

//Components
import ProductsPage from "./pages/ProductsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
        <Navbar/>
        <Router>
            <Switch>
                <Route exact path='/' component={ProductsPage}/>
                <Route/>

            </Switch>
        </Router>

    </>
  );
}

export default App;
