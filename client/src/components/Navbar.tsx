import React from "react";

export const Navbar = () => {
  return (
    <aside className="w-72 min-h-screen" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 m-4 bg-gray-50 rounded-lg dark:bg-bg-500">
        <ul className="space-y-2">
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="ml-3">Dashboard</span>
            </button>
          </li>
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
              <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </button>
          </li>
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
              <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                3
              </span>
            </button>
          </li>
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
            </button>
          </li>
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
            </button>
          </li>
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
            </button>
          </li>
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
            </button>
          </li>
        </ul>
        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
              <span className="ml-4">Upgrade to Pro</span>
            </button>
          </li>
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
              <span className="ml-3">Documentation</span>
            </button>
          </li>
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
              <span className="ml-3">Components</span>
            </button>
          </li>
          <li>
            <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
              <span className="ml-3">Help</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};
