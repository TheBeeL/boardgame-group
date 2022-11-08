import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const variants = cva(["btn"], {
  variants: {
    intent: { primary: ["btn-primary"], warning: ["btn-warning"] },
    size: { small: ["btn-sm"], medium: ["btn-md"] },
    loading: {
      true: "loading",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

interface Props
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {}

const Button = ({
  className,
  children,
  intent,
  size,
  loading,
  ...props
}: Props) => {
  return (
    <button
      className={variants({ class: className, intent, size, loading })}
      disabled={!!loading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
