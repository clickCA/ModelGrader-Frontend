import { ArrowDownToLine, Loader2, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/shadcn/Button";

const FormSaveButton = ({
    disabled,
    onClick,
}:{
    disabled: boolean
    onClick: () => void
}) => {

	const {problemId,courseId,collectionId,groupId} = useParams()


	return (
		<Button disabled={disabled} onClick={onClick} className="px-10 ml-5">
			{disabled ? (
				<>
					<Loader2 className="animate-spin mr-2" />
					{(problemId || courseId || collectionId || groupId) ? "Saving" : "Creating"}
				</>
			) : (
				<>
					
					{(problemId || courseId || collectionId || groupId) ? <ArrowDownToLine size={20} className="mr-2"/> : <Plus size={20} className="mr-2"/>}
					{(problemId || courseId || collectionId || groupId) ? "Save" : "Create"}
				</>
			)}
			{/* {loading ? "Saving..." : "Save"} */}
		</Button>
	);
};

export default FormSaveButton;
