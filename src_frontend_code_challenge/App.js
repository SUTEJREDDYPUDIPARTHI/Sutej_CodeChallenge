import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import PlayerDetails from "./components/PlayerDetails";
import PlayerList from "./components/PlayerList";
import PlayerForm from "./components/PlayerForm";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                  flexDirection: "column",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <h1>Welcome to the Cricket Team Management System</h1>
              </div>
            }
          />
          <Route path="/players" element={<PlayerList />} />
          <Route path="/add" element={<PlayerForm mode="add" />} />
          <Route path="/edit/:id" element={<PlayerForm mode="edit" />} />
          <Route path="/details/:id" element={<PlayerDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
