import type { Metadata } from "next";
import Script from "next/script";
import { company, companyLegalLine } from "@/lib/company";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || company.websiteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `Joint Replacement in India | ${company.brand}`,
  description: `Get a treatment plan for knee or hip replacement in Hyderabad, India. International patient coordination, travel support and transparent package estimates from ${company.brand}.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Joint Replacement in India | ${company.brand}`,
    description:
      "Explore knee and hip replacement treatment options in India with coordinated care for international patients.",
    url: siteUrl,
    siteName: company.brand,
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: company.brand,
  legalName: company.legalEntity,
  alternateName: [company.tradeName, company.brand],
  url: company.websiteUrl,
  email: company.contactEmail,
  taxID: company.gstin,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Behind Sai Ram Theater, 13-1/37, Sai Ram Theater Road, Sai Puri Colony",
    addressLocality: "Secunderabad",
    addressRegion: "Telangana",
    postalCode: "500047",
    addressCountry: "IN",
  },
  description: companyLegalLine,
};

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KVTGKN47');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KVTGKN47"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        {recaptchaSiteKey ? (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
