import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Tech Yantra | Full-Stack Software Studio", 
  description = "Instruments for precision-built business. We design and ship production software — web platforms, AI products, ERP and CRM systems.", 
  keywords = "software studio, full-stack development, Tech Yantra, AI products, ERP, CRM, MERN stack, Next.js, web development, India",
  url = "https://techyantra.org/",
  type = "website",
  schemaType = "SoftwareApplication",
  schemaDescription = "Full-stack software studio building web, AI, ERP, and CRM products end-to-end.",
  isCollection = false
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": title,
    "description": schemaDescription,
    "url": url,
    ...(isCollection ? {} : {
      "applicationCategory": "BusinessApplication",
      "provider": {
        "@type": "Organization",
        "name": "Tech Yantra",
        "email": "info@techyantra.org",
        "location": {
          "@type": "Place",
          "address": "Noida, India"
        }
      }
    })
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@TechYantra" />

      <link rel="canonical" href={url} />
      
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
