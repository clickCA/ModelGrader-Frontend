"use client";

import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { EmptyEditorValue } from "../constants/DummyEditorValue";
import { commentsUsers, myUserId } from "../lib/plate/comments";
import { MENTIONABLES } from "../lib/plate/mentionables";
import { plugins } from "../lib/plate/plate-plugins";
import { cn } from "../lib/utils";
import { PlateEditorValueType } from "@/types/PlateEditorValueType";
import { CommentsPopover } from "./plate-ui/comments-popover";
import { CursorOverlay } from "./plate-ui/cursor-overlay";
import { Editor } from "./plate-ui/editor";
import { MentionCombobox } from "./plate-ui/mention-combobox";

export default function ReadOnlyPlate({
	className,
	value = EmptyEditorValue,
}: {
	className?: string;
	value?: PlateEditorValueType;
}) {
	const containerRef = useRef(null);

	return (
		<DndProvider backend={HTML5Backend}>
			<CommentsProvider users={commentsUsers} myUserId={myUserId}>
				{(value) && (
					<Plate
						readOnly
						id="view-problem-plate"
						plugins={plugins}
						initialValue={value}
						// value={value}
					>
						<div
							ref={containerRef}
							className={cn(
								// Block selection
								"[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
							)}
						>
								<Editor
									className={/* "px-[96px] py-0 " + */ "" + className}
									autoFocus
									focusRing={false}
									variant="ghost"
									size="md"
									readOnly
								/>

							{/* <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar> */}

							<MentionCombobox items={MENTIONABLES} />

							<CommentsPopover />

							<CursorOverlay containerRef={containerRef} />
						</div>
					</Plate>
				)}
			</CommentsProvider>
		</DndProvider>
	);
}
