import styles from '../header/Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/registrationSliсe';
const Header = () => {
  const user = useSelector((state) => state.registration.user);
  const { userName, urlImage } = user || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className={styles.wrap}>
      <Link className={styles.title} to={'/'}>
        Realworld Blog
      </Link>
      {!userName ? (
        <div>
          <Link className={styles.signIn} to={'/signIn'}>
            Sign In
          </Link>
          <Link className={`${styles.signUp} ${styles.active}`} to={'/signUp'}>
            Sign Up
          </Link>
        </div>
      ) : (
        <div className={styles.userInfo}>
          <Link className={styles.active} to={'/createArticle'}>
            Create article
          </Link>
          <Link
            to={'/profile'}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'black',
            }}
          >
            <p className={styles.userName}>{userName}</p>
            <img className={styles.imageUser} src={urlImage} alt="imageUser" />
          </Link>
          <button onClick={logOut} className={styles.logOut}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
