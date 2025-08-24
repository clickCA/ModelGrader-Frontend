'use client';

import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { commentsUsers, myUserId } from '../lib/plate/comments';
import { MENTIONABLES } from '../lib/plate/mentionables';
import { plugins } from '../lib/plate/plate-plugins';
import { cn } from '../lib/utils';
import { PlateEditorValueType } from '@/types/PlateEditorValueType';
import { CommentsPopover } from './plate-ui/comments-popover';
import { CursorOverlay } from './plate-ui/cursor-overlay';
import { Editor } from './plate-ui/editor';
import { FixedToolbar } from './plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from './plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from './plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from './plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from './plate-ui/mention-combobox';

export default function DetailPlateEditor({value,onChange}:{
    value?: PlateEditorValueType,
    onChange?: (value: PlateEditorValueType) => void
}) {
  const containerRef = useRef(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <Plate plugins={plugins} initialValue={value} onChange={(e) => {
            onChange && onChange(e)
        }}>
          <div
            ref={containerRef}
            className={cn(
              // Block selection
              '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              
              className="px-[96px] py-16 h-[60vh] md:h-[58vh] overflow-y-scroll"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            <MentionCombobox items={MENTIONABLES} />

            <CommentsPopover />

            <CursorOverlay containerRef={containerRef} />
          </div>
        </Plate>
      </CommentsProvider>
    </DndProvider>
  );
}
