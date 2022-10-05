import { ReactNode } from "react";

interface MutationButtonProps {
  mutation: {
    mutate: (data?: any) => void;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
  data?: Record<string, any>;
  children?: ReactNode;
  className?: string;
}

const MutationButton = ({
  mutation: { mutate, isLoading, isSuccess, isError },
  data,
  children,
  className = "",
}: MutationButtonProps) => {
  return (
    <button
      className={`${className} btn btn-primary ${isLoading && "loading"}`}
      disabled={isLoading}
      onClick={() => mutate(data)}
    >
      {children}
    </button>
  );
};

export default MutationButton;
