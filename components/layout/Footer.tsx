import clsx from 'clsx';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <nav className="flex justify-between">
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
      <p className="mt-4 text-center">
        &copy; {new Date().getFullYear()} Cadence Engineer
      </p>
    </>
  );
}
