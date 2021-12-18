import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import User from "lib/api/user";
import RequestWrapper from "components/RequestWrapper";
import App from "components/App";
import { MutationError } from "types";

const EmailConfirmation: NextPage<Record<string, never>> = () => {
  const router = useRouter();
  const { token } = router.query;

  const {
    isLoading,
    isError,
    data,
    error,
  }: {
    isLoading: boolean;
    isError: boolean;
    data: number | undefined;
    error: MutationError | null;
  } = useQuery(["confirm_email", token], User.confirmEmail);

  function showRequestResponse() {
    if (data && data === 200) {
      return <div>Email sucessfully confirmed!</div>;
    } else if (data && data !== 200) {
      return <div>There was an issue confirming your email address.</div>;
    } else {
      return (
        <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
      );
    }
  }

  if (token === null || undefined) {
    return <div> Error: No token supplied.</div>;
  } else {
    return (
      <App title={"ConfirmEmail"}>
        <p className="pageTitle">Email Confirmation</p>
        {showRequestResponse()}
      </App>
    );
  }
};

export default EmailConfirmation;
