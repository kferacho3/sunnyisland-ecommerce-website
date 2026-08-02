import Link from "next/link";

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  association: string;
  image: string;
}

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div className="flex flex-col space-y-4">
      {articles.map((article) => (
        <div
          key={article.id}
          className="flex border overflow-hidden shadow hover:shadow-lg transition"
        >
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            <img
              src={article.image} // using article.image now
              alt={article.title}
              className="w-32 h-32 object-cover cursor-pointer"
            />
          </Link>
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {article.association}
              </p>
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-700">{article.description}</p>
            </div>
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              <button className="bg-red-500 text-white mt-4 px-3 py-1 hover:bg-red-600 transition">
                READ MORE
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
