import { useLocation, useNavigate } from 'react-router-dom';
import CreateArticle from '../create-new-article/CreateArticle';
import { useEffect } from 'react';

const EditArticle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {}; // Получаем article из state
  console.log(article);
  console.log(location);
  useEffect(() => {
    if (!article) {
      console.error('Article data is missing');
      navigate('/'); // Перенаправляем пользователя на главную, если данные отсутствуют
    }
  }, [article, navigate]);

  if (!article) {
    return <div>Loading...</div>; // Показать что-то вместо ошибки
  }

  return <CreateArticle mode="edit" initialData={article} articleSlug={article.slug} />;
};

export default EditArticle;
