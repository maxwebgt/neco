
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BonusPoints = () => {
  const [points, setPoints] = useState(120); // Example starting points

  return (
    <section className="py-10 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto bg-eco-milky rounded-lg p-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-serif mb-2 text-eco-green">Программа лояльности</h3>
              <p className="text-gray-600 mb-2">
                Возвращайте тару и получайте бонусные баллы! Обменивайте их на скидки и экологичные подарки.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white transition-colors"
              >
                <a href="/loyalty">
                  Узнать больше
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-sm text-gray-600 mb-1">Ваши бонусные баллы</div>
              <div className="text-5xl font-bold text-eco-terracotta mb-2">{points}</div>
              <div className="text-xs text-gray-500">Обменяйте на скидку до 15%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusPoints;
