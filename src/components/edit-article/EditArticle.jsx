import React from 'react';
import { useLocation } from 'react-router-dom';
import CreateArticle from '../create-new-article/CreateArticle';

const EditArticle = () => {
  const location = useLocation();
  const { article } = location.state || {};
  return <CreateArticle mode="edit" initialData={article} articleSlug={article.slug} />;
};

export default EditArticle;
