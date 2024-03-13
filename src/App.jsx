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
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Main />,
    // loader: mainLoader,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        // path: "/:id",
        // element: <Dashboard />,
        // loader: dashboardLoader,
        // action: dashboardAction,
        // errorElement: <Error />,
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
