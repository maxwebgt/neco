
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Выберите эко-товары",
    description: "Замените обычные товары на экологичные альтернативы из нашего каталога."
  },
  {
    number: "02",
    title: "Используйте многоразово",
    description: "Вместо одноразовых вещей используйте товары, которые прослужат вам долгое время."
  },
  {
    number: "03",
    title: "Возвращайте тару",
    description: "Получайте бонусы и скидки за возврат и повторное использование тары."
  }
];

const HowToStart = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-eco-green">
          Как начать?
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex group"
              >
                <div className="flex-shrink-0 mr-6">
                  <div className="w-16 h-16 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-green font-serif text-xl group-hover:bg-eco-green/20 transition-colors">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2 text-eco-brown">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Button className="bg-eco-terracotta hover:bg-eco-terracotta/90">
                Начать сейчас
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-md">
            <div className="relative pb-[56.25%] h-0">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Как начать использовать эко-товары" 
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToStart;
