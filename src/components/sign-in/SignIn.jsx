import React from 'react';
import styles from './SignIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/registrationSliсe';
import { useLoginUserMutation } from '../../store/apiSlice';
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(
        setUser({
          userName: response.user.username,
          email: response.user.email,
          token: response.user.token,
          urlImage: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
        })
      );
      navigate('/');
    } catch (err) {
      console.error('Failed to login user: ', err);
      if (err.data && err.data.errors) {
        console.error('Ошибка сервера:', err.data.errors);
      }
    }
  };

  return (
    <div className={styles.signIn}>
      <h1 className={styles.title}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrap}>
        <label className={styles.labelEmail} htmlFor="">
          Email address
        </label>
        <input
          {...register('email', {
            required: 'Введите адрес почты',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Неверный формат почты',
            },
          })}
          placeholder="Email address"
          onBlur={() => trigger('email')}
          className={errors.email ? `${styles.email} ${styles.inputRed}` : styles.email}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        <label className={styles.labelPassword} htmlFor="">
          Password
        </label>
        <input
          {...register('password', {
            required: 'Введите пароль',
          })}
          placeholder="Password"
          onBlur={() => trigger('password')}
          className={errors.password ? `${styles.password} ${styles.inputRed}` : styles.password}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        <button type="submit" className={styles.btnLogin}>
          Login
        </button>
      </form>
      <p className={styles.info}>
        Don’t have an account? <Link to={'/signUp'}>Sign Up.</Link>
      </p>
    </div>
  );
};

export default SignIn;
