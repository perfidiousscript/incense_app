import { FC } from "react";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Nav.module.css";
import {
  ClosedNavTopUnit,
  ExpandedNavTopUnit,
  NavDropDownUnit,
  LogOutUnit,
} from "components/NavUnits";
import { useAuth } from "lib/auth";

const Nav: FC<Record<string, never>> = () => {
  const { user } = useAuth();
  const [incensesExpansion, setIncensesExpansion] = useState(false);
  const [brandsExpansion, setBrandsExpansion] = useState(false);
  const [ingredientsExpansion, setIngredientsExpansion] = useState(false);
  const [aboutExpansion, setAboutExpansion] = useState(false);
  const [accountExpansion, setAccountExpansion] = useState(false);

  var incensesDropdownList: string[][] = [
    ["Incenses"],
    ["Browse Incenses", "/incenses"],
  ];

  var brandsDropdownList: string[][] = [
    ["Brands"],
    ["Browse Brands", "/brands"],
    ["Search Brands", "/brands/search"],
  ];

  var ingredientsDropdownList: string[][] = [
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
  function renderExpandedDropdown(
    list: string[][],
    expandFunction: (fn: boolean) => void
  ) {
    const dropdown = list.map((entry: string[]) => {
      if (entry.length === 2) {
        return (
          <NavDropDownUnit entry={entry} expandFunction={expandFunction} />
        );
      } else {
        return (
          <ExpandedNavTopUnit entry={entry} expandFunction={expandFunction} />
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
          entry={["Incenses"]}
          expandFunction={setIncensesExpansion}
          key={"incenses"}
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
        <ClosedNavTopUnit
          entry={["Brands"]}
          expandFunction={setBrandsExpansion}
          key={"Brands"}
        >
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
          entry={["Ingredients"]}
          expandFunction={setIngredientsExpansion}
          key={"Ingredients"}
        >
          Ingredients
        </ClosedNavTopUnit>
      );
    }
  }

  function renderAccountUnit() {
    if (user) {
      const accountDropdown = [
        <ExpandedNavTopUnit
          entry={["Account"]}
          expandFunction={setAccountExpansion}
          key={"account"}
        >
          Account
        </ExpandedNavTopUnit>,
      ];
      if (accountExpansion) {
        const expandedAccount = [
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
        accountDropdown.push(...expandedAccount);
      }
      return (
        <div className={styles.expandedDropdownContainer}>
          {accountDropdown}
        </div>
      );
    } else {
      return (
        <ClosedNavTopUnit
          entry={["signIn"]}
          expandFunction={setAccountExpansion}
          key={"signIn"}
        >
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

      <ClosedNavTopUnit
        entry={["About"]}
        expandFunction={setAboutExpansion}
        key={"About"}
      >
        <Link href="/about">
          <div>About</div>
        </Link>
      </ClosedNavTopUnit>

      {renderAccountUnit()}
    </div>
  );
};

export default Nav;
