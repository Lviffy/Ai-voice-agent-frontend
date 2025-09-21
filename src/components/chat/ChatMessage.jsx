export const ChatMessage = ({
  name,
  message,
  accentColor,
  isSelf,
}) => {
  return (
    <div className={`flex flex-col gap-1 mb-4 ${isSelf ? 'items-end' : 'items-start'}`}>
      <div className={`text-xs font-semibold ${isSelf ? 'text-muted-foreground' : 'text-primary'}`}>
        {name}
      </div>
      <div
        className={`max-w-3/4 p-3 rounded-lg ${
          isSelf
            ? 'bg-muted text-muted-foreground'
            : 'bg-primary/10 text-foreground'
        }`}
      >
        {message}
      </div>
    </div>
  );
};
