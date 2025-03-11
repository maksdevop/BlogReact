import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './MoreInfoPage.module.css';
import { useSelector } from 'react-redux';
import { useGetArticleBySlugQuery, useDeleteArticleMutation } from '../../store/apiSlice';

const MoreInfoPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: articleData, isLoading, isError } = useGetArticleBySlugQuery(slug);
  const [deleteArticle] = useDeleteArticleMutation();
  const currentUser = useSelector((state) => state.registration.user);

  const handleDelete = async () => {
    try {
      await deleteArticle(slug).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Ошибка удаления статьи:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/editArticle/${slug}`, { state: { article: articleData?.article } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !articleData) {
    return <div>Error loading article</div>;
  }

  const { title, author, createdAt, tagList, description, body } = articleData.article;

  return (
    <div className={styles.article}>
      <div className={styles.wrap}>
        <h1 className={styles.articleTitle}>{title}</h1>
        <div className={styles.articleAuthor}>
          <div>
            <h4>{author.username}</h4>
            <p>
              {new Date(createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <img className={styles.articleUserImg} src={author.image} alt="Author" />
        </div>
      </div>
      <div className={styles.tags}>
        {tagList.map((tag, index) => (
          <button key={index} className={styles.articleTags}>
            {tag}
          </button>
        ))}
      </div>
      <div className={styles.articleChange}>
        <p className={styles.description}>{description}</p>
        {currentUser?.userName === author.username && (
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
      <ReactMarkdown className={styles.body}>{body}</ReactMarkdown>
    </div>
  );
};

export default MoreInfoPage;
