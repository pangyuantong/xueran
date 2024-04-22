import React, { useState } from "react";
import logomark from "../assets/logomark.png";
import { Row } from "react-bootstrap";

const Booklet = ({ boardRoles }) => {
  const townsfolk = boardRoles.filter((role) => role.roleFaction === 0);
  const outsiders = boardRoles.filter((role) => role.roleFaction === 1);
  const minions = boardRoles.filter((role) => role.roleFaction === 2);
  const demons = boardRoles.filter((role) => role.roleFaction === 3);
  
  const [bookletCheck, setBookletCheck] = useState(false);

  const handleCheckboxChange = () => {
    setBookletCheck(!bookletCheck);
  };


  return (
    <div
      className="keben"
      style={{ height: "100%", overflowY: "auto", paddingBlock: "30px" }}
    >
      <section>
        <Row>
          <div className="d-flex justify-content-end pe-3 pb-2">
            <div className="tool-btns">
              <div className="button r" id="button-6">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={bookletCheck}
                  onChange={handleCheckboxChange}
                />
                <div className="knobs"></div>
                <div className="layer"></div>
              </div>
            </div>
          </div>
        </Row>
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
  );
};

export default Booklet;
