export const focusBlurb =
  "International patient coordination for orthopaedic and neurosurgery cases in India.";

export const treatmentGroups = [
  {
    label: "Orthopaedic surgery",
    options: [
      "Single knee replacement",
      "Bilateral knee replacement",
      "Single hip replacement",
      "Bilateral hip replacement",
      "Other orthopaedic surgery",
    ],
  },
  {
    label: "Spine surgery",
    options: ["Slipped disc surgery", "Spinal stenosis surgery", "Spinal fusion"],
  },
  {
    label: "Brain surgery",
    options: ["Brain tumour surgery", "Aneurysm surgery", "Pituitary surgery", "Other neurosurgery"],
  },
] as const;

export const guidanceOption = "Not sure — need guidance";

export const neuroCases = [
  {
    name: "Slipped disc surgery",
    detail: "A plan is prepared after your MRI is reviewed.",
    image: "/Slipped-disc%20.svg",
  },
  {
    name: "Spinal stenosis surgery",
    detail: "Decompression is considered only after a specialist reviews your scans.",
    image: "/Spinal-stenosis.svg",
  },
  {
    name: "Spinal fusion",
    detail: "Suitability is decided by the treating surgeon.",
    image: "/fusion-backbone-correction.svg",
  },
  {
    name: "Brain tumour surgery",
    detail: "Scans are reviewed before any treatment plan is shared.",
    image: "/Brain-tumour.svg",
  },
  {
    name: "Aneurysm surgery",
    detail: "Vascular treatment is assessed individually by a neurosurgeon.",
    image: "/aneurysm.svg",
  },
  {
    name: "Pituitary surgery",
    detail: "A personal plan follows review of your scans and reports.",
    image: "/Pituitary.svg",
  },
  {
    name: "Other neurosurgery",
    detail: "If your procedure is not listed, send your reports. Pricing follows specialist assessment.",
    image: "",
  },
] as const;
