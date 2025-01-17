"use client";
import { Button } from "../../../../components/ui/button";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const InterviewPage = ({ params }) => {
  const [getInterview, setGetInterview] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  // Directly using params.interviewId without useRouter
  const interviewId = React.use(params).interviewId; // Access the interviewId after unwrapping

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails(interviewId);
    }
  }, [interviewId]);

  const GetInterviewDetails = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));
      setGetInterview(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <main className="my-10 ">
      <h1 className="font-bold text-2xl">Let's Get Started</h1>
      <div className=" grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-5 my-5 ">
          <div className="flex flex-col gap-5 p-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role: </strong>
              {getInterview ? getInterview.jobPosition : "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description: </strong>
              {getInterview ? getInterview.jobDescription : "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Years Of Experience: </strong>
              {getInterview ? getInterview.jobExperience : "Loading..."}
            </h2>
          </div>
          <div className="p-5 border rounded-lg  border-yellow-300 bg-yellow-200">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="text-yellow-500 mt-3">
              {process.env.NEXT_PUBLIC_SOME_INFO}
            </h2>
          </div>
        </div>
        {webCamEnabled ? (
          <Webcam
            style={{ height: 300, width: 300 }}
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
          />
        ) : (
          <div className="flex flex-col gap-1 items-center justify-center">
            <WebcamIcon className="h-72 w-full my-3 p-20 bg-secondary rounded-lg" />
            <Button
              variant="ghost"
              onClick={() => {
                setWebCamEnabled(true);
              }}
              className="bg-[#f1774e] hover:bg-[#e56f47]
               text-white hover:text-white  font-semibold "
            >
              Enable Web Cam And Microphone
            </Button>
          </div>
        )}
      </div>
      <div className="md:mt-2 mt-5 flex justify-end items-end">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button className="bg-[#f1774e] hover:bg-[#e56f47]">
            Start Interview
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default InterviewPage;
