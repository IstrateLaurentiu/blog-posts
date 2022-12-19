import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userReducers';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { Button } from 'antd';

export const Navbar = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.user);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.logo}>Bridged</div>
        <nav className={styles.navigation}>
          <div className={styles.headerStatus}>
            {!!userInfo ? (
              <Button
                className={styles.button}
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            ) : (
              <NavLink className={styles.button} to="/login">
                Login
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
