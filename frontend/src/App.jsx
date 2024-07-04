import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

import { Landing } from "./pages/Landing";

import { Home } from "./pages/Home";

import { EmployeeLayout } from "./pages/EmployeeLayout";
import { NewEmployee } from "./components/EmployeeComponents/NewEmployee";
import { EditEmployee } from "./components/EmployeeComponents/EditEmployee";
import { ManageEmployees } from "./components/EmployeeComponents/ManageEmployees";

import { Dashboard } from "./components/DashboardComponents/Dashboard";
import { CandidateLayout } from "./pages/CandidateLayout";
import { NewCandidtate } from "./components/CandidatesComponent/NewCandidate";
import { EditCandidate } from "./components/CandidatesComponent/EditCandidate";
import { ManageCandidate } from "./components/CandidatesComponent/ManageCandidate";

import { Profile } from "./pages/Profile";
import { ChangePassword } from "./components/ProfileComponents/ChangePassword";
import { ProfileEdit } from "./components/ProfileComponents/ProfileEdit";
import { ProfileInfo } from "./components/ProfileComponents/ProfileInfo";

import { FinanceLayout } from "./pages/FinanceLayout";
import { ExpenseLayout } from "./components/FinanceComponents/ExpenseComponents/ExpenseLayout";
import { AddExpense } from "./components/FinanceComponents/ExpenseComponents/AddExpense";
import { ManageExpense } from "./components/FinanceComponents/ExpenseComponents/ManageExpense";
import { EditExpense } from "./components/FinanceComponents/ExpenseComponents/EditExpense";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />}>
            <Route path="info" element={<ProfileInfo />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="edit" element={<ProfileEdit />} />
          </Route>
          <Route path="candidates" element={<CandidateLayout />}>
            <Route path="create" element={<NewCandidtate />} />
            <Route path="edit" element={<EditCandidate />} />
            <Route path="manage" element={<ManageCandidate />} />
          </Route>
          <Route path="employee" element={<EmployeeLayout />}>
            <Route path="create" element={<NewEmployee />} />
            <Route path="edit" element={<EditEmployee />} />
            <Route path="manage" element={<ManageEmployees />} />
          </Route>
          <Route path="finance" element={<FinanceLayout />}>
            <Route path="expense" element={<ExpenseLayout />} />
            <Route path="expense/edit" element={<EditExpense />} />
            <Route path="expense/add" element={<AddExpense />} />
            <Route path="expense/manage" element={<ManageExpense />} />
          </Route>
          <Route path="settings" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
