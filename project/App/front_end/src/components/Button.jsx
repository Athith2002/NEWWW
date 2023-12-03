import { cva } from "class-variance-authority";
import { motion, useAnimationControls } from "framer-motion";
import { forwardRef } from "react";
import { Button as Btn } from "react-aria-components";
import { cn } from "../utilities/cn";
import Spinner from "./Spinner";

const variants = {
  variant: {
    primary: "btn-primary",
    secondary: "btn-secondary",
    unstyled: "btn-unstyled",
    danger: "btn-danger",
    ghost: "btn-ghost p-0 md:p-0",
  },
};

const defaultStyles =
  "disable-highlight touch-none select-none overflow-hidden rounded-xl bg-skin-btn-bg px-7 py-4 text-sm font-medium text-skin-btn-text outline-none ring-skin-btn-ring ring-offset-2 ring-offset-inherit hover:bg-skin-btn-bg-hover focus:outline-none disabled:bg-skin-btn-disabled data-[pressed]:bg-skin-btn-active data-[focus-visible]:ring-2 md:px-5 md:py-2.5";

const ButtonVariants = cva(defaultStyles, {
  variants,
  defaultVariants: {
    variant: "primary",
  },
});

const Loader = ({ children, isSpinning = false }) => {
  return (
    <motion.span
      initial={isSpinning ? "saving" : "idle"}
      animate={isSpinning ? "saving" : "idle"}
      variants={{
        idle: {
          transition: {
            staggerChildren: 0.2,
          },
        },
        saving: {
          transition: {
            staggerChildren: 0.2,
            staggerDirection: -1,
          },
        },
      }}
      className="relative flex items-center px-2.5"
    >
      <motion.span
        variants={{
          saving: {
            opacity: 1,
          },
          idle: {
            opacity: 0,
          },
        }}
      >
        <Spinner
          className="text-btn-spinner absolute h-4 w-4"
          style={{ marginLeft: "-11px" }}
        />
      </motion.span>
      <motion.span
        variants={{
          idle: {
            x: 0,
          },
          saving: {
            x: 11,
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
};

const Button = forwardRef(
  (
    {
      variant,
      disabled,
      onClick,
      className,
      children,
      isSpinning = false,
      wrapperClass,
      ...props
    },
    ref,
  ) => {
    const control = useAnimationControls();

    const enterAnimation = {
      scale: 0.97,
    };

    const leaveAnimation = {
      scale: 1,
      transition: { duration: 0.4 },
    };

    return (
      <motion.div animate={control} className={cn("w-min", wrapperClass)}>
        <Btn
          ref={ref}
          onPressStart={() => {
            if (!isSpinning) {
              control.stop();
              control.start(enterAnimation);
            }
          }}
          onPressEnd={() => {
            if (!isSpinning) {
              control.start(leaveAnimation);
            }
          }}
          onPress={onClick}
          isDisabled={disabled || isSpinning}
          className={cn(ButtonVariants({ variant, className }))}
          {...props}
        >
          <Loader isSpinning={isSpinning}>{children}</Loader>
        </Btn>
      </motion.div>
    );
  },
);

const BasicButton = forwardRef(
  (
    {
      variant,
      disabled,
      onClick,
      className,
      children,
      isSpinning = false,
      wrapperClass,
      ...props
    },
    ref,
  ) => {
    const control = useAnimationControls();

    const enterAnimation = {
      scale: 0.97,
    };

    const leaveAnimation = {
      scale: 1,
      transition: { duration: 0.4 },
    };

    return (
      <motion.div animate={control} className={cn("w-min", wrapperClass)}>
        <Btn
          ref={ref}
          onPressStart={() => {
            if (!isSpinning) {
              control.stop();
              control.start(enterAnimation);
            }
          }}
          onPressEnd={() => {
            if (!isSpinning) {
              control.start(leaveAnimation);
            }
          }}
          onPress={onClick}
          isDisabled={disabled || isSpinning}
          className={cn(ButtonVariants({ variant, className }))}
          {...props}
        >
          {children}
        </Btn>
      </motion.div>
    );
  },
);

Button.displayName = "Button";
BasicButton.displayName = "BasicButton";

export { BasicButton, Button };
