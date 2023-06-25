import logo from './logo.svg';
import './App.css';
import Wrapper from "./components/layout/Wrapper";
import Dashboard from "./components/page-containers/Dashboard"; 
import Tables from "./components/page-containers/Tables";
import Items from "./components/page-containers/Items";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";




const router = createBrowserRouter([
  {
    path:"/",
    element:<Wrapper/>,
    children:[
      {
        path:"/",
        element:<Navigate to="/dashboard" replace={true} />
      },
      {
        path:"/dashboard",
        element:<Dashboard/>,
      },
      {
        path:"/tables",
        element:<Tables/>
      },
      {
        path:"/items",
        element:<Items/>
      }
    ]
  }
  
]);


function App() {
  return (
    <>
    <RouterProvider router={router} />
    {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}
    </>
  );
}

export default App;
