import clsx from 'clsx';
import Link from 'next/link';

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={clsx('mt-64 text-center text-sm text-gray-500', className)}>
      <nav className="m-4 flex justify-between">
        <Link
          href="/privacy-policy"
          className="cursor-pointer bg-transparent p-0 text-inherit hover:underline"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms-of-service"
          className="cursor-pointer bg-transparent p-0 text-inherit hover:underline"
        >
          Terms of Service
        </Link>
        <Link
          href="/impressum"
          className="cursor-pointer bg-transparent p-0 text-inherit hover:underline"
        >
          Impressum
        </Link>
      </nav>
      <p className="p-6 lg:px-8">&copy; {new Date().getFullYear()} Cadence Engineer</p>
    </footer>
  );
}
