import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Form } from "react-router-dom";
import { LifebuoyIcon } from "@heroicons/react/24/solid";
import priest from "../assets/priest.png";


const AuthForm = () => {
  return (
    <Container fluid className="my-5">
      <Row>
        <Col xs={12} sm={6}>
          <Row className="py-4">
            <h1 className="spooky-title">在午夜钟声敲响</h1>

            <h1 className="spooky-title">
              <span className="haunted-title">的时刻...</span>
            </h1>
          </Row>
          <Row className="justify-content-center">
            <p className="spooky-para">
              善民能及时找到恶魔吗？或是邪恶会泛滥成灾，吞没这个曾经和平的小镇？
            </p>
          </Row>
          <Row>
            <Form method="post">
              <Row className="justify-content-center">
                <input
                  type="number"
                  name="mobile"
                  required
                  placeholder="Enter your contact number"
                  aria-label="mobile"
                  autoComplete="mobile"
                  className="spooky-input"
                />
                <input type="hidden" name="_action" value="authContact" />
              </Row>

              <Row className="justify-content-center my-3">
                <Button
                  variant="outline-danger"
                  style={{ width: "100px" }}
                  type="submit"
                >
                  Enter <LifebuoyIcon width={20} />
                </Button>{" "}
              </Row>
            </Form>
          </Row>
        </Col>

        <Col xs={12} sm={6}>
          <Row className="mt-auto">
            <img src={priest} alt="Priest" style={{ width: "100%" , height: "100%" }} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
