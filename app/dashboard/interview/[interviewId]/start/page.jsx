"use client";
import { MockInterview } from "../../../../../utils/schema";
import QuestionSection from "../../../../../components/shared/QuestionSection";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import RecordAnswerSection from "../../../../../components/shared/RecordAnswerSection";
import { Button } from "../../../../../components/ui/button";
import Link from "next/link";

const InterviewStart = ({ params }) => {
  const [getInterview, setGetInterview] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState(null);
  const interviewId = React.use(params).interviewId; // Access the interviewId after unwrapping
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false); // Track saving state
  const [isRecording, setIsRecording] = useState(false); // Track recording state

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
      const JsonMockData = JSON.parse(result[0].jsonMockResp);
      setGetInterview(result[0]);
      setMockInterviewQuestions(JsonMockData);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  const handleSaveState = (state) => {
    setIsSaving(state); // Callback to set saving state
  };

  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
        <RecordAnswerSection
          getInterview={getInterview}
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          handleSaveState={handleSaveState} // Pass save state handler
          setActiveQuestionIndex={setActiveQuestionIndex}
          setIsRecording={setIsRecording} // Pass recording state handler
        />
      </div>
      <div className="flex gap-6 items-center justify-end">
        {activeQuestionIndex > 0 && (
          <Button
            className="bg-[#f1774e] hover:bg-[#d25a32]"
            disabled={isSaving || isRecording} // Disable button when saving or recording
            onClick={() => {
              if (activeQuestionIndex > 0) {
                setActiveQuestionIndex(activeQuestionIndex - 1);
              }
            }}
          >
            Previous Question
          </Button>
        )}
        {mockInterviewQuestions &&
          activeQuestionIndex !== mockInterviewQuestions?.length - 1 && (
            <Button
              className="bg-[#f1774e] hover:bg-[#d25a32]"
              disabled={isSaving || isRecording} // Disable button when saving or recording
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next Question
            </Button>
          )}
        {mockInterviewQuestions &&
          activeQuestionIndex === mockInterviewQuestions?.length - 1 && (
            <Link
              href={
                "/dashboard/interview/" + getInterview?.mockId + "/feedback"
              }
            >
              <Button
                className="bg-[#f1774e] hover:bg-[#d25a32]"
                disabled={isSaving || isRecording} // Disable button when saving or recording
              >
                End Interview
              </Button>
            </Link>
          )}
      </div>
    </div>
  );
};

export default InterviewStart;
