
import { Leaf, HandHeart, RotateCw } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Без химии",
    description: "Все наши продукты созданы из натуральных компонентов, безопасных для вас и окружающей среды."
  },
  {
    icon: RotateCw,
    title: "Долговечность",
    description: "Наши товары разработаны для многократного использования, снижая количество отходов."
  },
  {
    icon: HandHeart,
    title: "Handmade",
    description: "Каждый продукт создается вручную с любовью и заботой о деталях."
  }
];

const WhyUs = () => {
  return (
    <section className="py-16 bg-eco-milky">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-eco-green">
          Почему мы?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center group"
            >
              <div className="inline-flex items-center justify-center p-4 bg-eco-green/10 rounded-full mb-6 group-hover:bg-eco-green/20 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-eco-green" />
              </div>
              <h3 className="text-xl font-serif mb-3 text-eco-brown">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
