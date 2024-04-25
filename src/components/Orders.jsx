import React from "react";
import { Col, Row } from "react-bootstrap";

const Orders = ({ boardRoles, roleOrders }) => {
  console.log(roleOrders.firstNight);
  console.log(boardRoles);
  console.log(boardRoles[32]);
  return (
    <Row
      className="orders pt-2"
      style={{
        height: "100%",
        paddingBottom: "30px",
        maxWidth: "100%",
        overflowX: "hidden",
        marginLeft: "0",
      }}
    >
      <Col className="ms-4">
        <p className="spooky-para-static mt-2" style={{borderInlineStart:"5px solid #ff0000"}}>
          <strong>首夜</strong>
        </p>
        <div className="timeline">
          {roleOrders.firstNight.map((order, index) => (
            <div className="timeline-container primary">
              <div className="timeline-icon">
                <img
                  src={boardRoles[order].roleImg}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
              <div className="ms-3">
                <p className="spooky-para-static">
                  <strong>{boardRoles[order].roleName}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Col>

      <Col className="ms-4">
        <p className="spooky-para-static mt-2" style={{borderInlineStart:"5px solid #001eff"}}>
          <strong>其他</strong>
        </p>
        <div className="timeline">
          {roleOrders.otherNight.map((order, index) => (
            <div className="timeline-container primary">
              <div className="timeline-icon">
                <img
                  src={boardRoles[order].roleImg}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
              <div className="ms-3">
                <p className="spooky-para-static me-1">
                  <strong>{boardRoles[order].roleName}</strong>
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
