"use client";


import { toast } from "sonner";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { ConfirmModal } from "./confirm-modal";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Ghost, Link2, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";


interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};


export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
}: ActionsProps) => {
    const {onOpen} = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);


    const onCopyLink = () => {
        navigator.clipboard.writeText(
            '${window.location.origin}/board/${id}',
            )
                .then(() => toast.success("Link copied successfully"))
                .catch(() => toast.error("Failed to copy link"))
    };

    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success("Link deleted successfully"))
            .catch(() => toast.error("Failed to delete link"))
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem
                    onClick={onCopyLink}
                    className="p-3 cursor-pointer"
                >
                <Link2 className="h-4 w-4 mr-2" />
                Copy Space Link
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onOpen(id, title)}
                    className="p-3 cursor-pointer"
                >
                <Pencil className="h-4 w-4 mr-2" />
                Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete Meld?"
                    description="This will delete the Meld and all its content."
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button

                    variant="ghost"                      
                    className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                 >
                    <Trash2 className="h-4 w-4 mr-2" />
                 Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
)}