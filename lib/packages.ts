export const packages = [
  {
    name: "Single Knee Replacement",
    price: "USD 2,900",
    stay: "3 days",
    note: "single room",
    image: "/Single-Knee-Replacement.png",
    joint: "knee" as const,
  },
  {
    name: "Bilateral Knee Replacement",
    price: "USD 5,000",
    stay: "6 days total",
    note: "single room • two stages",
    image: "/Bilateral-Knee-Replacement.png",
    joint: "knee" as const,
  },
  {
    name: "Single Hip Replacement",
    price: "USD 3,500",
    stay: "4 days",
    note: "single room",
    image: "/Single-Hip-Replacement.png",
    joint: "hip" as const,
  },
  {
    name: "Bilateral Hip Replacement",
    price: "USD 6,500",
    stay: "6 days total",
    note: "single room • two stages",
    image: "/Bilateral-Hip-Replacement.png",
    joint: "hip" as const,
  },
];

export const packageInclusions = [
  ["01", "Joint replacement surgery", "As specified in the selected package."],
  ["02", "International-brand implant(s)", "Implants selected as part of the clinical plan."],
  ["03", "Pharmacy & medical consumables", "Used during the included hospital stay."],
  ["04", "Single-room accommodation", "For the stated package duration."],
  ["05", "Patient meals", "During the included hospital stay."],
] as const;

export const supportServices = [
  ["01", "Dedicated coordinator", "One point of contact for appointments, travel planning and on-ground support."],
  ["02", "Free airport pickup & drop", "Airport transfers arranged for your arrival and departure in Hyderabad."],
  ["03", "Language interpreters", "Interpreter support to help you communicate during consultations and hospital stay."],
  ["04", "Video consultation*", "Remote specialist discussion when clinically suitable, before you travel."],
] as const;

export const journeySteps = [
  ["1", "Send reports", "Share your scans, reports and treatment history."],
  ["2", "Review & video option", "We coordinate a preliminary review; video consult when suitable."],
  ["3", "Receive options", "Get hospital, doctor and package options."],
  ["4", "Travel with support", "Coordinator, airport transfer, interpreters and stay planning."],
] as const;
