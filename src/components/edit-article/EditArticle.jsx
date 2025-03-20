import { useLocation, useNavigate } from 'react-router-dom';
import CreateArticle from '../create-new-article/CreateArticle';
import { useEffect } from 'react';

const EditArticle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {};

  useEffect(() => {
    if (!article) {
      console.error('Пустой массив');
      navigate('/');
    }
  }, [article, navigate]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return <CreateArticle mode="edit" initialData={article} articleSlug={article.slug} />;
};

export default EditArticle;
