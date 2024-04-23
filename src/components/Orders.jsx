import React from "react";
import { Col, Row } from "react-bootstrap";

const Orders = ({ boardRoles, roleOrders }) => {
  console.log(roleOrders.firstNight);
  console.log(boardRoles);
  return (
    <Row
      className="orders px-2 pt-2"
      style={{ height: "100%", overflowY: "auto", paddingBottom: "30px" }}
    >
      <Col className="ms-4">
      <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
        首夜
      </h1>
        <div class="timeline">
          {roleOrders.firstNight.map((order, index) => (
            <div className="timeline-container primary">
              <div className="timeline-icon">
                <img src={boardRoles[order + 1].roleImg} alt="" width={50} height={50} />
              </div>
              <div className="">
                <p className="spooky-para-static">
                  <strong>{boardRoles[order + 1].roleName}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Col>
      
      <Col className="ms-4">
      <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
        其他
      </h1>
        <div class="timeline">
          {roleOrders.otherNight.map((order, index) => (
            <div className="timeline-container primary">
              <div className="timeline-icon">
                <img src={boardRoles[order + 1].roleImg} alt="" width={50} height={50} />
              </div>
              <div className="">
                <p className="spooky-para-static">
                  <strong>{boardRoles[order + 1].roleName}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default Orders;
