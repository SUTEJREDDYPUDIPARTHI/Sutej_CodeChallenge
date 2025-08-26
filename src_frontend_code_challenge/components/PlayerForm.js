import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Spinner,
  Alert,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import {
  addPlayer,
  getPlayerById,
  updatePlayer,
} from "../services/playerService";
import { useNavigate, useParams } from "react-router-dom";

const roles = ["Batsman", "Bowler", "All Rounder", "Keeper"];

export default function PlayerForm({ mode }) {
  const [data, setData] = useState({
    playerName: "",
    jerseyNumber: "",
    role: "",
    totalMatches: "",
    teamName: "",
    country: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (mode === "edit" && id) {
      setLoading(true);
      getPlayerById(id)
        .then(({ data }) => {
          setData(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch player data");
          setLoading(false);
        });
    }
  }, [mode, id]);

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const validate = () => {
    if (!data.playerName) return "Player name is required";
    if (!data.jerseyNumber || data.jerseyNumber < 1 || data.jerseyNumber > 999)
      return "Valid jersey number is required";
    if (!roles.includes(data.role)) return "Valid role is required";
    if (!data.totalMatches || data.totalMatches < 1)
      return "Valid total matches is required";
    if (!data.teamName) return "Team name is required";
    if (!data.country) return "Country name is required";
    if (data.description.length > 500) return "Description max 500 characters";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    const fn = mode === "add" ? addPlayer : () => updatePlayer(id, data);
    fn(data)
      .then(() => {
        setToastMessage(
          mode === "add"
            ? "Player added successfully!"
            : "Player edited successfully!"
        );
        setToastVariant("success");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/players");
        }, 1500);
      })
      .catch(() => {
        setToastMessage("Save failed");
        setToastVariant("danger");
        setShowToast(true);
      });
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <>
      <h2>{mode === "add" ? "Add" : "Edit"} Player</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Player Name</Form.Label>
          <Form.Control
            name="playerName"
            value={data.playerName}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Jersey Number</Form.Label>
          <Form.Control
            type="number"
            min="1"
            name="jerseyNumber"
            value={data.jerseyNumber}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={data.role} onChange={onChange}>
            <option value="">Select Role</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Total Matches</Form.Label>
          <Form.Control
            type="number"
            min="1"
            name="totalMatches"
            value={data.totalMatches}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            name="teamName"
            value={data.teamName}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            name="country"
            value={data.country}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            maxLength={500}
            rows={3}
            name="description"
            value={data.description}
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          {mode === "add" ? "Add" : "Update"} Player
        </Button>
      </Form>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toastVariant}
          autohide
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastVariant === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
