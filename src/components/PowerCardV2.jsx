// import "./styles.css";

const cards = [
  {
    name: "summary",
    total: "TEST",
    description: "TEST",
    footer: "Completed: 13",
    more: "More Information",
  },
];

export const PowerCardV2 = () => {
  return (
    <div className="power-card-v2">
      <section className="page card-1-page">
        <div className="cards">
          {cards.map((card) => (
            <label id={card.name}>
              <input type="checkbox" />
              <div className="card">
                <div className="front">
                  <header>
                    <h2>{card.name}</h2>
                    <span className="material-symbols-outlined">
                      {" "}
                      more_vert{" "}
                    </span>
                  </header>
                  <var>{card.total}</var>
                  <h3>{card.total}</h3>
                  <h4>{card.total}</h4>
                </div>
                <div className="back">
                  <header>
                    <h2>{card.name}</h2>
                    <span className="material-symbols-outlined"> close </span>
                  </header>
                  <p>More Information</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};
