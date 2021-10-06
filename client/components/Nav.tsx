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

  const logOutUser = useMutation(logout);

  var incensesDropdownList = [
    ["Incenses"],
    ["Browse Incenses", "/incenses"],
    ["Search Incenses", "/incenses/search"],
  ];

  var brandsDropdownList = [
    ["Brands"],
    ["Browse Brands", "/brands"],
    ["Search Brands", "/brands/search"],
  ];

  if (user) {
    if (user.role === ("moderator" || "admin")) {
      incensesDropdownList.push(["Create New Incense", "/incenses/create"]);
      brandsDropdownList.push(["Create New Brand", "/brands/create"]);
    }
  }

  function renderExpandedDropdown(list: Array, expandFunction: Function) {
    let dropdown = list.map((entry: Array) => {
      return (
        <div
          key={entry[0]}
          className={styles.navSub}
          onMouseEnter={() => {
            expandFunction(true);
          }}
          onMouseLeave={() => {
            expandFunction(false);
          }}
        >
          {entry[1] ? <Link href={entry[1]}>{entry[0]}</Link> : entry[0]}
        </div>
      );
    });
    return dropdown;
  }

  function renderIncensesUnit() {
    if (incensesExpansion) {
      return renderExpandedDropdown(incensesDropdownList, setIncensesExpansion);
    } else {
      return (
        <div
          onMouseEnter={() => {
            setIncensesExpansion(true);
          }}
        >
          Incenses
        </div>
      );
    }
  }

  function renderBrandsUnit() {
    if (brandsExpansion) {
      return renderExpandedDropdown(brandsDropdownList, setBrandsExpansion);
    } else {
      return (
        <div
          onMouseEnter={() => {
            setBrandsExpansion(true);
          }}
        >
          Brands
        </div>
      );
    }
  }

  return (
    <div className={styles.navBar}>
      <div className={styles.siteTitle}>
        <Link href={`/`}>Incense Hermitage</Link>
      </div>
      <div className={styles.navUnit}>{renderIncensesUnit()}</div>
      <div className={styles.navUnit}>{renderBrandsUnit()}</div>
      <div className={styles.navUnit}>
        <Link href="/about">About</Link>
      </div>
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
