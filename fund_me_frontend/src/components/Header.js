import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Explore Campaigns", href: "/explore-campaigns" },
    { name: "Raise Funds", href: "/raise-funds" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userDetails = localStorage.getItem("email");

  // Deleting data from local storage to log out of google account
  const googleLogout = () => {
    localStorage.clear();
    toast.error("User Logged Out");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div>
      <div className='px-6 pt-6 lg:px-8'>
        <nav className='flex items-center justify-between' aria-label='Global'>
          <div className='flex lg:flex-1'>
            <a href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <img
                className='h-8'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                alt=''
              />
            </a>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(true)}>
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='text-sm font-semibold leading-6 text-gray-900'>
                {item.name}
              </a>
            ))}
          </div>
          {/* Check localStorage for user data, and display login/loggout button */}
          {userDetails === null ? (
            <div className='hidden lg:flex lg:flex-1 lg:justify-end mt-0 flex items-center justify-center'>
              <a
                href='/login'
                className='rounded-md bg-indigo-600 px-3.5 py-1 text-base font-semibold leading-7 text-white shadow-sm
                 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Log In <span aria-hidden='true'>&rarr;</span>
              </a>
            </div>
          ) : (
            <div className='hidden lg:flex lg:flex-1 lg:justify-end mt-0 flex items-center justify-center'>
              <button
                onClick={() => googleLogout()}
                className='rounded-md bg-indigo-600 px-3.5 py-1 text-base font-semibold leading-7 text-white shadow-sm
                 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Logout <span aria-hidden='true'>&rarr;</span>
                <ToastContainer
                  position='top-center'
                  autoClose={500}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme='dark'
                />
              </button>
            </div>
          )}
        </nav>
        <Dialog as='div' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel
            focus='true'
            className='fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden'>
            <div className='flex items-center justify-between'>
              <a href='/' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Your Company</span>
                <img
                  className='h-8'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                  alt=''
                />
              </a>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(false)}>
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'>
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='py-6'>
                  {userDetails === null ? (
                    <a
                      href='/login'
                      className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10'>
                      Log in
                    </a>
                  ) : (
                    <button
                      onClick={() => googleLogout()}
                      className='rounded-md bg-indigo-600 px-3.5 py-1 text-base font-semibold leading-7 text-white shadow-sm
                 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                      Logout <span aria-hidden='true'>&rarr;</span>
                      <ToastContainer
                        position='top-center'
                        autoClose={500}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='dark'
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
