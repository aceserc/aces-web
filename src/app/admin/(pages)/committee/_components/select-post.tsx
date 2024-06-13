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
import { COMMITTEES_POST } from "@/constants/committees-post.constant";

type Props = {
  occupiedPosts: string[];
  setPost: (post: string) => void;
};

const SelectPost = ({ occupiedPosts = [], setPost }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const posts = COMMITTEES_POST.map((post) => ({
    value: post.post,
    label: post.post,
    disabled: occupiedPosts.includes(post.post) && !post.multiple,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? posts.find((post) => post.value === value)?.label
            : "Select post..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search post..." />
          <CommandList>
            <CommandEmpty>No post found.</CommandEmpty>
            <CommandGroup>
              {posts.map((post) => (
                <CommandItem
                  disabled={post.disabled}
                  key={post.value}
                  value={post.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setPost(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === post.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {post.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectPost;
