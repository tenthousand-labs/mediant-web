import clsx from 'clsx';

type FieldErrorProps = {
  message?: string;
  className?: string;
};

export default function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p
      className={clsx(
        'text-xs font-medium text-red-500 dark:text-red-400',
        className
      )}
    >
      {message}
    </p>
  );
}
