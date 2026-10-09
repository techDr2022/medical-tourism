import { packageInclusions } from "@/lib/packages";

const icons = {
  surgery: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 4.5 19.5 9.5" />
      <path d="m4.5 19.5 8.2-8.2" />
      <path d="m13.2 6.8 4 4-2.2 2.2a3.2 3.2 0 0 1-4.5 0l.5-.5" />
      <circle cx="6.2" cy="17.8" r="1.3" />
    </svg>
  ),
  implant: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8" cy="8" r="3.2" />
      <circle cx="16" cy="16" r="3.2" />
      <path d="m10.4 10.4 3.2 3.2" />
    </svg>
  ),
  pharmacy: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.5" y="8" width="15" height="11" rx="2" />
      <path d="M8 8V6.8A2.8 2.8 0 0 1 10.8 4h2.4A2.8 2.8 0 0 1 16 6.8V8" />
      <path d="M12 11.2v4.6M9.7 13.5h4.6" />
    </svg>
  ),
  room: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17.5V10.2A2.2 2.2 0 0 1 6.2 8H14a3 3 0 0 1 3 3v6.5" />
      <path d="M3 17.5h18" />
      <path d="M17 11.5h2.2a1.8 1.8 0 0 1 1.8 1.8v4.2" />
      <path d="M7 12.5h4" />
    </svg>
  ),
  meals: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4.5v7" />
      <path d="M9 4.5v7" />
      <path d="M6 8h3" />
      <path d="M7.5 11.5V20" />
      <path d="M16.5 4.5c-1.4 1.6-1.4 3.4 0 5v10.5" />
      <path d="M16.5 9.5h2.2" />
    </svg>
  ),
} as const;

const iconByTitle = {
  "Joint replacement surgery": "surgery",
  "International-brand implant(s)": "implant",
  "Pharmacy & medical consumables": "pharmacy",
  "Single-room accommodation": "room",
  "Patient meals": "meals",
} as const;

export function InclusionCards() {
  return (
    <div className="includeGrid">
      {packageInclusions.map(([n, title, detail]) => (
        <div className="include supportCard" key={n}>
          <span className="supportIcon">{icons[iconByTitle[title]]}</span>
          <div>
            <h3>{title}</h3>
            <p>{detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
