import React from 'react';
import styles from './CreateArticle.module.css';
const CreateArticle = () => {
  return (
    <div className={styles.signIn}>
      <h1 className={styles.mainTitle}>Create new article</h1>
      <div className={styles.wrap}>
        <label className={styles.labelTitle} htmlFor="">
          Title
        </label>
        <input placeholder="Title" type="text" className={styles.title} />
        <label className={styles.labelShortDescription} htmlFor="">
          Title
        </label>
        <input
          placeholder="Title"
          type="text"
          className={styles.shortDescription}
        />
        <label className={styles.labelShortDescription} htmlFor="">
          Title
        </label>
        <textarea
          className={styles.textArea}
          id="bigTextArea"
          name="bigTextArea"
          placeholder="Text"
          rows="10"
          cols="117"
        ></textarea>
        <label className={styles.labelTags} htmlFor="">
          Tags
        </label>
        <div className={styles.tagWrap}>
          <input placeholder="Tag" type="text" className={styles.tag} />
          <button className={styles.btnDelete}>Delete</button>
        </div>
        <div className={styles.tagWrap}>
          <input placeholder="Tag" type="text" className={styles.tag} />
          <button className={styles.btnDelete}>Delete</button>
          <button className={styles.btnAdd}>Add tag</button>
        </div>
      </div>
      <button className={styles.btnLogin}>Send</button>
    </div>
  );
};

export default CreateArticle;
