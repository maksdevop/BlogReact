import React from 'react'
import styles from '../Articles/Articles.module.css'
import { Pagination } from 'antd'
import { Link } from 'react-router-dom'
const Articles = ( {articles , handlePageChange , totalPages , currentPage}) => {
    console.log(articles)
    return (
        <>
            {articles.map((article , index) =>{
                {console.log(article.title)}
                return (
            <div key={index} className={styles.articles}>
                <div className={styles.articleWrap}>
                    <div className={styles.articleTitleWrap}>
                        <Link to={`/articles/${article.slug}`} className={styles.articleTitle}>{article.title}</Link>
                        <img className={styles.articleFavotite} src="/heart.svg" alt="" />
                        <p className={styles.articleFavoritesCount}>{article.favoritesCount}</p>
                    </div>
                    <div>
                        {article.tagList.map((tag , index) => (
                            <button key={index} className={styles.articleTags}>{tag}</button>
                        ))}
                    </div>
                    <p className={styles.articleText}>{article.body}</p>
                </div>
                
                <div className={styles.articleUser}>
                    <div className={styles.articleUserWrap}>
                        <h4 className={styles.articleUserName}>{article.author.username}</h4>
                        <p className={styles.articlePostTime}>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <img className={styles.articleUserImg} src={article.author.image} alt="IMAGE" />
                </div>
            </div>
                )
                
            })}
            <Pagination 
                align='center' 
                current={currentPage}
                total={totalPages}
                onChange={handlePageChange} />
        </>

    )
}

export default Articles
