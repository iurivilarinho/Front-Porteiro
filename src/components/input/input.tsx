import * as React from "react";
import { ButtonProps } from "../button/button";
import { Label } from "../input/label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Notification, NotificationProps } from "./notification";

const inputVariants = cva(
  `flex w-full items-center overflow-hidden rounded-md border bg-transparent 
px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent 
file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-1 
focus-visible:outline-none`,
  {
    variants: {
      variant: {
        default: "border-input focus-within:border-ring focus-within:ring-ring",
        destructive:
          "border-destructive focus-within:border-destructive focus-within:ring-destructive",
      },
      inputSize: {
        default: "h-10",
        sm: "h-8",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  buttonProps?: ButtonProps;
  label?: string;
  notification?: NotificationProps;
  decorationLeft?: React.ReactNode;
  decorationRight?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      notification,
      label,
      decorationLeft,
      decorationRight,
      leftIcon,
      rightIcon,
      inputSize,
      className,
      ...inputProps
    },
    ref,
  ) => {
    return (
      <div className={cn("flex items-end justify-between gap-3", className)}>
        <div className="grid w-full gap-1">
          <div className="grid w-full gap-3">
            {label && <Label htmlFor={inputProps?.id}>{label}</Label>}
            <div className="flex items-center gap-2">
              {decorationLeft && <>{decorationLeft}</>}
              <div
                className={cn(
                  inputVariants({
                    inputSize,
                    variant: notification?.isError ? "destructive" : "default",
                  }),
                  "bg-transparent px-4",
                )}
              >
                {leftIcon && <>{leftIcon}</>}
                <input
                  ref={ref}
                  className="h-full w-full border-none bg-transparent placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:opacity-50"
                  {...inputProps}
                />
                {rightIcon && <>{rightIcon}</>}
              </div>
              {decorationRight && <>{decorationRight}</>}
            </div>
          </div>
          {notification && <Notification {...notification} />}
        </div>
      </div>
    );
  },
);

export { Input };