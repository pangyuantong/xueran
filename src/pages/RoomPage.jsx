import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { drawRole, drawSeat, fetchData, getRoom, leaveGame } from "../helpers";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useLoaderData, useNavigate } from "react-router-dom";
import Booklet from "../components/Booklet";
import PowerCard from "../components/PowerCard";
import { toast } from "react-toastify";
import PlayerSeats from "../components/PlayerSeats";
import { PowerCardV2 } from "../components/PowerCardV2";

export async function roomLoader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");

  return { loggedUser, _token };
}

export async function roomAction({ request }) {}
const RoomPage = () => {
  const navigate = useNavigate();

  const { _token, loggedUser } = useLoaderData();

  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState("2");
  const [seat, setSeat] = useState();
  const [boardData, setBoardData] = useState({});
  const [boardRoles, setBoardRoles] = useState([]);
  const [drawnRole, setDrawnRole] = useState({});
  const [gameData, setGameData] = useState({});

  useEffect(() => {
    if (_token === null || loggedUser === null) {
      // One or both are null, handle the scenario, maybe navigate to a login page
      navigate("/"); // Replace '/login' with the actual path you need
    }
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
          setGameData(res.data.gameData);
        } else {
          toast.error("Oops! " + res.message);
          // return navigate("/lobby");
        }
      } catch (e) {
        setLoading(false);
        console.error("Error retrieving data:", e);
        throw new Error("Error retrieving data.");
      }
    }

    async function loadSeat() {
      try {
        var res = await drawSeat();
        var res = JSON.parse(res);
        if (res.success === true) {
          setSeat(res.data.seat);
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

  const handleClickLeave = async () => {
    setLoading(true);
    try {
      var res = await leaveGame();
      var res = JSON.parse(res);

      setLoading(false);
      if (res.success === true) {
        const userInfo = res.data.user;
        localStorage.setItem("loggedUser", JSON.stringify(userInfo));
        return navigate("/lobby");
      } else {
        toast.error("Oops! " + res.message);
        return navigate("/");
      }
    } catch (e) {
      setLoading(false);
      console.error("Error retrieving data:", e);
      throw new Error("Error retrieving data.");
    }
  };

  return (
    <Container fluid className="my-4 booklet" style={{ paddingInline: 0 }}>
      {loading ? (
        <Container
          fluid
          style={{
            height: "100vh",
            width: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="border" variant="light" />
        </Container>
      ) : (
        <section style={{ marginBottom: "10px", paddingInline: 0 }}>
          <Row>
            <div className="col-2 pt-1">
              <Button className="btn-fail" onClick={handleClickLeave}>
                <ArrowLeftEndOnRectangleIcon width={20} />
              </Button>
            </div>
            <div className="col-8">
              <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
                {/* {boardData.bdName} */}-
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
                {toggle === "0" &&
                  (loggedUser.userID === 5 || loggedUser.userID === 10 ? (
                    <PowerCardV2
                      seatNum={seat}
                      drawnRole={drawnRole}
                      setDrawnRole={setDrawnRole}
                      setLoading={setLoading}
                    />
                  ) : (
                    <PowerCard
                      seatNum={seat}
                      drawnRole={drawnRole}
                      setDrawnRole={setDrawnRole}
                      setLoading={setLoading}
                    />
                  ))}
              </Tab>
              <Tab eventKey="1" title="课本" style={{ maxHeight: "75vh" }}>
                {boardRoles.length > 0 ? (
                  <Booklet boardRoles={boardRoles} />
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="light" />
                  </div>
                )}
              </Tab>
              <Tab eventKey="2" title="玩家" style={{overflowX:'hidden'}}>
                {toggle === "2" && (
                  <PlayerSeats
                    capacity={gameData.gmCapacity}
                    user={loggedUser}
                  />
                )}
              </Tab>
            </Tabs>
          </div>
        </section>
      )}
    </Container>
  );
};

export default RoomPage;
