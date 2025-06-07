
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  bgImage: string;
}

const slides: SlideProps[] = [
  {
    title: "Чистота без химии?",
    subtitle: "–10% за свою тару",
    buttonText: "Купить чистящий набор",
    buttonLink: "/catalog/cleaning",
    bgImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80",
  },
  {
    title: "Пакет? — Не надо 🙂",
    subtitle: "Многоразовые эко-мешочки от 299 ₽",
    buttonText: "Смотреть эко-мешочки",
    buttonLink: "/catalog/bags",
    bgImage: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80",
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container h-full flex flex-col justify-center items-start text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 animate-fade-in">
              {slide.title}
            </h2>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in opacity-90">
              {slide.subtitle}
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-eco-terracotta hover:bg-eco-terracotta/90 font-medium animate-fade-in"
            >
              <Link to={slide.buttonLink}>
                {slide.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
