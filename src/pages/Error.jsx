import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <Container fluid className="error" style={{ height: "100dvh" }}>
      <h1>Uh oh! We've got a problem.</h1>
      <p>{error.message || error.statusText}</p> 
        <Col>
        <button className="btn btn-light mx-3" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          Go Back
        </button> 
        <Link to="/" className="btn btn-light mx-3">
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
        </Col> 
      
    </Container>
  );
};

export default Error;
