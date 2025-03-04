"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const routes = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "profile",
        path: "/profile"
    },
];

function Navbar() {
    const pathname = usePathname(); /* Looks at current URL and sees which route  */

  return ( 
  <div className="p-4 flex flex-row justify-between items-center bg-black text-white">
    <Link href="/">
    <h1 className="text 2xl font-bold"> OwNit Fitness</h1>
    </Link>
    <div className="flex gap-x-6 text-lg item-center"> 
        {routes.map((route, idx) => (
            <Link
                key={idx}
                href={route.path}
                className={
                    pathname === route.path ? "border-b-2 border-green-500" : ""
                }
          >
            {route.name} 
          </Link>
        ))}
    </div>
    {/* routes * /}
    {/* user button */}
    </div>
    );
}

export default Navbar