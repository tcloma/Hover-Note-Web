import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Titlebar from './Titlebar';
import StickyNoteTitle from "./StickyNoteTitle";

type Props = {
   children: ReactNode,
   stickyNote: boolean,
   previewNote: boolean,
   setPreviewNote: Dispatch<SetStateAction<boolean>>,
   windowId: number | undefined,
   windowName: string,
   windowData: string
}


const Layout = ({ children, stickyNote, previewNote, setPreviewNote, windowId, windowName, windowData }: Props) => {
   return (
      <>
         {stickyNote ?
            <StickyNoteTitle
               previewNote={previewNote}
               setPreviewNote={setPreviewNote}
               windowId={windowId}
               windowName={windowName}
               windowData={windowData}
            />
            :
            <Titlebar />
         }
         <main>{children}</main>
      </>

   )
}
export default Layout;