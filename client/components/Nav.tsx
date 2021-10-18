import { FC } from "react";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Nav.module.css";
import {
  ClosedNavTopUnit,
  ExpandedNavTopUnit,
  NavDropDownUnit,
  LogOutUnit,
} from "/components/NavUnits";
import { useAuth } from "lib/auth";

const Nav: FC<{}> = () => {
  const { user } = useAuth();
  const [incensesExpansion, setIncensesExpansion] = useState(false);
  const [brandsExpansion, setBrandsExpansion] = useState(false);
  const [ingredientsExpansion, setIngredientsExpansion] = useState(false);
  const [aboutExpansion, setAboutExpansion] = useState(false);
  const [accountExpansion, setAccountExpansion] = useState(false);

  var incensesDropdownList = [
    ["Incenses"],
    ["Browse Incenses", "/incenses"],
    ["Search Incenses", "/incenses/search"],
    ["Browse Ingredients", "/ingredients"],
  ];

  var brandsDropdownList = [
    ["Brands"],
    ["Browse Brands", "/brands"],
    ["Search Brands", "/brands/search"],
  ];

  var ingredientsDropdownList = [
    ["Ingredients"],
    ["Browse Ingredients", "/ingredients"],
  ];

  if (user) {
    incensesDropdownList.push(["Create New Incense", "/incenses/create"]);
    brandsDropdownList.push(["Create New Brand", "/brands/create"]);
    if (user.role === ("moderator" || "admin")) {
      ingredientsDropdownList.push([
        "Create New Ingredient",
        "/ingredients/create",
      ]);
    }
  }

  // Takes the list of elements in the dropdownArray and generates them as.
  function renderExpandedDropdown(list: Array, expandFunction: Function) {
    let dropdown = list.map((entry: Array) => {
      if (entry[1]) {
        return (
          <NavDropDownUnit
            entry={entry}
            expandFunction={expandFunction}
            key={entry[0]}
          />
        );
      } else {
        return (
          <ExpandedNavTopUnit
            entry={entry}
            expandFunction={expandFunction}
            key={entry[0]}
          />
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
        <ClosedNavTopUnit
          entry="Incenses"
          expandFunction={setIncensesExpansion}
        >
          Incenses
        </ClosedNavTopUnit>
      );
    }
  }

  function renderBrandsUnit() {
    if (brandsExpansion) {
      return renderExpandedDropdown(brandsDropdownList, setBrandsExpansion);
    } else {
      return (
        <ClosedNavTopUnit entry="Brands" expandFunction={setBrandsExpansion}>
          Brands
        </ClosedNavTopUnit>
      );
    }
  }

  function renderIngredientsUnit() {
    if (ingredientsExpansion) {
      return renderExpandedDropdown(
        ingredientsDropdownList,
        setIngredientsExpansion
      );
    } else {
      return (
        <ClosedNavTopUnit
          entry="Ingredients"
          expandFunction={setIngredientsExpansion}
        >
          Ingredients
        </ClosedNavTopUnit>
      );
    }
  }

  function renderAccountUnit() {
    if (user) {
      let accountDropdown = [
        <ExpandedNavTopUnit
          entry="Account"
          expandFunction={setAccountExpansion}
          key={"account"}
        >
          Account
        </ExpandedNavTopUnit>,
      ];
      if (accountExpansion) {
        let expandedAccount = [
          <NavDropDownUnit
            entry={["Profile", "/user/profile"]}
            expandFunction={setAccountExpansion}
            key={"profile"}
          />,
          <LogOutUnit
            expandFunction={setAccountExpansion}
            key={"logOutUnit"}
          />,
        ];
        accountDropdown.push([...expandedAccount]);
      }
      return (
        <div className={styles.expandedDropdownContainer}>
          {accountDropdown}
        </div>
      );
    } else {
      return (
        <ClosedNavTopUnit entry={"signIn"} expandFunction={setAccountExpansion}>
          <Link href={`/sign-in`}>
            <div>Sign In / Register</div>
          </Link>
        </ClosedNavTopUnit>
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
      {renderIngredientsUnit()}

      <ClosedNavTopUnit entry={"About"} expandFunction={setAboutExpansion}>
        <Link href="/about">
          <div>About</div>
        </Link>
      </ClosedNavTopUnit>

      {renderAccountUnit()}
    </div>
  );
};

export default Nav;
