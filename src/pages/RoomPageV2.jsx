import React, { useRef, useState, useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchData, getAPI } from "../helpers";
import { PowerCardV2 } from "../components/PowerCardV2";
import PlayerSeats from "../components/PlayerSeats";
import Booklet from "../components/Booklet";
import Orders from "../components/Orders";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";

export async function roomV2Loader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");

  return { loggedUser, _token };
}

const RoomPageV2 = () => {
  const navigate = useNavigate();
  const { _token, loggedUser } = useLoaderData();

  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(0);

  const [seat, setSeat] = useState();
  const [boardData, setBoardData] = useState({});
  const [boardRoles, setBoardRoles] = useState({});
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
        var res = await getAPI("getRoom");
        var res = JSON.parse(res);
        if (res.success === true) {
          const userInfo = res.data.user;
          localStorage.setItem("loggedUser", JSON.stringify(userInfo));

          if (userInfo.joinedGameID === null) {
            toast.warning("Not authorized.");
            return navigate("/lobby");
          }

          setBoardData(res.data.boardData);
          setBoardRoles(res.data.boardRoles);
          setRoleOrders(res.data.roleOrders);
          setGameData(res.data.gameData);
        } else {
          toast.error("Oops! " + res.message);
          setLoading(false);
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
        var res = await getAPI("drawSeat");
        var res = JSON.parse(res);
        if (res.success === true) {
          setSeat(res.data.seat);
          setLoading(false);
        } else {
          toast.error("Oops! " + res.message);
          setLoading(false);
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

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 100;

  const onTouchStart = (e) => {
    touchEndRef.current = null; // reset touch end to ensure swipe is calculated correctly
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    const touchStart = touchStartRef.current;
    const touchEnd = touchEndRef.current;
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      if (toggle < 2) {
        setToggle(toggle + 1);
      }
    }
    if (isRightSwipe) {
      if (toggle > 0) {
        setToggle(toggle - 1);
      }
    }
  };

  const handleClickLeave = async () => {
    setLoading(true);
    try {
      var res = await getAPI("leaveGame");
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
      className="justify-content-center p-0"
      style={{ height: "100dvh" }}
    >
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="align-self-end slide-container"
      >
        {/* <button className="exit-btn">
          <ArrowLeftEndOnRectangleIcon width={20} />
        </button> */}

        <Button
          className="exit-btn"
          onClick={handleClickLeave}
          style={{
            borderTopLeftRadius: "0%",
            borderBottomLeftRadius: "0%",
          }}
        >
          <ArrowLeftEndOnRectangleIcon width={20} />
        </Button>
        <div className="slide-tabbar">
          <div className="tabs">
            <input
              type="radio"
              id="radio-1"
              name="tabs"
              checked={toggle == 0}
              onChange={() => setToggle(0)}
            />
            <label className="tab" htmlFor="radio-1">
              抿牌
            </label>

            <input
              type="radio"
              id="radio-2"
              name="tabs"
              checked={toggle == 1}
              onChange={() => setToggle(1)}
            />
            <label className="tab" htmlFor="radio-2">
              玩家
            </label>

            <input
              type="radio"
              id="radio-3"
              name="tabs"
              checked={toggle == 2}
              onChange={() => setToggle(2)}
            />
            <label className="tab" htmlFor="radio-3">
              课本
            </label>

            <span className="glider"></span>
          </div>
        </div>
        {toggle == 0 && (
          <div className="align-self-center">
            <PowerCardV2
              seatNum={seat}
              drawnRole={drawnRole}
              setDrawnRole={setDrawnRole}
              setLoading={setLoading}
            />
          </div>
        )}
        {toggle == 1 && (
          <PlayerSeats capacity={gameData.gmCapacity} user={loggedUser} />
        )}
        {toggle == 2 && (
          <div>
            <div className="tool-btns" style={{ position: "fixed" }}>
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
            {bookletCheck === false ? (
              <Booklet boardRoles={boardRoles} />
            ) : (
              <Orders roleOrders={roleOrders} boardRoles={boardRoles} />
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default RoomPageV2;
