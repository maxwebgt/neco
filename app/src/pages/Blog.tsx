
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 простых способов уменьшить количество пластика в вашем доме",
    excerpt: "Узнайте, как легко и постепенно заменить пластиковые предметы в вашем доме на экологичные аналоги.",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80",
    date: "15 апреля 2023",
    author: "Екатерина",
    tags: ["Пластик", "Советы", "Эко-привычки"]
  },
  {
    id: 2,
    title: "Как правильно сортировать мусор: подробное руководство",
    excerpt: "Разбираемся в видах отходов и правилах их сортировки для максимально эффективной переработки.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80",
    date: "2 марта 2023",
    author: "Михаил",
    tags: ["Переработка", "Сортировка", "Руководство"]
  },
  {
    id: 3,
    title: "Натуральная косметика: мифы и реальность",
    excerpt: "Разбираемся, что такое натуральная косметика, как её выбирать и почему она лучше для вас и планеты.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80",
    date: "18 февраля 2023",
    author: "Анна",
    tags: ["Косметика", "Натуральное", "Красота"]
  },
  {
    id: 4,
    title: "Как организовать zero-waste кухню",
    excerpt: "Практические советы по минимизации отходов на кухне и организации экологичного пространства.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80",
    date: "5 января 2023",
    author: "Дмитрий",
    tags: ["Zero-waste", "Кухня", "Организация"]
  },
  {
    id: 5,
    title: "Экологичная уборка: чем заменить бытовую химию",
    excerpt: "Простые и доступные средства для уборки дома, которые не наносят вред природе и вашему здоровью.",
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80",
    date: "20 декабря 2022",
    author: "Ольга",
    tags: ["Уборка", "Бытовая химия", "Натуральное"]
  },
  {
    id: 6,
    title: "Эко-подарки: идеи для осознанных презентов",
    excerpt: "Как выбрать подарок, который будет приятен близким и одновременно безопасен для окружающей среды.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80",
    date: "10 ноября 2022",
    author: "Мария",
    tags: ["Подарки", "Праздники", "Осознанность"]
  }
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Блог | ECO.VERY — Эко-магазин натуральных товаров</title>
        <meta 
          name="description" 
          content="Полезные статьи об экологичном образе жизни, советы по уменьшению экологического следа и руководства по использованию эко-товаров." 
        />
      </Helmet>

      <div className="bg-eco-milky py-12">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-serif text-eco-green mb-4">Эко-блог</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Полезные статьи об экологичном образе жизни, советы и руководства по использованию эко-товаров.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div 
                key={post.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="h-48 w-full object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="text-xl font-serif mb-3 text-eco-brown">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-auto text-eco-green border-eco-green hover:bg-eco-green hover:text-white"
                  >
                    <Link to={`/blog/${post.id}`}>
                      Читать полностью
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-serif mb-4 text-eco-brown">Подпишитесь на наш блог</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Получайте новые статьи, советы по эко-лайфстайлу и специальные предложения на вашу почту.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <Button className="bg-eco-terracotta hover:bg-eco-terracotta/90 whitespace-nowrap">
                Подписаться
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
