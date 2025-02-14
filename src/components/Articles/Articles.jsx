import React from 'react'
import styles from '../Articles/Articles.module.css'
import { Pagination } from 'antd'
const Articles = ( {articles , handlePageChange , totalPages , currentPage}) => {
    console.log(articles)
    return (
        <>
            <h2>Посты</h2>
            {articles.map((article , index) =>{
                {console.log(article.title)}
                return (
            <div key={index} className={styles.articles}>
                <div className={styles.arcticleWrap}>
                    <div className={styles.articleTitleWrap}>
                        <a href='#' className={styles.arcticleTitle}>{article.title}</a>
                        <img className={styles.articleFavotite} src="/heart.svg" alt="" />
                        <p className={styles.articleFavoritesCount}>{article.favoritesCount}</p>
                    </div>
                    <div>
                        {article.tagList.map((tag , index) => (
                            <button key={index} className={styles.arcticleTags}>{tag}</button>
                        ))}
                    </div>
                    <p className={styles.articleText}>{article.description}</p>
                </div>
                
                <div className={styles.arcticleUser}>
                    <div className={styles.arcticleUserWrap}>
                        <h4 className={styles.arcticleUserName}>{article.author.username}</h4>
                        <p className={styles.arcticlePostTime}>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <img className={styles.arcticleUserImg} src={article.author.image} alt="IMAGE" />
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
