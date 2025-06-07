
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would normally send the email to your backend
      console.log("Subscribing email:", email);
      setIsSubmitted(true);
      setEmail("");
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section className="py-16 bg-eco-green text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Получай эко-лайфхаки
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Подпишись на нашу рассылку и получай полезные советы по экологичному образу жизни, новости и специальные предложения.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 placeholder:text-white/60 text-white"
              />
              <Button 
                type="submit" 
                className="bg-eco-terracotta hover:bg-eco-terracotta/90 whitespace-nowrap"
              >
                Подписаться
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {isSubmitted && (
              <p className="mt-4 text-green-200">
                Спасибо за подписку! Проверьте вашу почту.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
