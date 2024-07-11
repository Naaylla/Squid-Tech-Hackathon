import React from "react";
import { Link } from 'react-router-dom';
import ProgressBar from "../../components/Progressbar";
import LineChart from "../../components/Linechart";
import LineChart2 from "../../components/Linechart2";
import Navbar from "../../components/Navbar";
import Chat from "../../components/Chat";

export default function Dashboard() {
    return (
        <>
        <div className="border">
        <Navbar></Navbar>

        </div>
<Chat></Chat>
        <div className="flex gap-6 flex-col p-32">
        <p className="text-2xl text-gray-900 font-bold text-center">Suivi de l'impact écologique</p>

           <div className="flex w-full tems-center justify-center">
            <div className="md:w-[60vw] h-[60vh]  rounded-lg shadow-md bg-white p-8 flex flex-col  font-bold font-[Inter] border-2 border-gray-100">
            <div className="flex flex-row justify-start mb-3 w-[14vw] ml-10">

              <h1 className="text-2xl text-gray-800 text-left w-full">
                Plantation
              </h1>
                 <span className="text-green-500 text-sm p-1 bg-slate-100 rounded-md"> +24.24% </span>
            </div>
            <div className="w-[45vw] h-[50vh] ml-14">

          <LineChart></LineChart>
            </div>
            </div>
            </div>
    
              <div className="flex w-full  items-center justify-center">
              <div className="md:w-[60vw] h-[30vh] rounded-lg shadow-md bg-white p-8 flex flex-col  font-bold font-[Inter] border-2 border-gray-100">
              <p className="text-5xl pl-5 pb-3 text-[#3B3D53]">
                60%
                </p> 
              <div className="flex flex-row justify-start w-[50vw] pl-5">
  
              <h1 className="text-md text-left w-full">
              Objectif pour cette année : 100 000 arbres plantés
              </h1>
                 
              </div>

              <ProgressBar></ProgressBar>
                 
              </div>
              
               </div>
              <h1 className="text-md text-center text-black font-bold text-2xl w-full">
              Nombres de déchets recyclés
              </h1>
               
              <div className="flex w-full  items-center justify-center">
              <div className="md:w-[60vw] h-[27vh] rounded-lg shadow-md bg-white   flex flex-col  font-bold font-[Inter] border-2 border-gray-100">

              <div className="flex h-[20vh] flex-col w-[50vw]">
                <div className="flex flex-row h-[15vh] items-center text-center justify-between w-[50vw]">
               <p className="text-black text-xl ml-5 mt-[10vh]">
                Percentage de déchets recyclés ce mois
                </p>

             
                <div className="h-1">

                <div className="radial-progress text-green-300" style={{ "--value": "50", "--size": "6rem", "--thickness": "10px" }} role="progressbar">
                    <p className="text-3xl">
                        50%
                        </p>
                    </div>

                </div>
                </div>
              </div>

                 
              </div>
              
          </div>
             
         
                </div>
               
              

                 
           
              
         
              
          <div className="flex w-full  items-center justify-center">
              <div className="md:w-[60vw] h-[20vh] rounded-lg shadow-md bg-white   flex flex-col  font-bold font-[Inter] border-2 border-gray-100">

              <div className="flex h-[15vh] flex-col w-[50vw]">
                <div className="flex flex-row h-[15vh] items-center text-center justify-between w-[50vw]">
                    <div className="flex flex-col">

                <p className="text-black text-3xl ml-5 mt-[5vh]">
                500KG
                </p>
               <p className="text-gray text-xl ml-[5vw] mt-[1vh]">
                Déchets recyclés 
                </p>
                    </div>

             
                <div className="h-[15vh] pt-10">

            <LineChart2></LineChart2>

                </div>
                </div>
              </div>
                 
              </div>
              
          </div>


       
         
       
     </>
    );
}
