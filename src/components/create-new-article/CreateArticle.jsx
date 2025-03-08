import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addTag, removeTag } from '../../store/articleSlice';
import { useCreateArticleMutation, useUpdateArticleMutation } from '../../store/apiSlice';
import styles from './CreateArticle.module.css';
import { useNavigate } from 'react-router-dom';

const CreateArticle = ({ mode = 'create', initialData = {}, articleSlug }) => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);
  const navigate = useNavigate();
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
      tags: initialData.tagList ? initialData.tagList.map((tag) => ({ value: tag })) : [],
    },
  });

  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const onSubmit = async (data) => {
    const formattedData = {
      title: data.title,
      description: data.shortDescription,
      body: data.text,
      tagList: data.tags.map((tag) => tag.value),
    };
    console.log(formattedData);
    if (mode === 'create') {
      await createArticle(formattedData).unwrap();
    } else if (mode === 'edit') {
      await updateArticle({ slug: articleSlug, updatedArticle: formattedData }).unwrap();
      console.log(formattedData);
      reset({
        title: formattedData.title,
        shortDescription: formattedData.description,
        text: formattedData.body,
        tags: formattedData.tagList ? formattedData.tagList.map((tag) => ({ value: tag })) : [],
      });
      // navigate('/');
    }
    reset();
  };

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      for (const [key, value] of Object.entries(initialData)) {
        console.log(initialData);
        if (key === 'tags') {
          // Устанавливаем теги вручную
          value.forEach((tag, index) => {
            setValue(`tags[${index}].value`, tag.value);
          });
        } else {
          setValue(key, value);
        }
      }
    }
  }, [mode, initialData, setValue]);
  return (
    <div className={styles.signIn}>
      <h2 className={styles.mainTitle}>
        {mode === 'create' ? 'Create New Article' : 'Edit Article'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrap}>
          <label className={styles.labelTitle} htmlFor="title">
            Title
          </label>
          <input
            {...register('title', { required: 'Введите заголовок' })}
            placeholder="Title"
            type="text"
            className={styles.title}
            onBlur={() => trigger('title')}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}

          <label className={styles.labelShortDescription} htmlFor="shortDescription">
            Short description
          </label>
          <input
            {...register('shortDescription', { required: 'Введите описание' })}
            placeholder="Short description"
            type="text"
            className={styles.shortDescription}
            onBlur={() => trigger('shortDescription')}
          />
          {errors.shortDescription && (
            <p className={styles.error}>{errors.shortDescription.message}</p>
          )}

          <label className={styles.labelShortDescription} htmlFor="text">
            Text
          </label>
          <input
            {...register('text', { required: 'Введите текст статьи' })}
            placeholder="Text"
            type="text"
            className={styles.textInput}
            onBlur={() => trigger('text')}
          />
          {errors.text && <p className={styles.error}>{errors.text.message}</p>}

          <label className={styles.labelTags} htmlFor="tags">
            Tags
          </label>
          {article.tags.map((tag, index) => (
            <div className={styles.tagWrap} key={index}>
              <input
                placeholder="Tag"
                type="text"
                className={styles.tag}
                onBlur={() => trigger(`tags[${index}]`)}
                {...register(`tags[${index}].value`, { required: 'Введите тег' })}
              />
              {errors.tags && errors.tags[index] && (
                <p className={styles.error}>{errors.tags[index]?.message}</p>
              )}
              <button
                type="button"
                className={styles.btnDelete}
                onClick={() => dispatch(removeTag(index))}
              >
                Delete
              </button>
            </div>
          ))}
          <button type="button" className={styles.btnAdd} onClick={() => dispatch(addTag())}>
            Add tag
          </button>
        </div>
        <button type="submit" className={styles.btnLogin}>
          {mode === 'create' ? 'Send' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
