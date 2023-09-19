"use client";

import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";

function Header() {
  return (
    <header>
      <div className=" absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] filter blur-3xl -z-50" />
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-400/10">
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="trello logo"
          height={100}
          width={300}
          className="w-44 md:w-56 pb-10 md:pb-0 ml-2 pt-2"
        />
        <div className="flex p-2 items-center space-x-2 w-full md:justify-end mr-2">
          {/* search box */}
          <form className="flex items-center space-x-5 bg-white rounded-md shadow-md p-2 mx-3 flex-1 md:flex-initial ">
            <MagnifyingGlassIcon className="h-4 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          {/* avatar */}
          <Avatar name="Ratish Jain" round size="50" color="#0096FF" />
        </div>
      </div>
      <div className="flex items-center justify-center my-5 ">
        <p className="flex items-center shadow-xl p-5 rounded-xl pr-5 w-fit font-light max-w-3xl text-[#0055D1] bg-white">
          <UserCircleIcon className="h-10 w-10 text-[#0096FF] p-1" />
          GPT is summarising your tasks for the day....
        </p>
      </div>
    </header>
  );
}
export default Header;
