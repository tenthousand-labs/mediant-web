export default function Footer() {
  return (
    <footer className="text-sm text-center text-gray-500 mt-64">
      <nav className="flex justify-between m-4">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
        <a href="#" className="hover:underline">
          Impressum
        </a>
      </nav>
      <p className="p-6 lg:px-8">
        &copy; {new Date().getFullYear()} Cadence Engineer
      </p>
    </footer>
  );
}
