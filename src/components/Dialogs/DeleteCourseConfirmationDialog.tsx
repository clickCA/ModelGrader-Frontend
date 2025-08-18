import React from "react";
import { TopicService } from "@/services/Topic.service";
import { TopicModel } from "@/types/models/Topic.model";
import { Button } from "@/components/shadcn/Button";
import { Dialog, DialogContent } from "@/components/shadcn/Dialog";

const DeleteCourseConfirmationDialog = ({
	open,
	setOpen,
	course,
	afterDelete = () => {},
}: {
	course: TopicModel;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	afterDelete?: () => void;
}) => {
	const accountId = String(localStorage.getItem("account_id"));

	const handleDelete = () => {
		setOpen(false);
		TopicService.delete(course.topic_id,accountId).then(() =>
			afterDelete()
		);
	};

	return (
		<Dialog open={open} onOpenChange={() => setOpen(false)}>
			<DialogContent>
				<div>
					<div>Are you sure you want to delete this course?</div>
					<div className="font-bold">{course.name}</div>
				</div>
				<div className="flex justify-end gap-2">
					<Button
						onClick={handleDelete}
						className="bg-red-500 hover:bg-red-400"
					>
						Delete
					</Button>
					<Button
						onClick={() => setOpen(false)}
						className="bg-gray-500 hover:bg-gray-400"
					>
						Cancel
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteCourseConfirmationDialog;
