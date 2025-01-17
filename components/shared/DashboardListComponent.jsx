"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/db";
import { MockInterview } from "../../utils/schema";
import { desc, eq } from "drizzle-orm";
import { InterviewItemCard } from "./InterviewItemCard";
import { Loader } from "lucide-react";
export const DashboardListComponent = () => {
  const { user } = useUser();
  const [getInterviews, setGetInterviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      GetInterviewList();
    }
    setLoading(false);
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress))
      .orderBy(desc(MockInterview.id));

    setGetInterviews(result);
  };
  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      {!loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4">
          {getInterviews &&
            getInterviews.map((interview, idx) => (
              <InterviewItemCard key={idx} interview={interview} />
            ))}
        </div>
      ) : (
        <div className="border w-max mt-4 flex gap-3 items-center shadow-sm p-3 rounded-lg">
          <span className="text-[#f1774e] text-base">Loading...</span>
          <Loader className="animate-spin h-6 w-6" />
        </div>
      )}
    </div>
  );
};
