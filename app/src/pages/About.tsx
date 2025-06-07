
import { Helmet } from "react-helmet";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Helmet>
        <title>О нас | ECO.VERY — Эко-магазин натуральных товаров</title>
        <meta 
          name="description" 
          content="Узнайте историю создания ECO.VERY, наши ценности и принципы. Мы помогаем делать мир чище с каждой покупкой." 
        />
      </Helmet>

      <div className="bg-eco-milky py-12">
        <div className="container">
          <h1 className="text-4xl font-serif text-eco-green mb-6">О нас</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div 
                className="h-96 lg:h-auto bg-center bg-cover"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80')" }}
              ></div>
              <div className="p-8 lg:p-12">
                <h2 className="text-2xl font-serif mb-6 text-eco-brown">Наша история</h2>
                <p className="mb-4 text-gray-700">
                  ECO.VERY был основан в 2019 году группой единомышленников, обеспокоенных растущим количеством пластиковых отходов и химических загрязнений.
                </p>
                <p className="mb-4 text-gray-700">
                  Мы начали с маленького онлайн-магазина, предлагая альтернативы обычным пластиковым товарам. Сегодня ECO.VERY — это растущее сообщество людей, которые осознанно выбирают экологичный образ жизни.
                </p>
                <p className="text-gray-700">
                  Наша команда постоянно ищет и тестирует новые экологичные продукты, чтобы предложить вам только самое лучшее. Мы не просто продаем товары — мы создаем культуру осознанного потребления.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-serif mb-4 text-eco-brown">Наши ценности</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-terracotta rounded-full mt-2 mr-3"></span>
                  <span>Забота об окружающей среде и будущих поколениях</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-terracotta rounded-full mt-2 mr-3"></span>
                  <span>Качество, долговечность и экологичность продукции</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-terracotta rounded-full mt-2 mr-3"></span>
                  <span>Прозрачность в составе и производстве товаров</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-terracotta rounded-full mt-2 mr-3"></span>
                  <span>Поддержка локальных производителей и мастеров</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-serif mb-4 text-eco-brown">Наша команда</h3>
              <p className="mb-6 text-gray-700">
                Мы — команда энтузиастов, объединенных общими ценностями и любовью к природе. В нашей команде есть:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-green rounded-full mt-2 mr-3"></span>
                  <span>Экологи и биологи</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-green rounded-full mt-2 mr-3"></span>
                  <span>Дизайнеры и инженеры</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-green rounded-full mt-2 mr-3"></span>
                  <span>Мастера ручной работы</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-green rounded-full mt-2 mr-3"></span>
                  <span>Эксперты по sustainable-технологиям</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-serif mb-4 text-eco-brown">Наши достижения</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-brown rounded-full mt-2 mr-3"></span>
                  <span>Более 15,000 клиентов по всей России</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-brown rounded-full mt-2 mr-3"></span>
                  <span>Сэкономлено более 15 тонн пластика</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-brown rounded-full mt-2 mr-3"></span>
                  <span>Организовано 50+ эко-воркшопов и мастер-классов</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-eco-brown rounded-full mt-2 mr-3"></span>
                  <span>Победитель премии "Лучший эко-бизнес 2022"</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 bg-eco-green rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-serif mb-4">Присоединяйтесь к нашему эко-движению!</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Начните свой путь к более экологичному образу жизни вместе с нами. Каждая маленькая замена имеет значение!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-eco-terracotta hover:bg-eco-terracotta/90">
                <Link to="/catalog">
                  Перейти в каталог
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/mission">
                  Узнать о нашей миссии
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
