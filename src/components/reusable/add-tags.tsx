"use client";
import React, { useState } from "react";

type Props = {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  suggestions: string[];
};

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/helpers/cn";
import { TAG_REGEX } from "@/constants/regex.constants";
import { toast } from "sonner";

const AddTags = ({ onChange, selectedTags, suggestions }: Props) => {
  const [newSuggestions, setNewSuggestions] = useState(suggestions);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold px-1">Selected tags:</span>
      <div className="flex flex-wrap gap-2 my-1">
        {selectedTags?.length < 1 ? (
          <span className="text-xs text-gray-500 ml-3">No tags selected.</span>
        ) : (
          selectedTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-sm bg-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))
        )}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select Tag
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search or add tag..."
              value={inputValue}
              onValueChange={(value) => {
                if (!value) {
                  setInputValue("");
                  return;
                }
                if (TAG_REGEX.test(value)) {
                  setInputValue(value);
                } else {
                  toast.error(
                    "Only lowercase alphabets and hyphen are allowed."
                  );
                }
              }}
            />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {newSuggestions
                  .map((s) => ({
                    label: s.toLowerCase(),
                    value: s.toLowerCase(),
                  }))
                  .map((s) => (
                    <CommandItem
                      key={s.value}
                      value={s.value}
                      onSelect={(currentValue) => {
                        if (selectedTags.includes(currentValue.toLowerCase())) {
                          onChange(
                            selectedTags.filter((tag) => tag !== currentValue)
                          );
                        } else {
                          onChange([...selectedTags, currentValue]);
                        }
                        setInputValue("");
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTags.includes(s.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {s.label}
                    </CommandItem>
                  ))}
                {inputValue &&
                  !newSuggestions
                    .map((s) => s.toLowerCase())
                    .includes(inputValue.toLowerCase()) && (
                    <CommandItem
                      key={inputValue}
                      value={inputValue}
                      onSelect={(currentValue) => {
                        onChange([...selectedTags, currentValue.toLowerCase()]);
                        setNewSuggestions((prev) => [
                          ...prev,
                          currentValue.toLowerCase(),
                        ]);
                        setInputValue("");
                      }}
                    >
                      <Plus className={cn("mr-2 h-4 w-4")} />
                      {inputValue}
                    </CommandItem>
                  )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddTags;
