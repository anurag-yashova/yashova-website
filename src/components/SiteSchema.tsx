const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://yashova.com/#organization",
      name: "Yashova",
      url: "https://yashova.com",
      logo: "https://yashova.com/icon-512.png",
      image: "https://yashova.com/og-image.png",
      description:
        "Growth and performance marketing agency in Faridabad, Delhi NCR. Strategy, funnels, landing pages, AI integration, WhatsApp automation, Meta Ads, Google Ads and lead generation.",
      slogan: "Not Loud. Unignorable.",
      email: "anurag@yashova.com",
      telephone: "+91-98180-86846",
      priceRange: "₹₹",
      founder: { "@type": "Person", name: "Anurag Sharma" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "741, Sector-23",
        addressLocality: "Faridabad",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Faridabad" },
        { "@type": "City", name: "Delhi" },
        { "@type": "City", name: "Gurgaon" },
        { "@type": "City", name: "Noida" },
        { "@type": "Country", name: "India" },
      ],
      sameAs: [
        "https://www.linkedin.com/company/yashova",
        "https://www.instagram.com/yashova.in",
        "https://www.facebook.com/yashova.in",
      ],
      knowsAbout: [
        "Performance marketing",
        "Marketing strategy",
        "Funnel building",
        "Landing pages",
        "AI integration",
        "Meta Ads",
        "Google Ads",
        "Lead generation",
        "Conversion rate optimisation",
        "WhatsApp automation",
        "Meta Conversion API",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://yashova.com/#website",
      url: "https://yashova.com",
      name: "Yashova",
      publisher: { "@id": "https://yashova.com/#organization" },
    },
  ],
};

export default function SiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
