import React, { useState, useEffect } from "react";
import { Table, Button, Form, InputGroup, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllPlayers,
  getPlayerById,
  getPlayersSortedByJersey,
} from "../services/playerService";

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loadPlayers = () => {
    getAllPlayers()
      .then((res) => {
        setPlayers(res.data);
        setError("");
        setSearchResult(null);
        setSearchId("");
      })
      .catch(() => setError("Failed to load players"));
  };

  const loadPlayersSortedByJersey = () => {
    getPlayersSortedByJersey()
      .then((res) => {
        setPlayers(res.data);
        setSearchResult(null);
        setSearchId("");
        setError("");
      })
      .catch(() => setError("Failed to load sorted players"));
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) {
      setError("Please enter a Player ID to search");
      return;
    }
    setError("");
    setSearchResult(null);
    getPlayerById(searchId.trim())
      .then((res) => setSearchResult(res.data))
      .catch(() => setError("Player not found"));
  };

  const clearSearch = () => {
    setSearchId("");
    setSearchResult(null);
    setError("");
    loadPlayers();
  };

  const displayPlayers = searchResult ? [searchResult] : players;

  return (
    <>
      <h2>Players</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button
        variant="info"
        className="mb-3 me-2"
        onClick={loadPlayersSortedByJersey}
      >
        Sort by Jersey Number (Asc)
      </Button>

      <Form
        onSubmit={handleSearch}
        className="mb-3"
        style={{ maxWidth: "400px" }}
      >
        <InputGroup>
          <Form.Control
            type="number"
            placeholder="Search by Player ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
          <Button variant="secondary" onClick={clearSearch}>
            Show All
          </Button>
        </InputGroup>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Player ID</th>
            <th>Name</th>
            <th>Jersey Number</th>
            <th>Role</th>
            <th>Matches</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayPlayers.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No players found
              </td>
            </tr>
          ) : (
            displayPlayers.map((p) => (
              <tr key={p.playerId}>
                <td>{p.playerId}</td>
                <td>{p.playerName}</td>
                <td>{p.jerseyNumber}</td>
                <td>{p.role}</td>
                <td>{p.totalMatches}</td>
                <td>{p.country}</td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    as={Link}
                    to={`/details/${p.playerId}`}
                    className="me-2"
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate(`/edit/${p.playerId}`)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}
