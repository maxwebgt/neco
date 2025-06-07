
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-eco-green py-12 text-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">ECO.VERY</h3>
            <p className="text-sm text-white/80 mb-4">
              Эко-магазин натуральных товаров без пластика и химии
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://vk.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="ВКонтакте"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93V15.07C2 20.67 3.33 22 8.93 22H15.07C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2ZM18.15 16.27H16.69C16.14 16.27 15.97 15.82 14.86 14.72C13.86 13.77 13.49 13.64 13.25 13.64C12.93 13.64 12.85 13.72 12.85 14.17V15.67C12.85 16.02 12.75 16.27 11.55 16.27C9.84 16.27 7.97 15.35 6.69 13.53C4.8 10.9 4.3 8.87 4.3 8.47C4.3 8.27 4.38 8.09 4.78 8.09H6.24C6.6 8.09 6.75 8.24 6.9 8.62C7.79 11.07 9.19 13.17 9.75 13.17C9.94 13.17 10.02 13.09 10.02 12.57V10.27C9.97 9.2 9.52 9.12 9.52 8.77C9.52 8.63 9.64 8.47 9.83 8.47H12.06C12.37 8.47 12.5 8.64 12.5 9.02V12.02C12.5 12.33 12.65 12.46 12.75 12.46C12.94 12.46 13.11 12.33 13.46 11.99C14.59 10.77 15.4 8.92 15.4 8.92C15.5 8.74 15.68 8.57 16.04 8.57H17.5C17.89 8.57 18 8.79 17.89 9.14C17.68 10.03 16.25 12.05 16.25 12.05C16.12 12.27 16.07 12.38 16.25 12.6C16.38 12.78 16.8 13.12 17.07 13.42C17.68 14.05 18.16 14.57 18.28 14.9C18.42 15.22 18.27 15.47 17.9 15.47L18.15 16.27Z"/>
                </svg>
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Telegram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.01 10.46 14.01 10.36 13.95 10.31C13.89 10.26 13.8 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.53 13.08C9.1 13.37 8.72 13.51 8.38 13.5C8 13.5 7.27 13.29 6.73 13.11C6.07 12.89 5.55 12.78 5.59 12.42C5.62 12.23 5.87 12.04 6.35 11.84C9.25 10.57 11.15 9.72 12.05 9.3C14.61 8.12 15.14 7.93 15.5 7.93C15.58 7.93 15.75 7.95 15.86 8.04C15.95 8.12 15.98 8.23 15.99 8.31C15.98 8.37 16 8.52 16 8.67L16.64 8.8Z"/>
                </svg>
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.6 14C16.4 13.9 15.1 13.3 14.9 13.2C14.7 13.1 14.5 13.1 14.3 13.3C14.1 13.5 13.7 14.1 13.5 14.3C13.4 14.5 13.2 14.5 13 14.4C12.3 14.1 11.6 13.7 11 13.2C10.5 12.7 10 12.1 9.6 11.5C9.5 11.3 9.6 11.1 9.7 11C9.8 10.9 9.9 10.7 10.1 10.6C10.2 10.5 10.3 10.3 10.3 10.2C10.4 10.1 10.4 9.9 10.3 9.8C10.2 9.7 9.7 8.5 9.5 8.1C9.3 7.5 9.1 7.5 8.9 7.5C8.8 7.5 8.6 7.5 8.4 7.5C8.2 7.5 7.9 7.6 7.7 7.8C7.5 8 6.8 8.7 6.8 9.8C6.9 10.4 7.1 11 7.5 11.5C8.5 13.1 9.7 14.4 11.2 15.3C11.7 15.5 12.1 15.7 12.6 15.8C13.1 15.9 13.6 16 14.1 15.9C14.7 15.8 15.2 15.3 15.5 14.7C15.7 14.3 15.7 13.9 15.6 13.5C15.6 13.4 15.5 13.3 15.4 13.3C15.1 13.2 16.6 14 16.6 14ZM12.2 18.9C10.8 18.9 9.5 18.5 8.3 17.7L8 17.5L5.3 18.2L6 15.6L5.8 15.3C4.1 12.7 4.3 9.3 6.3 7C8.3 4.7 11.7 4.2 14.2 5.8C16.7 7.4 17.5 10.7 16.1 13.3C15.1 15.1 13.7 16.3 12.2 18.9ZM17.4 4.6C14.9 2.2 11.3 1.5 8.1 2.7C4.9 3.9 2.7 7.2 2.9 10.7C2.9 12.2 3.3 13.7 4.1 15L3 19.5L7.6 18.4C9.1 19.2 10.8 19.6 12.4 19.6C16.5 19.5 20.1 16.4 20.7 12.4C21.2 8.9 19.8 5.4 17.4 4.6Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">Главная</Link></li>
              <li><Link to="/catalog" className="opacity-80 hover:opacity-100 transition-opacity">Каталог</Link></li>
              <li><Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">О нас</Link></li>
              <li><Link to="/mission" className="opacity-80 hover:opacity-100 transition-opacity">Миссия</Link></li>
              <li><Link to="/blog" className="opacity-80 hover:opacity-100 transition-opacity">Блог</Link></li>
              <li><Link to="/contacts" className="opacity-80 hover:opacity-100 transition-opacity">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Правовая информация</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="opacity-80 hover:opacity-100 transition-opacity">Политика конфиденциальности</Link></li>
              <li><Link to="/terms" className="opacity-80 hover:opacity-100 transition-opacity">Условия использования</Link></li>
              <li><Link to="/shipping" className="opacity-80 hover:opacity-100 transition-opacity">Доставка и оплата</Link></li>
              <li><Link to="/refund" className="opacity-80 hover:opacity-100 transition-opacity">Возврат и обмен</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Контакты</h4>
            <ul className="space-y-2">
              <li className="opacity-80">г. Москва, ул. Экологическая, 123</li>
              <li>
                <a href="tel:+74951234567" className="opacity-80 hover:opacity-100 transition-opacity">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@eco-very.ru" className="opacity-80 hover:opacity-100 transition-opacity">
                  info@eco-very.ru
                </a>
              </li>
              <li className="opacity-80">Пн-Пт: 10:00-20:00</li>
              <li className="opacity-80">Сб-Вс: 11:00-18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 text-sm opacity-80 text-center">
          <p>© {new Date().getFullYear()} ECO.VERY. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
