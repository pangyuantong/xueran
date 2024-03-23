import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Row, Tab, Tabs } from "react-bootstrap";
import PowerCard from "./PowerCard";
import { drawSR, fetchData, leaveGame } from "../helpers";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";

const Room = ({ boardData, boardRoles, handleClickLeave }) => {
  const [toggle, setToggle] = useState("1");
  const [seat, setSeat] = useState();
  useEffect(() => {
    async function drawCard() {
      console.log("toggled");
      if (toggle === "0") {
        try {
          if (await drawSR()) {
            setSeat(fetchData("seatNum"));
          }
        } catch (e) {
          console.error("Error retrieving data:", e);
          throw new Error("Error retrieving data.");
        }
      }
    }
    drawCard();
  }, [toggle]);

  

  return (
    <Container fluid className="my-4 booklet" style={{ paddingInline: 0 }}>
      <section style={{ marginBottom: "10px", paddingInline: 0 }}>
        <Row>
          <div className="col-2 pt-1">
            <Button className="btn-fail" onClick={handleClickLeave}>
              <ArrowLeftEndOnRectangleIcon width={20}/>
            </Button>
          </div>
          <div className="col-8">
            <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
              {boardData.bdName}
            </h1>
          </div>
          <div className="col-2"></div>
        </Row>

        <div className="room-tab">
          <Tabs
            defaultActiveKey="1"
            activeKey={toggle}
            onSelect={(k) => setToggle(k)}
            className="mb-3 title"
            justify
            style={{ borderBottomColor: "#121212" }}
          >
            <Tab eventKey="0" title="抿牌" className="main">
              {toggle === "0" && <PowerCard seatNum={seat} />}
            </Tab>
            <Tab eventKey="1" title="课本">
              Tab content for Profile
            </Tab>
            <Tab eventKey="2" title="玩家">
              Tab content for Contact
            </Tab>
          </Tabs>
        </div>
      </section>
    </Container>
  );
};

export default Room;
