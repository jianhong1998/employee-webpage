import { MouseEventHandler } from "react";

export default interface PopupData {
    title: string | null;
    content: JSX.Element | null;
    processButton: {
        content: string | JSX.Element,
        processHandler: MouseEventHandler
    } | null;
}