import HeroSection from "@/components/sections/HeroSection";
import PromoCarousel from "@/components/sections/PromoCarousel";
import TrustBar from "@/components/sections/TrustBar";
import GuaranteeBlock from "@/components/sections/GuaranteeBlock";
import ProductGrid from "@/components/sections/ProductGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterForm from "@/components/sections/NewsletterForm";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://amarenl.com" },
]);

export default function Home() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} id="home-breadcrumb" />
      <HeroSection />
      <PromoCarousel />
      <TrustBar />
      <GuaranteeBlock />
      <ProductGrid />
      <HowItWorks />
      <Testimonials />
      <BlogPreview />
      <FAQSection />
      <NewsletterForm />
    </>
  );
}
