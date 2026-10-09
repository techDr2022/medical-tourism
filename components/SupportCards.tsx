import { supportServices } from "@/lib/packages";

const icons = {
  coordinator: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.5c.6-3.2 3.2-5 6.5-5s5.9 1.8 6.5 5" />
    </svg>
  ),
  airport: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 14.2 13.2 10V4.6a1.2 1.2 0 0 0-2.4 0V10L3 14.2v1.4l7.8-2.2v4.1L8.6 19v1.3L12 19.4l3.4.9V19l-2.2-1.5v-4.1l7.8 2.2Z" />
    </svg>
  ),
  language: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 6.5h8a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H8.2L5.2 17.2V15a2 2 0 0 1-.7-.2" />
      <path d="M10.5 10h7.2a2 2 0 0 1 2 2v3.6a2 2 0 0 1-2 2H16l-2.2 2V17.6h-3.3" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6.5" width="11" height="11" rx="2" />
      <path d="m14 10.2 6-3.2v9.9l-6-3.2Z" />
    </svg>
  ),
} as const;

const iconByTitle = {
  "Dedicated coordinator": "coordinator",
  "Free airport pickup & drop": "airport",
  "Language interpreters": "language",
  "Video consultation*": "video",
} as const;

export function SupportCards() {
  return (
    <div className="includeGrid supportGrid">
      {supportServices.map(([n, title, detail]) => (
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
