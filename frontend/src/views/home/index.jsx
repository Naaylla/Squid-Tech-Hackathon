import React from "react";
import Feed from "../../components/Feed"
import Navbar from "../../components/Navbar"

export default function Home() {
    return (

        <div className="h-full w-full bg-white">
            <Navbar></Navbar>
            <div className="flex py-24 justify-center items-center">
                <Feed></Feed>

            </div>
        </div>
    )
}
