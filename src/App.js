import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import PlayersTable from "./components/PlayersTable";
import StadiumsTable from "./components/StadiumsTable";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PendingAsks from "./components/PendingAsks";
import ManageSports from "./components/ManageSports";
import PlayersDetails from "./components/PlayersDetails";
import StadiumDetails from "./components/StadiumDetails";
import RequestDetails from "./components/RequestDetails";
import LeaguesTable from "./components/LeagueTable";


function App() {
  return (
<Router>
      
<Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/reports" element={<Reports />} />
  <Route path="/players" element={<PlayersTable/>}/>
  <Route path="/players/:id" element={<PlayersDetails/>}/>
  <Route path="/stadiums" element={<StadiumsTable />} />
  <Route path="/stadiums/:id" element={<StadiumDetails />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password-redirect" element={<ResetPassword />} />
  <Route path="/pending-asks" element={<PendingAsks />} />
  <Route path="/request-details/:id" element={<RequestDetails />} />     
  <Route path="/manage-sports" element={<ManageSports/>}/>
  <Route path="/leagues" element={<LeaguesTable />} />

</Routes>
</Router>
  );
}

export default App;
