import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

// TODO: To be integrated
export default function ProfileDropdown() {
  return (
    <Menu as="div" className="relative ml-3 cursor-pointer">
        <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <img
            alt="User"
            src="https://www.gravatar.com/avatar/?d=identicon"
            className="size-8 rounded-full"
          />
        </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <MenuItem>
          <a
            href="/logout"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}