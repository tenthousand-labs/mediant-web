export default function Footer() {
  return (
    <footer className="text-sm text-center text-gray-500 mt-64">
      <nav className="flex justify-between m-4">
        <button
          type="button"
          className="hover:underline bg-transparent border-none p-0 m-0 text-inherit cursor-pointer"
        >
          Privacy Policy
        </button>
        <button
          type="button"
          className="hover:underline bg-transparent border-none p-0 m-0 text-inherit cursor-pointer"
        >
          Terms of Service
        </button>
        <button
          type="button"
          className="hover:underline bg-transparent border-none p-0 m-0 text-inherit cursor-pointer"
        >
          Impressum
        </button>
      </nav>
      <p className="p-6 lg:px-8">
        &copy; {new Date().getFullYear()} Cadence Engineer
      </p>
    </footer>
  );
}
