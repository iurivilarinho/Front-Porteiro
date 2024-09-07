import * as React from "react";
import { cn } from "@/lib/utils";
import { Notification, NotificationProps } from "../input/notification";
import { Label } from "../input/label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  notification?: NotificationProps;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, notification, label, ...props }, ref) => {
    return (
      <div className={cn("grid w-full gap-1", className)}>
        <div className="grid w-full gap-3">
          {label && <Label htmlFor={props?.id}>{label}</Label>}
          <textarea
            className={cn(
              "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            )}
            ref={ref}
            {...props}
          />
        </div>
        {notification && <Notification {...notification} />}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
