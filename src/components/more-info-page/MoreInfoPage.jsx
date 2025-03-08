import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import styles from './MoreInfoPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteArticleMutation } from '../../store/apiSlice';
const MoreInfoPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.registration.user);
  const navigate = useNavigate();
  const [deleteArticle] = useDeleteArticleMutation(); // Используем мутацию
  const handleDelete = async () => {
    try {
      await deleteArticle(slug).unwrap(); // Удаляем статью по её slug
      navigate('/'); // Перенаправляем на главную страницу после удаления
    } catch (error) {
      console.error('Ошибка удаления статьи:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/editArticle/${article.slug}`, { state: { article } });
  };

  useEffect(() => {
    axios
      .get(`https://blog-platform.kata.academy/api/articles/${slug}`)
      .then((resp) => {
        setArticle(resp.data.article);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading article</div>;
  }

  return (
    <div className={styles.article}>
      <div className={styles.wrap}>
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <div className={styles.articleAuthor}>
          <div>
            <h4>{article.author.username}</h4>
            <p>
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <img className={styles.arcticleUserImg} src={article.author.image} alt="Author" />
        </div>
      </div>
      <div className={styles.tags}>
        {article.tagList.map((tag, index) => (
          <button key={index} className={styles.articleTags}>
            {tag}
          </button>
        ))}
      </div>
      <div className={styles.articleChange}>
        <p className={styles.description}>{article.description}</p>
        {currentUser.userName === article.author.username && (
          <div className={styles.actions}>
            <button className={styles.btnDelete} onClick={handleDelete}>
              Delete
            </button>
            <button className={styles.btnEdit} onClick={handleEdit}>
              Edit
            </button>
          </div>
        )}
      </div>
      <ReactMarkdown className={styles.body}>{article.body}</ReactMarkdown>
    </div>
  );
};

export default MoreInfoPage;
