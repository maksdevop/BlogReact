import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import styles from './MoreInfoPage.module.css';

const MoreInfoPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios.get(`https://blog-platform.kata.academy/api/articles/${slug}`)
      .then(resp => {
        setArticle(resp.data.article);
        setIsLoading(false);
      })
      .catch(error => {
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
                <p>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <img className={styles.arcticleUserImg} src={article.author.image} alt="Author" />
        </div>
      </div>
      <div className={styles.tags}>
        {article.tagList.map((tag, index) => (
          <button key={index} className={styles.articleTags}>{tag}</button>
        ))}
      </div>
      <ReactMarkdown>{article.body}</ReactMarkdown>
      
    </div>
  );
};

export default MoreInfoPage;
