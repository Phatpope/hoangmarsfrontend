'use client';
import Link from "next/link";
import React from "react";
import Item from "./Iten";
import Filter from "./Filter";


// HelloWorld.js


const Container = () => {
  return (
    <div className="flex mx-20 text-white bg-white">
      <div>
        <Filter/>
      </div>
      <div>

        <Item/>
      </div>

    </div>
  );
};

export default Container;
