import React, { useState } from "react";
import logomark from "../assets/logomark.png";
import { Container, Row, Spinner } from "react-bootstrap";

const Booklet = ({ boardRoles }) => {
  console.log(boardRoles);
  console.log("test");
  const rolesArray = Object.values(boardRoles);

  const townsfolk = rolesArray.filter((role) => role.roleFaction === 0);
  const outsiders = rolesArray.filter((role) => role.roleFaction === 1);
  const minions = rolesArray.filter((role) => role.roleFaction === 2);
  const demons = rolesArray.filter((role) => role.roleFaction === 3);

  return (
    <div
      className="booklet"
      style={{
        maxHeight: "100%",
        minHeight: "100%",
        overflowY: "auto",
        paddingBottom: "30px",
      }}
    >
      {townsfolk.length < 1 ? (
        <Container
          fluid
          style={{
            height: "50vh",
            maxWidth: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="border" variant="light" />
        </Container>
      ) : (
        <div>
          <section>
            <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
              镇民
            </h1>
            {townsfolk.map((role, index) => (
              <details key={role.roleId}>
                <summary>
                  <div>
                    <img src={role.roleImg} alt="" width={50} height={50} />
                    <h3>
                      <strong>{role.roleName}</strong>
                      <small>{role.roleDesc}</small>
                    </h3>
                  </div>
                </summary>
              </details>
            ))}
          </section>
          <section style={{ marginBottom: "10px" }}>
            <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
              外来者
            </h1>
            {outsiders.map((role, index) => (
              <details key={role.roleId}>
                <summary>
                  <div>
                    <img src={role.roleImg} alt="" width={50} height={50} />
                    <h3>
                      <strong>{role.roleName}</strong>
                      <small>{role.roleDesc}</small>
                    </h3>
                  </div>
                </summary>
              </details>
            ))}
          </section>
          <section style={{ marginBottom: "10px" }}>
            <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
              爪牙
            </h1>
            {minions.map((role, index) => (
              <details key={role.roleId}>
                <summary>
                  <div>
                    <img src={role.roleImg} alt="" width={50} height={50} />
                    <h3>
                      <strong>{role.roleName}</strong>
                      <small>{role.roleDesc}</small>
                    </h3>
                  </div>
                </summary>
              </details>
            ))}
          </section>
          <section style={{ marginBottom: "10px" }}>
            <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
              恶魔
            </h1>
            {demons.map((role, index) => (
              <details key={role.roleId}>
                <summary>
                  <div>
                    <img src={role.roleImg} alt="" width={50} height={50} />
                    <h3>
                      <strong>{role.roleName}</strong>
                      <small>{role.roleDesc}</small>
                    </h3>
                  </div>
                </summary>
              </details>
            ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default Booklet;
