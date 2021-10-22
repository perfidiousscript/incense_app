import styled from "styled-components";
import Link from "next/link";
import { FC, ReactElement } from "react";
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
  entry: string[];
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
      {entry[0]}
    </StyledNavTopUnit>
  );
};

export const ClosedNavTopUnit = ({
  entry,
  expandFunction,
  children,
}: {
  entry: string[];
  expandFunction: (fn: boolean) => void;
  children: JSX.Element | string;
}) => {
  return (
    <StyledNavTopUnit
      onMouseEnter={() => {
        expandFunction(true);
      }}
    >
      {children}
    </StyledNavTopUnit>
  );
};

export const NavDropDownUnit = ({
  entry,
  expandFunction,
}: {
  entry: string[];
  expandFunction: (fn: boolean) => void;
}) => {
  return (
    <StyledDropDownUnit
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

export const LogOutUnit = ({
  expandFunction,
}: {
  expandFunction: (fn: boolean) => void;
}) => {
  const { logout } = useAuth();
  const logOutUser = useMutation(logout);
  function logOutHelper(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    logOutUser.mutate();
  }
  return (
    <StyledDropDownUnit
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
