import { NavLink } from 'react-router-dom';
import { Navbar, Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import { RiMapPinLine } from "react-icons/ri";
import { FcHome } from "react-icons/fc";
import { FcGallery } from "react-icons/fc";

import "../assets/css/pokemon.css";

export default function Navigation() {

  const setActiveClass = ({ isActive }) => (isActive ? "active" : "mi-clase");

  return (
    <>
      <Navbar bg="dark" variant="light">
        <Container className="justify-content-start">
          <Nav className="me-auto">
            <NavLink to="/" className={setActiveClass}>
              <RiMapPinLine />
            </NavLink>
          </Nav>
          <Nav className="justify-content">
            <NavLink className={setActiveClass} to="/">
              <FcHome /> Home
            </NavLink>
            <NavLink className={setActiveClass} to="/Pokemones" >
              < FcGallery />   Pokemones
            </NavLink>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}
