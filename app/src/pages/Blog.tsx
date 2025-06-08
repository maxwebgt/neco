
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imagePrompt: string;
  date: string;
  dateFormatted: string;
  author: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 простых способов уменьшить количество пластика в доме",
    excerpt: "Узнайте, как легко и постепенно заменить пластиковые предметы в вашем доме на экологичные аналоги без стресса и больших затрат.",
    imagePrompt: "Экологичные альтернативы пластику, стеклянные контейнеры, многоразовые сумки, bamboo зубные щетки",
    date: "2024-04-15",
    dateFormatted: "15 апреля 2024",
    author: "Екатерина Эколог",
    readTime: "7 мин",
    tags: ["Пластик", "Zero-waste", "Дом", "Советы"]
  },
  {
    id: 2,
    title: "Как правильно сортировать мусор: подробное руководство 2024",
    excerpt: "Разбираемся в видах отходов и правилах их сортировки для максимально эффективной переработки в современных условиях.",
    imagePrompt: "Контейнеры для сортировки мусора разных цветов, знаки переработки, правильно отсортированные отходы",
    date: "2024-03-02",
    dateFormatted: "2 марта 2024",
    author: "Михаил Сортировщик",
    readTime: "9 мин",
    tags: ["Переработка", "Сортировка", "Отходы", "Руководство"]
  },
  {
    id: 3,
    title: "Натуральная косметика: мифы и реальность",
    excerpt: "Разбираемся, что такое натуральная косметика, как её выбирать и почему она лучше для вас и планеты.",
    imagePrompt: "Натуральная косметика, твердые шампуни, органические ингредиенты, эко-упаковка",
    date: "2024-02-18",
    dateFormatted: "18 февраля 2024",
    author: "Анна Красоткина",
    readTime: "6 мин",
    tags: ["Косметика", "Натуральное", "Красота", "Здоровье"]
  },
  {
    id: 4,
    title: "Как организовать zero-waste кухню",
    excerpt: "Практические советы по минимизации отходов на кухне и организации экологичного пространства.",
    imagePrompt: "Zero-waste кухня, стеклянные банки, многоразовые контейнеры, минимум упаковок",
    date: "2024-01-05",
    dateFormatted: "5 января 2024",
    author: "Дмитрий Минималист",
    readTime: "8 мин",
    tags: ["Zero-waste", "Кухня", "Организация", "Минимализм"]
  },
  {
    id: 5,
    title: "Экологичная уборка: чем заменить бытовую химию",
    excerpt: "Простые и доступные средства для уборки дома, которые не наносят вред природе и вашему здоровью.",
    imagePrompt: "Натуральные чистящие средства, сода, уксус, лимон, эко-средства для уборки",
    date: "2022-12-20",
    dateFormatted: "20 декабря 2022",
    author: "Ольга Чистюлина",
    readTime: "5 мин",
    tags: ["Уборка", "Бытовая химия", "Натуральное", "Здоровье"]
  },
  {
    id: 6,
    title: "Эко-подарки: идеи для осознанных презентов",
    excerpt: "Как выбрать подарок, который будет приятен близким и одновременно безопасен для окружающей среды.",
    imagePrompt: "Эко-подарки, подарки в крафтовой упаковке, растения, handmade подарки",
    date: "2022-11-10",
    dateFormatted: "10 ноября 2022",
    author: "Мария Дарительница",
    readTime: "6 мин",
    tags: ["Подарки", "Праздники", "Осознанность", "Устойчивость"]
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
                <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-center p-4">
                  <div className="text-sm text-gray-600">
                    <strong>ПРОМТ ДЛЯ КАРТИНКИ:</strong><br/>
                    {post.imagePrompt}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{post.dateFormatted}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
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
