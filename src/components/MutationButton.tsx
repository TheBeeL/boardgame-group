import Button from "@components/ui/Button";
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
      loading={isLoading}
      className={`${className}`}
      onClick={() => mutate(data)}
    >
      {children}
    </Button>
  );
};

export default MutationButton;
