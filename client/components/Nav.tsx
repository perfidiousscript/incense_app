import { FC } from "react";
import Link from "next/link";
import styles from "../styles/Nav.module.css";
import { useAuth } from "lib/auth";
import { useMutation } from "react-query";

const Nav: FC<{}> = () => {
  const { user, logout } = useAuth();

  const logOutUser = useMutation(logout);

  return (
    <div className={styles.navBar}>
      <div className={styles.siteTitle}>
        <Link href={`/`}>Incense Hermitage</Link>
      </div>
      <div className={styles.navButton}>
        <Link href={`/incenses`}>Incenses</Link>
      </div>
      <div className={styles.navButton}>
        <Link href={`/brands`}>Brands</Link>
      </div>
      {user ? (
        <div>
          <div>{user.username}</div>
          <button onClick={logOutUser.mutate}>Sign Out</button>
        </div>
      ) : (
        <Link href={`/signin`}>Sign In / Sign Up</Link>
      )}
    </div>
  );
};

export default Nav;
