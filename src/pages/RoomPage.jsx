import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Row, Tab, Tabs } from "react-bootstrap";
import { drawRole, drawSeat, fetchData, getRoom, leaveGame } from "../helpers";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Booklet from "../components/Booklet";
import PowerCard from "../components/PowerCard";



export async function roomLoader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");

  return { loggedUser, _token };
}

export async function roomAction({ request }) {}
const RoomPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState("1");
  const [seat, setSeat] = useState();
  const [boardData, setBoardData] = useState({});
  const [boardRoles, setBoardRoles] = useState([]);
  const [roleInfo, setRoleInfo] = useState({});

  useEffect(() => {
    async function loadRoom() {
      try {
        var res = await getRoom();
        var res = JSON.parse(res);
        if (res.success === true) {
          const userInfo = res.data.user;
          localStorage.setItem("loggedUser", JSON.stringify(userInfo));

          if (userInfo.joinedGameID === null) {
            toast.warning("Not authorized.");
            return navigate("/lobby");
          }

          setBoardData(res.data.boardData);
          setBoardRoles(...boardRoles, res.data.boardRoles);
        } else {
          toast.error("Oops! " + res.message);
          return navigate("/lobby");
        }
      } catch (e) {
        setLoading(false);
        console.error("Error retrieving data:", e);
        throw new Error("Error retrieving data.");
      }
    }

    async function loadSeat(){
      try {
        var res = await drawSeat();
        var res = JSON.parse(res);
        if (res.success === true) {
          setSeat(res.data.seat)
        } else {
          toast.error("Oops! " + res.message);
        }
      } catch (e) {
        setLoading(false);
        console.error("Error retrieving data:", e);
        throw new Error("Error retrieving data.");
      }
    }
    loadRoom();
    loadSeat();
    setLoading(false);
    
  }, []);
  return (
    <Container fluid className="my-4 booklet" style={{ paddingInline: 0 }}>
      <section style={{ marginBottom: "10px", paddingInline: 0 }}>
        <Row>
          <div className="col-2 pt-1">
            <Button className="btn-fail">
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
              <Booklet boardRoles={boardRoles}/>
            </Tab>
            <Tab eventKey="2" title="玩家">
              Tab content for Contact
            </Tab>
          </Tabs>
        </div>
      </section>
    </Container>
  )
};

export default RoomPage;
