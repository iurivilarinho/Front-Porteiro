export interface NotificationProps {
  notification?: string;
  isError?: boolean;
}

const Notification = ({ notification, isError }: NotificationProps) => {
  const textColor = isError ? "text-destructive" : "text-muted-foreground";

  return (
    <div className="h-3">
      <p className={`text-xs ${textColor}`}>{notification}</p>
    </div>
  );
};

export { Notification };
