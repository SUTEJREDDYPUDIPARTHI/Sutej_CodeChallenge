import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="md">
        <Container>
            <Navbar.Brand as={Link} to="/">Cricket Team</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/players">Players</Nav.Link>
                <Nav.Link as={Link} to="/add">Add Player</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
    }