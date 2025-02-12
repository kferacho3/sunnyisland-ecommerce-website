import Link from "next/link";

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  association: string;
  image: string;
}

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div
          key={article.id}
          className="border rounded overflow-hidden shadow hover:shadow-lg transition"
        >
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            <img
              src={article.image} // using article.image now
              alt={article.title}
              className="w-full h-48 object-cover cursor-pointer"
            />
          </Link>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-1">{article.association}</p>
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-4">{article.description}</p>
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                READ MORE
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleGrid;
