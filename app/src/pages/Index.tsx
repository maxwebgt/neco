
import { Helmet } from "react-helmet";
import HeroSlider from "@/components/home/HeroSlider";
import WhyUs from "@/components/home/WhyUs";
import FeaturedCatalog from "@/components/home/FeaturedCatalog";
import HowToStart from "@/components/home/HowToStart";
import Testimonials from "@/components/home/Testimonials";
import Subscribe from "@/components/home/Subscribe";
import BonusPoints from "@/components/home/BonusPoints";
import SocialIntegration from "@/components/home/SocialIntegration";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ECO.VERY — Эко-магазин натуральных товаров без пластика и химии</title>
        <meta 
          name="description" 
          content="Купите бамбуковые зубные щётки, многоразовые мешочки, твердое мыло и другие экотовары… –10% за свою тару!" 
        />
      </Helmet>

      <HeroSlider />
      <WhyUs />
      <FeaturedCatalog />
      <HowToStart />
      <Testimonials />
      <BonusPoints />
      <Subscribe />
      <SocialIntegration />
    </>
  );
};

export default Index;
