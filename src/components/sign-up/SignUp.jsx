import React from 'react'
import styles from './SignUp.module.css'
import { Link } from 'react-router-dom'
const SignUp = () =>{
    return (
          <div className={styles.signIn}>
                    <h1 className={styles.title}>Create new account</h1>
                    <div className={styles.wrap}>
                        <label className={styles.labelEmail} htmlFor="">User name</label>
                        <input placeholder='User name' type="text" className={styles.userName} />
                        <label className={styles.labelEmail} htmlFor="">Email addres</label>
                        <input placeholder='Email address' type="email" className={styles.email} />
                        <label className={styles.labelPassword} htmlFor="">Password</label>
                        <input placeholder='Password' type="password" className={styles.password} />
                        <label className={styles.labelPasswordAgain} htmlFor="">Repeat Password</label>
                        <input placeholder='Password' type="password" className={styles.password} />

                        <div className={styles.agreementWrap}>
                            <input className={styles.checkbox} type="checkbox" />
                            <p className={styles.agreement}>I agree to the processing of my personal <br />information</p>
                        </div>
                    </div>
                    <button className={styles.btnLogin}>Create</button>
        
                    <p className={styles.info}>Already have an account? <Link to={'/signIn'}>Sign In.</Link></p>
                </div>
    )
}

export default SignUp
