// import "./styles.css";

export const PowerCardV2 = ({
  seatNum,
  drawnRole,
  setDrawnRole,
  setLoading,
}) => {
  return (
    <div className="power-card-v2">
      <section className="page card-1-page">
        <div className="cards">
          <label id={seatNum}>
            <input type="checkbox" />
            <div className="card">
              <div className="back">
                <header>
                  <h2>TEST</h2>
                  <span className="material-symbols-outlined"> more_vert </span>
                </header>
                <var>TESTT</var>
                <h3>TESTTT</h3>
                <h4>TESTTTT</h4>
              </div>
              <div className="front">
                <header>
                  <h2>TTEST</h2>
                  <span className="material-symbols-outlined"> TTEST </span>
                </header>
                <p>TTESTT</p>
              </div>
            </div>
          </label>
        </div>
      </section>
    </div>
  );
};
