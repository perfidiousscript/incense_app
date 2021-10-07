import { FC } from "react";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Nav.module.css";
import { NavTopUnit, NavDropDownUnit } from "/components/NavUnits";
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

  // Takes the list of elements in the dropdownArray and generates them as.
  function renderExpandedDropdown(list: Array, expandFunction: Function) {
    let dropdown = list.map((entry: Array) => {
      if (entry[1]) {
        return (
          <NavDropDownUnit
            key={entry[0]}
            onMouseEnter={() => {
              expandFunction(true);
            }}
            onMouseLeave={() => {
              expandFunction(false);
            }}
          >
            <Link href={entry[1]}>
              <div>{entry[0]}</div>
            </Link>
          </NavDropDownUnit>
        );
      } else {
        return (
          <NavTopUnit
            key={entry[0]}
            onMouseEnter={() => {
              expandFunction(true);
            }}
            onMouseLeave={() => {
              expandFunction(false);
            }}
            key={entry[0]}
          >
            {entry[0]}
          </NavTopUnit>
        );
      }
    });
    return <div className={styles.expandedDropdownContainer}>{dropdown}</div>;
  }

  function renderIncensesUnit() {
    if (incensesExpansion) {
      return renderExpandedDropdown(incensesDropdownList, setIncensesExpansion);
    } else {
      return (
        <NavTopUnit
          key="incenses"
          onMouseEnter={() => {
            setIncensesExpansion(true);
          }}
        >
          Incenses
        </NavTopUnit>
      );
    }
  }

  function renderBrandsUnit() {
    if (brandsExpansion) {
      return renderExpandedDropdown(brandsDropdownList, setBrandsExpansion);
    } else {
      return (
        <NavTopUnit
          key="brands"
          onMouseEnter={() => {
            setBrandsExpansion(true);
          }}
        >
          Brands
        </NavTopUnit>
      );
    }
  }

  return (
    <div className={styles.navBar}>
      <div className={styles.siteTitle}>
        <Link href={`/`}>Incense Hermitage</Link>
      </div>
      {renderIncensesUnit()}
      {renderBrandsUnit()}

      <NavTopUnit key="about">
        <Link href="/about">About</Link>
      </NavTopUnit>

      {user ? (
        <NavTopUnit onClick={logOutUser.mutate} key="signOut">
          Sign Out
        </NavTopUnit>
      ) : (
        <NavTopUnit key="signIn">
          <Link href={`/sign-in`}>Sign In / Sign Up</Link>
        </NavTopUnit>
      )}
    </div>
  );
};

export default Nav;
