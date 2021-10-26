import { MutationError } from "types";

const RequestWrapper = ({
  isLoading,
  isError,
  error,
}: {
  isLoading: boolean;
  isError: boolean;
  error: MutationError | null;
}) => {
  function expandErrorReason(errorParams: Record<string, string[]>) {
    let reasonHtml: JSX.Element[] = [];
    if (errorParams !== null) {
      reasonHtml = Object.entries(errorParams).map(([key, value]) => (
        <>
          <span>{key}: </span>
          <span>{value}</span>
        </>
      ));
    }
    return reasonHtml;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    if (error) {
      const errorHash = error.body?.error;
      const errorDetail = errorHash.detail;

      return (
        <div className="centeredText">
          <div>Error: {errorDetail}</div>
          {expandErrorReason(errorHash.params)}
        </div>
      );
    } else {
      return (
        <div className="centeredText">
          <div>We're sorry, there has been an error.</div>
        </div>
      );
    }
  } else {
    return null;
  }
};

export default RequestWrapper;
