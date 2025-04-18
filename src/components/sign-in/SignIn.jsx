import styles from './SignIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/registrationSliсe';
import { useLoginUserMutation } from '../../store/apiSlice';
import { Button } from 'antd';
import { useState } from 'react';
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      localStorage.setItem('token', response.user.token);
      dispatch(
        setUser({
          userName: response.user.username,
          email: response.user.email,
          token: response.user.token,
          urlImage:
            response.user.urlImage || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
        })
      );
      navigate('/');
    } catch (err) {
      console.error('Failed to login user:', err);
      if (err.data && err.data.errors) {
        if (err.data.errors['email or password']) {
          setError('password', {
            type: 'server',
            message: 'email or password is invalid',
          });
          setError('email', {
            type: 'server',
            message: 'email or password is invalid',
          });
        }
      } else {
        console.error('Unexpected error:', err);
      }
    } finally {
      setLoading(false);
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
          type="password"
          className={errors.password ? `${styles.password} ${styles.inputRed}` : styles.password}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        <Button type="primary" htmlType="submit" className={styles.btnLogin} loading={loading}>
          Login
        </Button>
      </form>
      <p className={styles.info}>
        Don’t have an account? <Link to={'/signUp'}>Sign Up.</Link>
      </p>
    </div>
  );
};

export default SignIn;
