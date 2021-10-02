import { FC } from "react";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Nav.module.css";
import { useAuth } from "lib/auth";
import { useMutation } from "react-query";

const Nav: FC<{}> = () => {
  const { user, logout } = useAuth();
  const [incensesExpansion, setIncensesExpansion] = useState(false);
  const [brandsExpansion, setBrandsExpansion] = useState(false);

  function renderIncensesUnit() {
    if (incensesExpansion) {
      return (
        <div>
          <div className={styles.navSub} onClick={changeIncenseMenu}>
            Incenses
          </div>
          <div className={styles.navSub}>
            <Link href="/incenses">Browse Incenses</Link>
          </div>
          <div className={styles.navSub}>Search Incenses</div>
        </div>
      );
    } else {
      return (
        <div onClick={changeIncenseMenu} className={styles.navSub}>
          Incenses
        </div>
      );
    }
  }

  function renderBrandsUnit() {
    if (brandsExpansion) {
      return (
        <div>
          <div className={styles.navSub} onClick={changeBrandMenu}>
            Brands
          </div>
          <div className={styles.navSub}>
            <Link href="/brands">Browse Brands</Link>
          </div>
          <div className={styles.navSub}>Search Brands</div>
        </div>
      );
    } else {
      return <div onClick={changeBrandMenu}>Brands</div>;
    }
  }

  function changeIncenseMenu() {
    let currentState = incensesExpansion;
    setBrandsExpansion(false);
    setIncensesExpansion(!currentState);
  }

  function changeBrandMenu() {
    let currentState = brandsExpansion;
    setIncensesExpansion(false);
    setBrandsExpansion(!currentState);
  }

  const logOutUser = useMutation(logout);

  return (
    <div className={styles.navBar}>
      <div className={styles.siteTitle}>
        <Link href={`/`}>Incense Hermitage</Link>
      </div>
      <div className={styles.navUnit}>{renderIncensesUnit()}</div>
      <div className={styles.navUnit}>{renderBrandsUnit()}</div>
      <div className={styles.navUnit}>About</div>
      {user ? (
        <div className={styles.navUnit} onClick={logOutUser.mutate}>
          Sign Out
        </div>
      ) : (
        <Link href={`/signin`}>
          <div className={styles.navUnit}>Sign In / Sign Up</div>
        </Link>
      )}
    </div>
  );
};

export default Nav;
