'use client'

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useAppStore } from "../../store/store";
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-hot-toast";




const RenameModal = () => {
    const {user} = useUser();
    const [input,setInput]=useState("");

    const [isRenameModalOpen, setIsRenameModalOpen,fileId, filename]=
    useAppStore((state)=>[
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.filename,
    ]);

    const renameFile= async()=>{
        if(!user || !fileId) return;

        const toastId=toast.loading("Renaming...");


        await updateDoc(doc(db,"users",user.id,"files",fileId),{
            filename: input,
        })
        try{
            toast.success("Renamed Successfully",{
                id:toastId,
            })

        } catch(error){
            console.log(error);
        }
        setInput("");
        setIsRenameModalOpen(false);

    }


  return (
    <Dialog
    open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the file</DialogTitle>
          <Input
          id='link'
          defaultValue={filename}
          onChange={(e)=> setInput(e.target.value)}
          onKeyDownCapture={(e)=>{
              if(e.key === "Enter"){
                  renameFile();
              }
          }}
          />
          <div className="flex justify-end space-x-2 py-3">
              <Button
              size="sm"
              className="px-3"
              variant={"ghost"}
              onClick={()=>setIsRenameModalOpen(false)}
              >
                  <span className="sr-only">Cancel</span>
                  <span>Cancel</span>

              </Button>
              <Button type="submit"
              size="sm"
              className="px-3"
              onClick={()=> renameFile()}
              >
                  <span className="sr-only">Rename</span>
                  <span>Rename</span>

              </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default RenameModal


