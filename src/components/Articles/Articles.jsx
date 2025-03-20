import { useState } from 'react';
import styles from './Articles.module.css';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { useGetArticlesQuery, useToggleLikeMutation } from '../../store/apiSlice';
import { Spin, Alert } from 'antd';

const Articles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const offset = (currentPage - 1) * 10;
  const { data, error, isLoading } = useGetArticlesQuery({ limit: 10, offset });
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [toggleLike] = useToggleLikeMutation();
  if (data) {
    console.log(data.articles);
  }

  const handleLike = async (slug, isLiked) => {
    try {
      await toggleLike({ slug, isLiked }).unwrap();
    } catch (error) {
      if (error.data?.errors.error.name === 'UnauthorizedError') {
        setErrorMessage('Войдите в систему!');
      }
      console.error('Ошибка при изменении лайка:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <Alert message="Ошибка" description={error.message} type="error" showIcon />
      </div>
    );
  }

  return (
    <>
      {errorMessage && <p style={{ color: 'red', margin: '5px 0' }}>{errorMessage}</p>}
      {data.articles.map((article, index) => (
        <div key={index} className={styles.articles}>
          <div className={styles.articleWrap}>
            <div className={styles.articleTitleWrap}>
              <Link to={`/articles/${article.slug}`} className={styles.articleTitle}>
                {article.title}
              </Link>
              <button
                className={styles.articleFavorite}
                onClick={() => handleLike(article.slug, article.favorited)}
              >
                {article.favorited ? '❤️' : '🤍'} {article.favoritesCount}
              </button>
            </div>
            <div>
              {article.tagList.map((tag, index) => (
                <button key={index} className={styles.articleTags}>
                  {tag}
                </button>
              ))}
            </div>
            <p className={styles.articleText}>{article.description}</p>
          </div>
          <div className={styles.articleUser}>
            <div className={styles.articleUserWrap}>
              <h4 className={styles.articleUserName}>{article.author.username}</h4>
              <p className={styles.articlePostTime}>
                {new Date(article.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <img className={styles.articleUserImg} src={article.author.image} alt="IMAGE" />
          </div>
        </div>
      ))}
      <Pagination
        align="center"
        current={currentPage}
        total={data.articlesCount}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </>
  );
};

export default Articles;
