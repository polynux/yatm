import { FiFilter } from "solid-icons/fi";

function Header() {
  return (
    <header class="flex justify-between bg-gray-50 border-b border-gray-200 items-center px-4 md:px-6 py-3">
      <a href="/">Accueil</a>
      <input type="text" placeholder="Search" class="flex h-10 rounded-md border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-24 placeholder-gray-500 " />
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 shrink-0 border-gray-300 hover:bg-gray-200 cursor-pointer"><FiFilter />Filter</button>
    </header>
  );
}

export default Header;
