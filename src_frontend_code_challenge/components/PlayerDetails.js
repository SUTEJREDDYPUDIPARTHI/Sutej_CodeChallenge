import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { getPlayerById } from "../services/playerService";

export default function PlayerDetails() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPlayerById(id)
      .then(({ data }) => {
        setPlayer(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Player not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (!player)
    return <Alert variant="warning">Player details not available</Alert>;

  return (
    <Card>
      <Card.Header>
        <h3>Player Details</h3>
      </Card.Header>
      <Card.Body>
        <Card.Title>{player.playerName}</Card.Title>
        {[
          "playerId",
          "jerseyNumber",
          "role",
          "totalMatches",
          "teamName",
          "country",
          "description",
        ].map((f) => (
          <Card.Text key={f}>
            <strong>
              {f.charAt(0).toUpperCase() + f.slice(1).replace(/([A-Z])/g, " $1")}{" "}
              :{" "}
            </strong>{" "}
            {player[f]}
          </Card.Text>
        ))}
        <Button
          as={Link}
          to={`/edit/${player.playerId}`}
          variant="primary"
          className="me-2"
        >
          Edit
        </Button>
        <Button as={Link} to="/" variant="secondary">
          Back
        </Button>
      </Card.Body>
    </Card>
  );
}
