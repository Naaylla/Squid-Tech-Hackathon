import React from "react";
import Feed from "../../components/Feed";
import Navbar from "../../components/Navbar";
import Chat from "../../components/Chat";

export default function Home() {
    return (
        <>
            <Chat></Chat>
            <div className="h-full w-full bg-white">
                <Navbar />
                <div className="flex py-24 justify-center items-center">
                    <Feed />
                </div>
            </div>
        </>
    );
}
