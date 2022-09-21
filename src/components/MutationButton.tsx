import { Button, CircularProgress } from "@mui/joy";
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
    <Button
      className={`${className} bg-blue-500`}
      disabled={isLoading}
      onClick={() => mutate(data)}
    >
      {isLoading ? <CircularProgress /> : children}
    </Button>
  );
};

export default MutationButton;
