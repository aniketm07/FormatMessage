import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'
import Logo from "../assets/message.svg";
import ProfileDropdown from './ProfileDropdown';

const navigation = [
  { name: 'Generate With AI', href: '/generate' },
  { name: 'Format', href: '/format' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <a href="/">
                <img alt="Format Message" src={Logo} className="h-8 w-auto" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 cursor-pointer">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname === item.href
                      ? "border-indigo-500 border-b-3 text-gray-900"
                      : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 ease-in-out duration-200"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Notification and Profile Section */}
          {/* <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <ProfileDropdown /> 
          </div> */}

          {/* Mobile Menu Button */}
          {/* <div className="-mr-2 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <Bars3Icon className="block size-6" aria-hidden="true" />
              <XMarkIcon className="hidden size-6" aria-hidden="true" />
            </DisclosureButton>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                location.pathname === item.href
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 ease-in-out duration-200"
              }`}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}