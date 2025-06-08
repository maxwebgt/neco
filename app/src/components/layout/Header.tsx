
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-eco-milky shadow-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-eco-green font-serif">
              ECO.VERY
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-eco-brown hover:text-eco-terracotta transition-colors duration-200">
            Главная
          </Link>
          <Link to="/catalog" className="text-eco-brown hover:text-eco-terracotta transition-colors duration-200">
            Каталог
          </Link>
          <Link to="/mission" className="text-eco-brown hover:text-eco-terracotta transition-colors duration-200">
            Миссия
          </Link>
          <Link to="/blog" className="text-eco-brown hover:text-eco-terracotta transition-colors duration-200">
            Блог
          </Link>
          <Link to="/contacts" className="text-eco-brown hover:text-eco-terracotta transition-colors duration-200">
            Контакты
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            asChild 
            className="bg-eco-terracotta hover:bg-eco-terracotta/90 text-white font-medium hidden sm:flex items-center"
          >
            <Link to="/catalog">
              СМОТРЕТЬ КАТАЛОГ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Link 
            to="/cart" 
            className="p-2 rounded-full bg-eco-green/10 hover:bg-eco-green/20 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-eco-green" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
