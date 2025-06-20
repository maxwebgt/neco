
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Екатерина",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    text: "Перешла на эко-средства для уборки месяц назад и заметила, что кожа рук перестала сохнуть. Очень довольна качеством продукции!",
    rating: 5
  },
  {
    id: 2,
    name: "Александр",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Бамбуковая зубная щетка служит дольше обычной, и не нужно беспокоиться, что пластик попадет в океан. Отличная альтернатива!",
    rating: 5
  },
  {
    id: 3,
    name: "Ольга",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Эко-мешочки всегда с собой в магазине. За полгода ни разу не взяла пластиковый пакет. Очень удобно и приятно осознавать, что делаешь доброе дело.",
    rating: 4
  }
];

const CounterAnimation = ({ target, duration = 2000 }: { target: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [started, target, duration]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
};

const Testimonials = () => {
  return (
    <>
      {/* Отзывы клиентов - горизонтальная секция */}
      <section className="py-16 bg-eco-milky">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-eco-green text-center">
            Что говорят наши клиенты
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={`Аватар ${testimonial.name}`} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Блок про сэкономленный пластик - отдельная горизонтальная секция */}
      <section className="py-16 bg-eco-green">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Вместе мы сэкономили пластика</h2>
            <div className="text-6xl md:text-7xl font-bold font-serif mb-4">
              <CounterAnimation target={15487} />
              <span> кг</span>
            </div>
            <p className="text-xl">И это только начало! Присоединяйтесь к нам, чтобы сделать мир чище.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
