"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";

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
import { useState } from "react";
import { cn } from "@/helpers/cn";
import { toast } from "sonner";
import { TAG_WITH_NUMBERS_REGEX } from "@/constants/regex.constants";

type Props = {
  suggestions: string[];
  value: string;
  setValue: (val: string) => void;
};

export default function AddTag({ suggestions, setValue, value }: Props) {
  const [open, setOpen] = useState(false);
  const [newSuggestions, setNewSuggestions] = useState(suggestions);
  const [inputValue, setInputValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select tag..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search tags..."
            value={inputValue}
            onValueChange={(value) => {
              if (!value) {
                setInputValue("");
                return;
              }
              if (TAG_WITH_NUMBERS_REGEX.test(value)) {
                setInputValue(value);
              } else {
                toast.error(
                  "Only lowercase alphanumeric characters and hyphen are allowed."
                );
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No tag found.</CommandEmpty>
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
                      if (value === currentValue.toLowerCase()) {
                        setValue("");
                      } else {
                        setValue(currentValue.toLowerCase());
                      }
                      setInputValue("");
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === s.value ? "opacity-100" : "opacity-0"
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
                      setValue(currentValue.toLowerCase());
                      setNewSuggestions((prev) => [
                        ...prev,
                        currentValue.toLowerCase(),
                      ]);
                      setInputValue("");
                      setOpen(false);
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
  );
}
