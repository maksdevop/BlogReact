import React from 'react'
import styles from './SignIn.module.css'
import { Link } from 'react-router-dom'
const SignIn = () =>{
    return (
        <div className={styles.signIn}>
            <h1 className={styles.title}>Sign In</h1>
            <div className={styles.wrap}>
                <label className={styles.labelEmail} htmlFor="">Email addres</label>
                <input placeholder='Email address' type="email" className={styles.email} />
                <label className={styles.labelPassword} htmlFor="">Password</label>
                <input placeholder='Password' type="password" className={styles.password} />
            </div>
            <button className={styles.btnLogin}>Login</button>

            <p className={styles.info}>Don’t have an account? <Link to={'/signUp'}>Sign Up.</Link></p>
        </div>
    )
}

export default SignIn
