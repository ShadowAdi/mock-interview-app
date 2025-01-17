"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { chatSession } from "../../utils/gemini";
import { Loader } from "lucide-react";
import { db } from "../../utils/db";
import { MockInterview } from "../../utils/schema";
import { v4 as uuid4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";


const AddnewInterview = () => {
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const INTERVIEW_QUESTIONS_COUNT = 5;
  const router = useRouter();
  const { user } = useUser();
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Job Posting ", jobPosition);
    console.log("Job Description ", jobDescription);

    console.log("Job Exepereinec ", yearsOfExperience);
    const InputText = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, years Of experience: ${yearsOfExperience} Depends on Job Description, Job Position and Years of Experience give me  ${INTERVIEW_QUESTIONS_COUNT} interview Question Along With Answer in JSON Format , Give Questions And Answer as Field in JSON`;

    const result = await chatSession.sendMessage(InputText);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuid4(),
          jsonMockResp: MockJsonResp,
          jobDescription: jobDescription,
          jobPosition: jobPosition,
          jobExperience: yearsOfExperience,
          createdBy: user.primaryEmailAddress.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });
      console.log("Mock Id ", resp);
      if (resp) {
        setOpenDialogue(false);
        router.push(`/dashboard/interview/${resp[0].mockId}`);
      }
    } else {
      console.log("Error happens ", MockJsonResp);
    }

    setLoading(false);
  };
  return (
    <div>
      <div
        onClick={() => setOpenDialogue(true)}
        className="p-6 border  px-12 rounded-lg bg-[#f1774e] text-white
         hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className=" text-xl font-semibold text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialogue}>
        <DialogContent className="max-w-3xl flex flex-col gap-4 overflow-y-auto max-h-[80%]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview?
            </DialogTitle>
            <h2>
              Add Details about your job position/role, Job Description and
              years of experience.
            </h2>
          </DialogHeader>
          <form onSubmit={formSubmit} className="flex flex-col gap-4  w-full">
            <div className="flex flex-col gap-5 mt-7 ">
              <div className="  flex flex-col gap-2">
                <Label>Job Role/Job Position</Label>
                <Input
                  onChange={(e) => setJobPosition(e.target.value)}
                  required
                  placeholder="Ex. Full Stack Developr"
                />
              </div>
              <div className=" flex flex-col gap-2">
                <Label>Job Description/Tech Stack</Label>
                <Textarea
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                  rows={5}
                  placeholder="Tell us more about your job"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Years Of Experience</Label>
                <Input
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  max={60}
                  min={0}
                  required
                  type="number"
                  placeholder="Ex. 5"
                />
              </div>
            </div>
            <div className="flex justify-end gap-5">
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  setOpenDialogue(false);
                }}
                className="border-gray-500/30 border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#f1774e] hover:bg-[#e56f47]"
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddnewInterview;
