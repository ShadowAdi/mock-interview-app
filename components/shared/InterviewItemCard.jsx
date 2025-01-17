import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  return (
    <div className="border shadow-sm p-3 rounded-lg">
      <h2 className="font-bold text-[#f1774e]">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview.jobExperience} Years Of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview.createdAt}
      </h2>
      <div className="flex gap-5 items-center justify-between mt-3">
        <Button
          onClick={() => {
            router.push("/dashboard/interview/" + interview.mockId);
          }}
          size="sm"
          variant="outline"
        >
          Feedback
        </Button>

        <Button
          onClick={() => {
            router.push(
              "/dashboard/interview/" + interview.mockId + "/feedback"
            );
          }}
          className="flex-1 bg-[#f1774e] hover:bg-[#d65d34]"
          size="sm"
        >
          Start
        </Button>
      </div>
    </div>
  );
};
