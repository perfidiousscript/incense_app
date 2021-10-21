import styled from "styled-components";
import Link from "next/link";
import { FC } from "react";
import { useMutation } from "react-query";
import { useAuth } from "lib/auth";

const StyledNavTopUnit = styled.div`
  border: 1px solid black;
  grid-row: span 1;
  text-align: center;
  line-height: 4.5em;
  background: white;
  &:hover {
    z-index: 1;
    box-shadow: 2px 2px 2px 2px black;
  }
`;

const StyledDropDownUnit = styled.div`
  border: 1px solid black;
  grid-column: span 1;
  grid-row: span 1;
  background: white;
  text-align: center;
  line-height: 4.5em;
  position: relative;
  align-self: stretch;
  &:hover {
    z-index: 1;
    box-shadow: 2px 2px 2px 2px black;
  }
`;

export const ExpandedNavTopUnit: FC<{
  entry: Array;
  expandFunction: (fn: boolean) => void;
}> = ({ entry, expandFunction }) => {
  return (
    <StyledNavTopUnit
      onMouseEnter={() => {
        expandFunction(true);
      }}
      onMouseLeave={() => {
        expandFunction(false);
      }}
    >
      {entry}
    </StyledNavTopUnit>
  );
};

export const ClosedNavTopUnit: FC<{
  entry: Array;
  expandFunction: (fn: boolean) => void;
}> = ({ entry, expandFunction, children }) => {
  return (
    <StyledNavTopUnit
      key={entry}
      onMouseEnter={() => {
        expandFunction(true);
      }}
    >
      {children}
    </StyledNavTopUnit>
  );
};

export const NavDropDownUnit: FC<{
  entry: Array;
  expandFunction: (fn: boolean) => void;
}> = ({ entry, expandFunction }) => {
  return (
    <StyledDropDownUnit
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
    </StyledDropDownUnit>
  );
};

export const LogOutUnit: FC<{ expandFunction: (fn: boolean) => void }> = ({
  expandFunction,
}) => {
  const { logout } = useAuth();
  const logOutUser = useMutation(logout);
  function logOutHelper(event) {
    event.preventDefault();
    logOutUser.mutate();
  }
  return (
    <StyledDropDownUnit
      key={"logOut"}
      onMouseEnter={() => {
        expandFunction(true);
      }}
      onMouseLeave={() => {
        expandFunction(false);
      }}
      onClick={logOutHelper}
    >
      Log Out
    </StyledDropDownUnit>
  );
};
