// React
import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//

// Stylings
import "bootstrap/dist/css/bootstrap.min.css";
import Main, { mainLoader } from "./layouts/Main";
import Error from "./pages/Error";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Landing, { landingAction, landingLoader } from "./pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true, 
        element: <Landing />,
        loader: landingLoader,
        action: landingAction,
        errorElement: <Error />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "*",
        // element: <Error />,
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
