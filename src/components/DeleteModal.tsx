'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useAppStore } from "../../store/store"
import { toast } from "react-hot-toast";

export function DeleteModal() {
    const {user}= useUser();

    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore(
        (state: { isDeleteModalOpen: any; setIsDeleteModalOpen: any; fileId: any; setFileId: any; }) => [state.isDeleteModalOpen, state.setIsDeleteModalOpen, state.fileId, state.setFileId,]
      );
    
    async function deleteFile(){
        if(!user || !fileId) return;

        const toastId=toast.loading("Deleting...")

        const fileRef=ref(storage,`users/${user.id}/files/${fileId}`);
        try{
        deleteObject(fileRef).then(async () => {
            console.log("DELETED FILE");
            deleteDoc(doc(db,"users",user.id,"files",fileId)).then(()=>{
                console.log("Deleted!");
                toast.success("Deleted Succesfully",{
                    id:toastId,
                })

            });
        }).finally(()=>{
           
            setIsDeleteModalOpen(false);
        })
    } catch(error){
        console.log(error);
        setIsDeleteModalOpen(false)
        toast.error("Error deleting document",{
            id:toastId,
        })


        }
       



    }
  return (
    <Dialog
    open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md z-50 bg-white">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannnot be undone. This will permanently delete your file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button size="sm" className="px-3 flex-1" variant={"outline"} onClick={()=>setIsDeleteModalOpen(false)}>
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
          </Button>
          <Button size="sm" type="submit" className="px-3 flex-1"  variant="outline" onClick={()=>deleteFile()}>
              <span className="sr-only">Delete</span>
              <span>Delete</span>
          </Button>
         
        </div>
      </DialogContent>
    </Dialog>
  )
}
