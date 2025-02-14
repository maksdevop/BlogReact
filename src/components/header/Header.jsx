import React from 'react'
import styles from '../header/Header.module.css'
import { Link } from 'react-router-dom'
const Header = ()  => {
    return (
        <div className={styles.wrap}>
            <Link className={styles.title} to={'/'}>Realworld Blog</Link>
            <div>
                <Link className={styles.signIn} to={'/signIn'}>Sign In</Link>
                <Link className={`${styles.signUp} ${styles.active}`} to={'/signUp'}>Sign Up</Link>

            </div>
        </div>
    )
}

export default Header
