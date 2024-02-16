import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';

export default function Example(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
        <div className="bg-white shadow-2xl">
          <div className="navbar fixed-top">
            <div className="container sm:px-4 lg:px-8 flex flex-wrap items-center justify-between lg:flex-nowrap">
              <p className="text-white font-semibold text-3xl leading-4 no-underline page-scroll">Spotlio</p>
              
              <button className="background-transparent rounded text-xl leading-none hover:no-underline focus:no-underline lg:hidden lg:text-gray-400" onClick={toggleMenu}>
                <span className="navbar-toggler-icon inline-block w-8 h-8 align-middle"></span>
              </button>
              
              <div className={`navbar-collapse offcanvas-collapse lg:flex lg:flex-grow lg:items-center ${isOpen ? 'block' : 'hidden'} lg:w-auto`}>
                <ul className="pl-0 mt-3 mb-2 ml-auto flex flex-col list-none lg:mt-0 lg:mb-0 lg:flex-row mx-auto">
                  <li>
                    <a className="nav-link page-scroll mx-3 px-1" href="/">Home</a>
                  </li>
                  <li>
                    <a className="nav-link page-scroll mx-3 px-1 " href="/about">About</a>
                  </li>
                  <li>
                    <a className="nav-link page-scroll mx-3 px-1 " href="/blog">Blog</a>
                  </li>
                  <li>
                    <a className="nav-link page-scroll mx-3 px-1 " href="/Calendar">Calendar</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {props.children}
        </>
      )}
    </Disclosure>
  )
}
