import React from 'react';
import styles from './SignUp.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/registrationSliсe';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createUser({
        user: {
          username: data.userName,
          email: data.email,
          password: data.password,
          image: data.image,
        },
      }).unwrap();
      reset();
      dispatch(
        setUser({
          userName: data.userName,
          urlImage: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
          password: data.password,
        })
      );
      navigate('/');
    } catch (err) {
      console.error('Failed to register user: ', err);
      if (err.data && err.data.errors) {
        console.error('Ошибка сервера:', err.data.errors);
      }
    }
  };

  const password = watch('password');
  const isConsent = watch('consent');

  return (
    <div className={styles.signIn}>
      <h1 className={styles.title}>Create new account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrap}>
          <label className={styles.labelEmail} htmlFor="userName">
            User name
          </label>
          <input
            {...register('userName', {
              required: 'Введите имя пользователя',
              minLength: {
                value: 3,
                message: 'Имя должно содержать не менее 3 символов',
              },
              maxLength: {
                value: 20,
                message: 'Имя должно содержать не более 20 символов',
              },
            })}
            placeholder="User name"
            type="text"
            onBlur={() => trigger('userName')}
            className={errors.userName ? `${styles.userName} ${styles.inputRed}` : styles.userName}
          />
          {errors.userName && <p className={styles.error}>{errors.userName.message}</p>}

          <label className={styles.labelEmail} htmlFor="email">
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
            type="email"
            onBlur={() => trigger('email')}
            className={errors.email ? `${styles.email} ${styles.inputRed}` : styles.email}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}

          <label className={styles.labelPassword} htmlFor="password">
            Password
          </label>
          <input
            {...register('password', {
              required: 'Введите пароль',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать не менее 6 символов',
              },
              maxLength: {
                value: 40,
                message: 'Пароль должен содержать не более 40 символов',
              },
            })}
            placeholder="Password"
            type="password"
            className={errors.password ? `${styles.password} ${styles.inputRed}` : styles.password}
            onBlur={() => trigger('password')}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}

          <label className={styles.labelPasswordAgain} htmlFor="passwordAgain">
            Repeat Password
          </label>
          <input
            {...register('passwordAgain', {
              required: 'Введите пароль',

              validate: (value) => value === password || 'Пароли не совпадают',
            })}
            placeholder="Password"
            type="password"
            onBlur={() => trigger('passwordAgain')}
            className={
              errors.passwordAgain ? `${styles.password} ${styles.inputRed}` : styles.password
            }
          />
          {errors.passwordAgain && <p className={styles.error}>{errors.passwordAgain.message}</p>}

          <div className={styles.agreementWrap}>
            <input {...register('consent')} className={styles.checkbox} type="checkbox" />
            <p className={styles.agreement}>
              I agree to the processing of my personal <br />
              information
            </p>
          </div>
        </div>
        <button
          type="submit"
          className={!isConsent ? `${styles.btnLogin} ${styles.disabled}` : `${styles.btnLogin}`}
          disabled={!isConsent}
        >
          Create
        </button>
      </form>
      <p className={styles.info}>
        Already have an account? <Link to={'/signIn'}>Sign In.</Link>
      </p>
    </div>
  );
};

export default SignUp;
