import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-sm text-center text-gray-500 mt-64">
      <nav className="flex justify-between m-4">
        <Link
          href="/privacy-policy"
          className="hover:underline bg-transparent border-none p-0 m-0 text-inherit cursor-pointer"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms-of-service"
          className="hover:underline bg-transparent border-none p-0 m-0 text-inherit cursor-pointer"
        >
          Terms of Service
        </Link>
        <Link
          href="/impressum"
          className="hover:underline bg-transparent border-none p-0 m-0 text-inherit cursor-pointer"
        >
          Impressum
        </Link>
      </nav>
      <p className="p-6 lg:px-8">
        &copy; {new Date().getFullYear()} Cadence Engineer
      </p>
    </footer>
  );
}
