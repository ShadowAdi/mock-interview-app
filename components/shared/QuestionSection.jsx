import React, { useState } from "react";
import { Lightbulb, Volume2 } from "lucide-react";

const QuestionSection = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser do not support speech feature");
    }
  };
  return (
    <div className="p-5 rounded-lg border  my-10">
      <div className="flex w-full items-center flex-wrap  gap-5">
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question, i) => (
            <h2
              onClick={() => {
                setActiveQuestionIndex(i);
              }}
              key={i}
              className={`p-2 cursor-pointer rounded-full text-xs md:text-sm text-center ${
                activeQuestionIndex === i
                  ? "bg-[#f1774e] hover:bg-[#e56f47] text-white"
                  : "bg-secondary "
              }`}
            >
              Question- {i + 1}
            </h2>
          ))}
      </div>
      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestions &&
          mockInterviewQuestions[activeQuestionIndex]?.question}
      </h2>
      {mockInterviewQuestions && (
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)
          }
        />
      )}
      <div className="border rounded-lg p-5 bg-gray-100 mt-20">
        <h2 className="flex gap-2 items-center text-[#d5582e]">
          <Lightbulb />
          <strong> Note:</strong>
        </h2>
        <h2 className="text-sm text-[#d5582e] my-2">
          {process.env.NEXT_PUBLIC_SOME_INFO}
        </h2>
      </div>
    </div>
  );
};

export default QuestionSection;
