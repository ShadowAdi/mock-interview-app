"use client";
import {
  CollapsibleContent,
  Collapsible,
  CollapsibleTrigger,
} from "../../../../../@/components/ui/collapsible";
import { Button } from "../../../../../components/ui/button";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FeedbackPage = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState(null);
  const [averageRating, setAverageRating] = useState(0); // Add a state for average rating

  const interviewId = React.use(params).interviewId; // Access the interviewId after unwrapping
  useEffect(() => {
    GetFeddbacks();
  }, [interviewId]);

  const GetFeddbacks = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);

    if (result && result.length > 0) {
      // Convert ratings to numbers and calculate total
      const totalRating = result.reduce(
        (sum, feedback) => sum + (Number(feedback.rating) || 0),
        0
      );
      // Calculate average and round to nearest whole number
      const avgRating = Math.round(totalRating / result.length);
      setAverageRating(avgRating);
    }
  };
  return (
    <div className="p-10 ">
      <h1 className="text-3xl font-bold text-green-500">Congratulations</h1>
      <h1 className="font-bold text-2xl ">Here, Is your Interview Feedback</h1>

      {feedbackList && feedbackList.length === 0 ? (
        <h2 className="font-bold text-gray-500 text-2xl">
          No Interview Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-lg my-3 text-[#f1774e] ">
            Your Overall interview rating: <strong>{averageRating}</strong>
          </h2>
          <p className="text-sm text-gray-500">
            Find Below interview question with correct answer, Your answer and
            and feedback for imporovement
          </p>
          {feedbackList &&
            feedbackList.map((feedback, i) => {
              return (
                <Collapsible className="mt-7 mb-4" key={i}>
                  <CollapsibleTrigger className="p-2 flex items-center justify-between bg-secondary rounded-lg  my-2 text-left gap-10 w-full">
                    {feedback?.question} <ChevronsUpDown className="h-5 w-5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-col gap-3">
                      <h2 className="text-red-500 p-2 border rounded-lg">
                        <strong>Rating: </strong> {feedback.rating}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                        <strong>Your Answer:</strong>
                        {feedback.userAns}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                        <strong>Correct Answer:</strong>
                        {feedback.correctAns}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-orange-50 text-sm text-orange-600">
                        <strong>Feedback:</strong>
                        {feedback.feedback}
                      </h2>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
        </>
      )}

      <Button
        className="my-4 bg-[#f1774e] hover:bg-[#d65d34]"
        onClick={() => {
          router.replace("/dashboard");
        }}
      >
        Go Home
      </Button>
    </div>
  );
};

export default FeedbackPage;
