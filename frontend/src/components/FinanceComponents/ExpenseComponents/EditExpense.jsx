import React, { useState } from "react";
import { ArrowLabel } from "../../others/ArrowLabel";
import { InputBox } from "../../InfoComponents/InputBox";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from "mongoose";

export function EditExpense() {
  const [employeeId, setEmployeeId] = useState("E789");
  const [expenseAmount, setExpenseAmount] = useState("$300.00");
  const [purpose, setPurpose] = useState("Client Entertainment");
  const [dateOfExpense, setDateOfExpense] = useState("2024-06-22");
  const [approvedBy, setApprovedBy] = useState("Michael Brown");
  const [status, setStatus] = useState("Rejected");

  const navigate = useNavigate();

  const handleSubmit = () => {
    // Placeholder for actual form submission logic
    console.log("Updated Expense:", {
      employeeId,
      expenseAmount,
      purpose,
      dateOfExpense,
      approvedBy,
      status,
    });

    // Show toast notification
    toast.success("Expense Updated Successfully!", {
      position: "bottom-right",
      autoClose: 1500,
    });
    setTimeout(() => navigate("../expense"), 2000);
  };

  return (
    <div className="flex flex-col">
      <ToastContainer /> {/* Ensure ToastContainer is rendered */}
      <ArrowLabel label="Edit Expense" location="../expense" />
      <div className="grid grid-cols-3 bg-neutral-900 border border-neutral-600 rounded-lg p-8 m-4">
        <div className="col-span-3 flex justify-around">
          <InputBox
            label="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <InputBox
            label="Expense Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
          <InputBox
            label="Purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <InputBox
            label="Date Of Expense"
            type="date"
            value={dateOfExpense}
            onChange={(e) => setDateOfExpense(e.target.value)}
          />
        </div>
        <div className="col-span-3 flex justify-around items-end">
          <InputBox
            label="Approved By"
            value={approvedBy}
            onChange={(e) => setApprovedBy(e.target.value)}
          />
          <div className="flex flex-col justify-center items-center mt-3">
            <h1 className="text-md font-medium py-2">Status</h1>
            <select
              className="w-full px-3 py-2 border border-neutral-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="mt-3">
            <button
              className="px-4 py-2 mt-3 bg-indigo-500 rounded-lg font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
