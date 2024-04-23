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
import Orders from "../components/Orders";

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
  const [roleOrders, setRoleOrders] = useState({});
  const [drawnRole, setDrawnRole] = useState({});
  const [gameData, setGameData] = useState({});

  const [bookletCheck, setBookletCheck] = useState(false);

  const handleCheckboxChange = () => {
    setBookletCheck(!bookletCheck);
  };

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
          setRoleOrders(res.data.roleOrders);
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
          setLoading(false);
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
    <Container
      fluid
      className="mt-4 "
      style={{
        padding: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginBottom: 0,
      }}
    >
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
        <section
          style={{
            marginBottom: "10px",
            marginLeft: "0",
            marginRight: "0",
            minWidth: "100%",
          }}
        >
          <Row className="" style={{ width: "100%" }}>
            <div className="col-2 pt-1">
              <Button
                className="btn-fail"
                onClick={handleClickLeave}
                style={{
                  borderTopLeftRadius: "0%",
                  borderBottomLeftRadius: "0%",
                }}
              >
                <ArrowLeftEndOnRectangleIcon width={20} />
              </Button>
            </div>
            <div className="col-9">
              <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
                {boardData.bdName}
              </h1>
            </div>
            <div className="col-1"></div>
          </Row>

          <div className="room-tab cus-tab">
            <Tabs
              defaultActiveKey="1"
              activeKey={toggle}
              onSelect={(k) => setToggle(k)}
              className=""
              justify
              style={{ borderBottomColor: "#50c878" }}
            >
              <Tab eventKey="0" title="抿牌" className="">
                {toggle === "0" && (
                  <PowerCardV2
                    seatNum={seat}
                    drawnRole={drawnRole}
                    setDrawnRole={setDrawnRole}
                    setLoading={setLoading}
                  />
                )}
              </Tab>
              <Tab eventKey="1" title="玩家" className="">
                {toggle === "1" && (
                  <PlayerSeats
                    capacity={gameData.gmCapacity}
                    user={loggedUser}
                  />
                )}
              </Tab>
              <Tab eventKey="2" title="课本" className="">
                {boardRoles.length > 0 ? (
                  <div className="booklet">
                    <section>
                      <Row className="pt-4">
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
                    </section>
                    {bookletCheck === false ? (
                      <Booklet boardRoles={boardRoles} />
                    ) : (
                      <Orders roleOrders={roleOrders} boardRoles={boardRoles}/>
                    )}
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center pt-5">
                    <Spinner animation="border" variant="light" />
                  </div>
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
