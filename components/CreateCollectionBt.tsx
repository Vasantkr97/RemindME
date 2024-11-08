"use client"

import { useState } from "react";
import { Button } from "./ui/button"
import CreateCollectionSheet from "./CreateCollectionSheet";

const CreateCollectionBt = () => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (open: boolean) => setOpen(open);

    

  return (
    <div className="w-full rounded-md bg-gradient-to-r from-pink-700 via-red-500 to-red-900 p-[1px]">
        <Button
        onClick={() => setOpen(!open)}
        variant={"outline"}
        className="dark:text-white w-full dark:bg-neutral-950 bg-white"
        >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent">
            Create Collection
        </span>
        </Button>
        <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
    </div>
    
  )
}

export default CreateCollectionBt