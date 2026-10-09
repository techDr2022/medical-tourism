import { neuroCases } from "@/lib/focus";

export function NeuroCards() {
  return (
    <div className="includeGrid">
      {neuroCases.map((item) => (
        <div className="include supportCard" key={item.name}>
          {item.image ? (
            <img className="neuroIcon" src={item.image} alt="" />
          ) : (
            <span className="supportIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 5v2M12 17v2M5 12h2M17 12h2" />
              </svg>
            </span>
          )}
          <div>
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
