import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

const variants = cva(["btn"], {
  variants: {
    intent: { primary: ["btn-primary"], warning: ["btn-warning"] },
    size: { small: ["btn-sm"], medium: ["btn-md"] },
    ghost: {
      true: "btn-ghost",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

interface Props
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof variants> {}

const ButtonLink = ({
  className,
  children,
  intent,
  size,
  ghost,
  href = "/",
  ...props
}: Props) => {
  props;
  return (
    <Link href={href}>
      <a
        className={variants({ class: className, intent, size, ghost })}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

export default ButtonLink;
