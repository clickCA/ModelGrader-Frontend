"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { ProgrammingLanguageOptions } from "../constants/ProgrammingLanguage";
import { TestcaseStatusIndicatorColor } from "../constants/TestcaseStatusIndicatorColor";
import { cn } from "../lib/utils";
import {
  SubmissionPopulateSubmissionTestcasesSecureModel,
  SubmissionTestcaseSecureModel,
} from "../types/models/Submission.model";
import { readableDateFormat } from "../utilities/ReadableDateFormat";
import { Button } from "./shadcn/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./shadcn/Command";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/Popover";
import { ScrollArea } from "./shadcn/ScrollArea";
import { Separator } from "./shadcn/Seperator";

const TestcaseGradingMiniResult = ({
  status,
}: {
  status: TestcaseGradingResultStatus;
}) => {
  return (
    <div
      className={
        "px-1 py-2 cursor-pointer " +
        "bg-" +
        TestcaseStatusIndicatorColor[status]
      }
    ></div>
  );
};

const TestcasesGradingMiniIndicator = ({
  submissionTestcases,
}: {
  submissionTestcases?: SubmissionTestcaseSecureModel[];
}) => {
  return (
    <div className="flex gap-0.5 items-center">
      {submissionTestcases?.map((testcase, index) => (
        <TestcaseGradingMiniResult
          key={index}
          status={testcase.runtime_status as TestcaseGradingResultStatus}
        />
      ))}
    </div>
  );
};

const OptionLabel = ({
  submission,
}: {
  submission: SubmissionPopulateSubmissionTestcasesSecureModel;
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="font-mono text-xs 2xl:text-base flex items-center gap-2">
          <span className="hidden 2xl:block">
            {readableDateFormat(submission?.date)}{" "}
          </span>
          <span className="block 2xl:hidden">
            {readableDateFormat(submission?.date, true)}
          </span>
          {
            ProgrammingLanguageOptions.find(
              (Languages) => Languages.value === submission?.language
            )?.badge
          }
        </div>
        <div>
          <TestcasesGradingMiniIndicator
            submissionTestcases={submission?.runtime_output}
          />
        </div>
      </div>
    </div>
  );
};

export function PreviousSubmissionsCombobox({
  submissions = [],
  bestSubmission,
  onSelect,
}: {
  submissions: SubmissionPopulateSubmissionTestcasesSecureModel[];
  bestSubmission: SubmissionPopulateSubmissionTestcasesSecureModel;
  onSelect?: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const bestOptions = {
    label: <OptionLabel submission={bestSubmission} />,
    value: String(bestSubmission?.submission_id),
  };

  const options = submissions.map((submission) => ({
    label: <OptionLabel submission={submission} />,
    value: String(submission?.submission_id),
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={submissions.length === 0} asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[500px] justify-between"
        >
          {value
            ? options.find((framework) => framework.value === value)?.label
            : submissions.length === 0
            ? "No Previous Submission"
            : "Previous Submissions"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput placeholder={"Select Previous Submissions ..."} />
          <CommandEmpty>{"Not found"}</CommandEmpty>
          <div className="mt-2 ml-2 text-sm font-bold">Best Submission</div>
          <CommandGroup>
            <div className="pr-1">
              <CommandItem
                key={bestOptions.value}
                value={bestOptions.value}
                onSelect={(currentValue) => {
                  if (onSelect) {
                    onSelect(currentValue);
                  }
                  // setValue(currentValue === value ? "" : currentValue)
                  setValue(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-green-400",
                    value === bestOptions.value ? "opacity-100" : "opacity-0"
                  )}
                />

                {bestOptions.label}
              </CommandItem>
            </div>
          </CommandGroup>
          <Separator />
          <CommandGroup>
            <ScrollArea className="h-[50vh] pr-1">
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    if (onSelect) {
                      onSelect(currentValue);
                    }
                    // setValue(currentValue === value ? "" : currentValue)
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-green-400",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />

                  {framework.label}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default PreviousSubmissionsCombobox;
