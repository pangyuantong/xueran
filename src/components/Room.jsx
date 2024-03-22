import React, { useState } from "react";
import { Badge, Container, Tab, Tabs } from "react-bootstrap";

const Room = ({ boardData, boardRoles }) => {
  const [toggle, setToggle] = useState("0");

  return (
    <Container fluid className="my-4 booklet">
      <section style={{ marginBottom: "10px" }}>
        <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
          {boardData.bdName}
        </h1>
        <div className="room-tab">
          <Tabs
            defaultActiveKey="0"
            activeKey={toggle}
            onSelect={(k) => setToggle(k)}
            className="mb-3"
            justify
          >
            <Tab eventKey="0" title="Home" className="main">
              Tab content for Home
            </Tab>
            <Tab eventKey="1" title="Profile">
              Tab content for Profile
            </Tab>
            <Tab eventKey="2" title="Contact">
              Tab content for Contact
            </Tab>
          </Tabs>
        </div>
      </section>
    </Container>
  );
};

export default Room;
