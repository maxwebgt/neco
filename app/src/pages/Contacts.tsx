
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 5000);
  };

  return (
    <>
      <Helmet>
        <title>Контакты | ECO.VERY — Эко-магазин натуральных товаров</title>
        <meta 
          name="description" 
          content="Свяжитесь с нами! Адреса магазинов, телефоны, время работы, форма обратной связи и социальные сети ECO.VERY." 
        />
      </Helmet>

      <div className="bg-eco-milky py-12">
        <div className="container">
          <h1 className="text-4xl font-serif text-eco-green mb-6">Контакты</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                <h2 className="text-2xl font-serif mb-6 text-eco-brown">Наши контакты</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Адрес</h3>
                    <p className="text-gray-700">г. Москва, ул. Экологическая, 123</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Телефон</h3>
                    <p>
                      <a href="tel:+74951234567" className="text-eco-terracotta hover:underline">
                        +7 (495) 123-45-67
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Email</h3>
                    <p>
                      <a href="mailto:info@eco-very.ru" className="text-eco-terracotta hover:underline">
                        info@eco-very.ru
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Режим работы</h3>
                    <p className="text-gray-700">Пн-Пт: 10:00-20:00</p>
                    <p className="text-gray-700">Сб-Вс: 11:00-18:00</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-serif mb-6 text-eco-brown">Мы в соцсетях</h2>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://t.me/ecovery" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-5 w-5 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.01 10.46 14.01 10.36 13.95 10.31C13.89 10.26 13.8 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.53 13.08C9.1 13.37 8.72 13.51 8.38 13.5C8 13.5 7.27 13.29 6.73 13.11C6.07 12.89 5.55 12.78 5.59 12.42C5.62 12.23 5.87 12.04 6.35 11.84C9.25 10.57 11.15 9.72 12.05 9.3C14.61 8.12 15.14 7.93 15.5 7.93C15.58 7.93 15.75 7.95 15.86 8.04C15.95 8.12 15.98 8.23 15.99 8.31C15.98 8.37 16 8.52 16 8.67L16.64 8.8Z"/>
                    </svg>
                    Telegram
                  </a>
                  
                  <a 
                    href="https://vk.com/ecovery" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-5 w-5 text-[#4C75A3]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93V15.07C2 20.67 3.33 22 8.93 22H15.07C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2ZM18.15 16.27H16.69C16.14 16.27 15.97 15.82 14.86 14.72C13.86 13.77 13.49 13.64 13.25 13.64C12.93 13.64 12.85 13.72 12.85 14.17V15.67C12.85 16.02 12.75 16.27 11.55 16.27C9.84 16.27 7.97 15.35 6.69 13.53C4.8 10.9 4.3 8.87 4.3 8.47C4.3 8.27 4.38 8.09 4.78 8.09H6.24C6.6 8.09 6.75 8.24 6.9 8.62C7.79 11.07 9.19 13.17 9.75 13.17C9.94 13.17 10.02 13.09 10.02 12.57V10.27C9.97 9.2 9.52 9.12 9.52 8.77C9.52 8.63 9.64 8.47 9.83 8.47H12.06C12.37 8.47 12.5 8.64 12.5 9.02V12.02C12.5 12.33 12.65 12.46 12.75 12.46C12.94 12.46 13.11 12.33 13.46 11.99C14.59 10.77 15.4 8.92 15.4 8.92C15.5 8.74 15.68 8.57 16.04 8.57H17.5C17.89 8.57 18 8.79 17.89 9.14C17.68 10.03 16.25 12.05 16.25 12.05C16.12 12.27 16.07 12.38 16.25 12.6C16.38 12.78 16.8 13.12 17.07 13.42C17.68 14.05 18.16 14.57 18.28 14.9C18.42 15.22 18.27 15.47 17.9 15.47L18.15 16.27Z"/>
                    </svg>
                    ВКонтакте
                  </a>
                  
                  <a 
                    href="https://wa.me/79001234567" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-5 w-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.6 14C16.4 13.9 15.1 13.3 14.9 13.2C14.7 13.1 14.5 13.1 14.3 13.3C14.1 13.5 13.7 14.1 13.5 14.3C13.4 14.5 13.2 14.5 13 14.4C12.3 14.1 11.6 13.7 11 13.2C10.5 12.7 10 12.1 9.6 11.5C9.5 11.3 9.6 11.1 9.7 11C9.8 10.9 9.9 10.7 10.1 10.6C10.2 10.5 10.3 10.3 10.3 10.2C10.4 10.1 10.4 9.9 10.3 9.8C10.2 9.7 9.7 8.5 9.5 8.1C9.3 7.5 9.1 7.5 8.9 7.5C8.8 7.5 8.6 7.5 8.4 7.5C8.2 7.5 7.9 7.6 7.7 7.8C7.5 8 6.8 8.7 6.8 9.8C6.9 10.4 7.1 11 7.5 11.5C8.5 13.1 9.7 14.4 11.2 15.3C11.7 15.5 12.1 15.7 12.6 15.8C13.1 15.9 13.6 16 14.1 15.9C14.7 15.8 15.2 15.3 15.5 14.7C15.7 14.3 15.7 13.9 15.6 13.5C15.6 13.4 15.5 13.3 15.4 13.3C15.1 13.2 16.6 14 16.6 14ZM12.2 18.9C10.8 18.9 9.5 18.5 8.3 17.7L8 17.5L5.3 18.2L6 15.6L5.8 15.3C4.1 12.7 4.3 9.3 6.3 7C8.3 4.7 11.7 4.2 14.2 5.8C16.7 7.4 17.5 10.7 16.1 13.3C15.1 15.1 13.7 16.3 12.2 18.9ZM17.4 4.6C14.9 2.2 11.3 1.5 8.1 2.7C4.9 3.9 2.7 7.2 2.9 10.7C2.9 12.2 3.3 13.7 4.1 15L3 19.5L7.6 18.4C9.1 19.2 10.8 19.6 12.4 19.6C16.5 19.5 20.1 16.4 20.7 12.4C21.2 8.9 19.8 5.4 17.4 4.6Z"/>
                    </svg>
                    WhatsApp
                  </a>
                  
                  <a 
                    href="https://instagram.com/ecovery" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-5 w-5 text-[#E1306C]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif mb-6 text-eco-brown">Напишите нам</h2>
              
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-medium text-green-800 mb-2">Сообщение отправлено!</h3>
                  <p className="text-green-700">
                    Спасибо за ваше сообщение. Мы ответим вам в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium">
                      Ваше имя <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-1 font-medium">
                      Тема сообщения
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Тема вашего сообщения"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1 font-medium">
                      Сообщение <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Напишите ваше сообщение здесь..."
                      rows={6}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-eco-terracotta hover:bg-eco-terracotta/90 w-full sm:w-auto"
                  >
                    Отправить сообщение
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
          
          <div className="mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif mb-6 text-eco-brown">Как нас найти</h2>
              <div className="aspect-[16/9] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.3685857856617!2d37.6244797768162!3d55.75363997307739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2sThe%20Kremlin!5e0!3m2!1sen!2sru!4v1682513152393!5m2!1sen!2sru"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Расположение магазина ECO.VERY на карте"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
