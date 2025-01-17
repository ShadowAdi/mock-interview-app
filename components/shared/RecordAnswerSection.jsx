"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../utils/gemini";
import { db } from "../../utils/db";
import { UserAnswer } from "../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  getInterview,
  handleSaveState,
  setIsRecording,
  setActiveQuestionIndex,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Clear user answer when question changes
  useEffect(() => {
    setUserAnswer("");
    setResults([]);
  }, [activeQuestionIndex]);

  useEffect(() => {
    // Combine new results with existing answer
    const newTranscript = results[results.length - 1]?.transcript;
    if (newTranscript) {
      setUserAnswer((prev) => `${prev}${newTranscript}`);
    }
  }, [results]);

  useEffect(() => {
    // Only try to save if recording has stopped and we have a meaningful answer
    if (!isRecording && userAnswer.length > 10) {
      handleSaveState(true);
      UpdateUserAnswer();
    }
  }, [isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      setIsRecording(false);
    } else {
      setUserAnswer(""); // Clear previous answer when starting new recording
      startSpeechToText();
      setIsRecording(true);
    }
  };

  const UpdateUserAnswer = async () => {
    try {
      setLoading(true);

      if (!mockInterviewQuestions?.[activeQuestionIndex]?.question) {
        throw new Error("Question not found");
      }

      const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex].question}, User Answer: ${userAnswer}, Depends on question and user answer for given interview question please give us feedback and area of improvement if any in just 3-5 lines to improve it in JSON Format with rating field and feedback field. You Can Give rating to the user answer from 1-5`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const JsonFeedbackResp = JSON.parse(MockJsonResp);

      const fullTranscript = results
        .map((result) => result.transcript)
        .join(" ");
      setUserAnswer(fullTranscript);
      console.log("User Answer ", userAnswer);

      await db.insert(UserAnswer).values({
        mockIdRef: getInterview?.mockId,
        question: mockInterviewQuestions[activeQuestionIndex].question,
        correctAns: mockInterviewQuestions[activeQuestionIndex].answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      toast.success("Answer saved successfully");
      setUserAnswer("");
      setResults([]);
    } catch (error) {
      console.error("Error saving answer:", error);
      toast.error("Failed to save answer. Please try again.");
    } finally {
      setLoading(false);
      setIsRecording(false);
      handleSaveState(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-lg bg-black p-5 mt-20">
        <Image
          alt="mic image"
          src="/Webcam.jpg"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{ width: "100%", height: 300, zIndex: 10 }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="flex gap-2 items-center text-red-600">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      {userAnswer && (
        <div className="w-full p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Current Answer:</h3>
          <p>{userAnswer}</p>
        </div>
      )}
    </div>
  );
};

export default RecordAnswerSection;
