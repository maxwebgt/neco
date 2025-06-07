
import { Helmet } from "react-helmet";
import { ArrowRight, Leaf, RotateCw, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Mission = () => {
  return (
    <>
      <Helmet>
        <title>Наша миссия | ECO.VERY — Эко-магазин натуральных товаров</title>
        <meta 
          name="description" 
          content="Наша миссия — сделать экологичный образ жизни доступным для каждого. Узнайте о наших целях и принципах устойчивого развития." 
        />
      </Helmet>

      <div 
        className="min-h-[400px] bg-cover bg-center flex items-center justify-center relative"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80')" 
        }}
      >
        <div className="container text-center text-white">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Наша миссия</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Сделать экологичный образ жизни простым, доступным и привлекательным для каждого.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-serif mb-6 text-eco-green">Почему это важно?</h2>
          <p className="text-lg text-gray-700 mb-4">
            Каждый год в океаны попадают миллионы тонн пластиковых отходов. Химические вещества в бытовых средствах загрязняют воду и почву. Массовое потребление истощает природные ресурсы.
          </p>
          <p className="text-lg text-gray-700">
            Мы верим, что маленькие изменения в повседневной жизни каждого человека могут привести к глобальным положительным изменениям для нашей планеты.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-eco-green/10 rounded-full mb-6">
              <Leaf className="h-8 w-8 text-eco-green" />
            </div>
            <h3 className="text-xl font-serif mb-3 text-eco-brown">Натуральность</h3>
            <p className="text-gray-600">
              Мы отбираем товары из натуральных материалов, безопасных для человека и природы. Никаких токсичных химикатов и синтетических добавок.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-eco-green/10 rounded-full mb-6">
              <RotateCw className="h-8 w-8 text-eco-green" />
            </div>
            <h3 className="text-xl font-serif mb-3 text-eco-brown">Многоразовость</h3>
            <p className="text-gray-600">
              Мы продвигаем культуру многоразового использования вместо одноразового потребления. Наши товары служат годами, а не минутами.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-eco-green/10 rounded-full mb-6">
              <HandHeart className="h-8 w-8 text-eco-green" />
            </div>
            <h3 className="text-xl font-serif mb-3 text-eco-brown">Этичность</h3>
            <p className="text-gray-600">
              Мы поддерживаем этичное производство, справедливую оплату труда и заботимся о благополучии всех участников нашей цепочки поставок.
            </p>
          </div>
        </div>

        <div className="bg-eco-milky p-8 md:p-12 rounded-lg shadow-md">
          <h2 className="text-3xl font-serif mb-8 text-eco-green text-center">Наши цели до 2030 года</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-serif mb-4 text-eco-brown flex items-center">
                  <span className="w-8 h-8 rounded-full bg-eco-terracotta text-white flex items-center justify-center mr-3">1</span>
                  Увеличить осведомленность
                </h3>
                <p className="text-gray-700 ml-11">
                  Обучить более 1 миллиона человек принципам устойчивого развития и экологичного образа жизни через наши обучающие материалы, воркшопы и мастер-классы.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-serif mb-4 text-eco-brown flex items-center">
                  <span className="w-8 h-8 rounded-full bg-eco-terracotta text-white flex items-center justify-center mr-3">2</span>
                  Сократить использование пластика
                </h3>
                <p className="text-gray-700 ml-11">
                  Помочь нашим клиентам заменить 100 тонн одноразовых пластиковых товаров на многоразовые экологичные альтернативы.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-serif mb-4 text-eco-brown flex items-center">
                  <span className="w-8 h-8 rounded-full bg-eco-terracotta text-white flex items-center justify-center mr-3">3</span>
                  Развивать местные сообщества
                </h3>
                <p className="text-gray-700 ml-11">
                  Поддержать 100+ локальных ремесленников и малых предприятий, производящих экологичные товары, обеспечивая им стабильный доход.
                </p>
              </div>
            </div>
            
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-serif mb-4 text-eco-brown flex items-center">
                  <span className="w-8 h-8 rounded-full bg-eco-terracotta text-white flex items-center justify-center mr-3">4</span>
                  Внедрить замкнутый цикл
                </h3>
                <p className="text-gray-700 ml-11">
                  Создать систему замкнутого цикла для 80% нашей продукции, где использованные товары могут быть переработаны или компостированы.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-serif mb-4 text-eco-brown flex items-center">
                  <span className="w-8 h-8 rounded-full bg-eco-terracotta text-white flex items-center justify-center mr-3">5</span>
                  Углеродная нейтральность
                </h3>
                <p className="text-gray-700 ml-11">
                  Достичь углеродной нейтральности во всех аспектах нашего бизнеса, от производства до доставки, и компенсировать имеющийся углеродный след.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-serif mb-4 text-eco-brown flex items-center">
                  <span className="w-8 h-8 rounded-full bg-eco-terracotta text-white flex items-center justify-center mr-3">6</span>
                  Инновации в упаковке
                </h3>
                <p className="text-gray-700 ml-11">
                  Разработать и внедрить полностью биоразлагаемую или многоразовую упаковку для 100% нашей продукции.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-serif mb-6 text-eco-green">Присоединяйтесь к нам!</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Каждая ваша покупка в ECO.VERY — это вклад в сохранение нашей планеты. Вместе мы делаем мир чище и уменьшаем свой экологический след.
          </p>
          <Button asChild size="lg" className="bg-eco-terracotta hover:bg-eco-terracotta/90">
            <Link to="/catalog">
              Начать свой эко-путь
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Mission;
