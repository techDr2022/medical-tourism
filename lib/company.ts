export const company = {
  legalEntity: "GORITYALA ABHISTA SAI",
  tradeName: "TechDr",
  constitution: "Sole Proprietorship",
  brand: "Medical Tours India",
  authorizedSignatory: "Ms. Gorityala Abhista Sai",
  authorizedSignatoryTitle: "Proprietor/CEO",
  /** Public site domain (Hostinger / Google Ads destination) */
  website: "healthtourism.techdr.in",
  websiteUrl: "https://healthtourism.techdr.in",
  /** Contact & transactional email domain (different from public site) */
  emailDomain: "medicaltoursindia.com",
  contactEmail: "hi@medicaltoursindia.com",
  noreplyEmail: "noreply@medicaltoursindia.com",
  gstin: "36DEMPG0503M1ZI",
  pan: "DEMPG0503M",
  tan: "HYDA42965G",
  registeredAddress:
    "Behind Sai Ram Theater, 13-1/37, Sai Ram Theater Road, Sai Puri Colony, India – 500047",
  cityLabel: "India",
} as const;

export const companyDisplayName = company.brand;

export const companyLegalLine = `${company.legalEntity} (Trade Name: ${company.tradeName}), ${company.constitution}`;

export const companySignatoryLine = `${company.authorizedSignatory}, ${company.authorizedSignatoryTitle}`;
