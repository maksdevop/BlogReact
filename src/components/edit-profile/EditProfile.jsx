import React from 'react'
import styles from './EditProfile.module.css'
const EditProfile = () => {
    return (
        <div className={styles.signIn}>
            <h1 className={styles.title}>Edit Profile</h1>
            <div className={styles.wrap}>
                <label className={styles.labelEmail} htmlFor="">User name</label>
                <input placeholder='User name' type="text" className={styles.userName} />
                <label className={styles.labelEmail} htmlFor="">Email addres</label>
                <input placeholder='Email address' type="email" className={styles.email} />
                <label className={styles.labelPassword} htmlFor="">New password</label>
                <input placeholder='New password' type="password" className={styles.password} />
                <label className={styles.labelPasswordAgain} htmlFor="">Avatar image (url) </label>
                <input placeholder='Avatar image' type="text" className={styles.password} />

                
            </div>
            <button className={styles.btnLogin}>Save</button>

        </div>
    )
}

export default EditProfile
