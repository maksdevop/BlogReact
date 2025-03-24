import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateArticleMutation, useUpdateArticleMutation } from '../../store/apiSlice';
import { Tag, Input, Button } from 'antd';
import styles from './CreateArticle.module.css';

const CreateArticle = ({ mode = 'create', initialData = {}, articleSlug }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(initialData.tagList || []);
  const [inputValue, setInputValue] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      title: initialData.title || '',
      shortDescription: initialData.description || '',
      text: initialData.body || '',
    },
  });

  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  const onSubmit = async (data) => {
    const formattedData = {
      title: data.title,
      description: data.shortDescription,
      body: data.text,
      tagList: tags,
    };

    setLoading(true);
    try {
      if (mode === 'create') {
        const response = await createArticle(formattedData).unwrap();
        const createdArticleSlug = response.article.slug;
        navigate(`/articles/${createdArticleSlug}`);
      } else if (mode === 'edit') {
        await updateArticle({ slug: articleSlug, updatedArticle: formattedData }).unwrap();
        navigate(`/articles/${articleSlug}`);
      }
    } catch (error) {
      console.error('Ошибка при создании/обновлении статьи:', error);
    } finally {
      setLoading(false);
    }

    reset();
  };

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      for (const [key, value] of Object.entries(initialData)) {
        setValue(key, value);
      }
      setTags(initialData.tagList || []);
    }
  }, [mode, initialData, setValue]);

  return (
    <div className={styles.signIn}>
      <h2 className={styles.mainTitle}>
        {mode === 'create' ? 'Create new article' : 'Edit article'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrap}>
          <label className={styles.labelTitle} htmlFor="title">
            Заголовок
          </label>
          <input
            {...register('title', { required: 'Введите заголовок' })}
            placeholder="Заголовок"
            type="text"
            className={styles.title}
            onBlur={() => trigger('title')}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}

          <label className={styles.labelShortDescription} htmlFor="shortDescription">
            Краткое описание
          </label>
          <input
            {...register('shortDescription', { required: 'Введите описание' })}
            placeholder="Краткое описание"
            type="text"
            className={styles.shortDescription}
            onBlur={() => trigger('shortDescription')}
          />
          {errors.shortDescription && (
            <p className={styles.error}>{errors.shortDescription.message}</p>
          )}

          <label className={styles.labelShortDescription} htmlFor="text">
            Текст статьи
          </label>
          <input
            {...register('text', { required: 'Введите текст статьи' })}
            placeholder="Текст статьи"
            type="text"
            className={styles.textInput}
            onBlur={() => trigger('text')}
          />
          {errors.text && <p className={styles.error}>{errors.text.message}</p>}

          <label className={styles.labelTags} htmlFor="tags">
            Теги
          </label>
          <div className={styles.tagsContainer}>
            {tags.map((tag) => (
              <Tag key={tag} closable onClose={() => handleRemoveTag(tag)} className={styles.tag}>
                {tag}
              </Tag>
            ))}
          </div>
          <div className={styles.addTagContainer}>
            <Input
              type="text"
              placeholder="Введите тег"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles.addTagInput}
            />
            <Button type="primary" onClick={handleAddTag} className={styles.addTagButton}>
              Add tag
            </Button>
          </div>
        </div>
        <Button type="primary" htmlType="sumbit" loading={loading} className={styles.btnLogin}>
          {mode === 'create' ? 'Send' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
};

export default CreateArticle;
