import { FC } from "react";
import Link from "next/link";
import styles from "../styles/Nav.module.css";
import { useAuth } from "lib/auth";
//
// import Box from 'components/Box';
// import Text from 'components/Text';

const Nav: FC<{}> = () => {
  const { user } = useAuth();

  return (
    <div>
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
          <button>Sign Out</button>
        </div>
      ) : (
        <Link href={`/signin`}>
          <a>Sign In / Sign Up</a>
        </Link>
      )}
    </div>
  );
};

export default Nav;
