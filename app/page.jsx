"use client";
import { useUser } from "@clerk/nextjs";
import LogoComponent from "../components/shared/LogoComponent";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  return (
    <main className="flex min-h-screen w-full flex-col gap-4 items-center">
      <header className="w-[94%] flex justify-between items-center mx-auto py-3 border-b-[2px] border-b-gray-300/40">
        <LogoComponent />
        {isLoaded && isSignedIn ? (
          <div className="flex gap-3 items-center">
            <Link href={"/dashboard"}>
              <Button className="bg-[#f1774e] text-white hover:bg-[#d25d36]">
                Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <Link href={"/sign-in"}>
              <Button className="bg-secondary text-black">Login</Button>
            </Link>
          </div>
        )}
      </header>

      <section className="flex gap-4 flex-col py-6 w-[94%]  flex-1 items-center justify-start">
        <h2 className="sm:text-6xl text-2xl font-bold text-[#f1774e]">Mocky</h2>
        <p className="text-base w-[80%] md:w-[60%] text-gray-800/90 text-center">
          I developed an AI-powered interview preparation app where users can
          practice by answering dynamically generated interview questions. The
          app provides real-time feedback, ratings, and areas for improvement to
          enhance users' performance.
        </p>
        <Image src={"/home.png"} width={800} height={800} alt="Main Image" />
        <div className="flex w-full my-4 gap-4 items-center">
          {isLoaded && isSignedIn ? (
            <div className="flex w-full justify-center gap-3 items-center">
              <Link href={"/dashboard"}>
                <Button className="bg-[#f1774e] py-8 px-9 cursor-pointer  text-2xl rounded-full text-white font-semibold hover:bg-[#d25d36]">
                  Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex w-full justify-center gap-3 items-center">
              <Link href={"/sign-in"}>
                <Button className="bg-secondary text-black py-8 px-9 cursor-pointer  text-2xl rounded-full  font-semibold">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
