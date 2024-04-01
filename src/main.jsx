
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { AuthProvider } from './AuthContext'; // Import AuthProvider

import Landing from "./pages/Landing.jsx";
import Register from "./pages/Register.jsx";
import Voting from "./pages/Voting.jsx";
import CandidateRegistration from "./components/CandidateRegistration.jsx";
import Login from "./pages/Login.jsx";
import Results from "./pages/Results.jsx";
import CandidateForm from "./pages/CandidateForm.jsx";
import Reports from "./pages/Reports.jsx";
import CandidatesReports from './pages/CandidatesReports.jsx';
import AdminApprovalPage from "./pages/AdminApprovalPage.jsx";
import CandidateApplicationForm from "./pages/CandidateApplicationForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/vote",
        element: <Voting />
      },
      {
        path: "/Cand-Register",
        element: <CandidateRegistration />,
      },
      {
        path: "/candidates",
        element: <CandidateForm />,
      },
      {
        path: "/results",
        element: <Results />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Reports",
        element: <Reports />,
      },
      {
        path: "/Approve",
        element: <AdminApprovalPage />,
      },
      {
        path: "/Apply",
        element: <CandidateApplicationForm />,
      },
      {
        path: "/Tally",
        element: <CandidatesReports />,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
