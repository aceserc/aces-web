"use client";

import * as React from "react";
import { LuChevronsUpDown as ChevronsUpDown } from "react-icons/lu";
import { MdCheck as Check } from "react-icons/md";

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
import { cn } from "@/helpers/cn";
import { handleGetTrainingsService, IHandleGetTrainingsServiceResponse } from "@/services/training-and-workshops";
import { useQuery } from "@tanstack/react-query";

type Props = {
  onSelect: (id: string) => void;
};

const SelectEvent = ({ onSelect }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { data, isLoading } = useQuery<IHandleGetTrainingsServiceResponse>({
    queryKey: ["training-and-workshops", {}],
    queryFn: () => handleGetTrainingsService({}),
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={isLoading}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? data?.trainings?.find((training) => training._id === value)?.title
            : "Select event..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search event..." />
          <CommandList>
            <CommandEmpty>No event found.</CommandEmpty>
            <CommandGroup>
              {data?.trainings.map((training) => (
                <CommandItem
                  key={training._id}
                  value={training._id}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === training._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {training.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectEvent;
