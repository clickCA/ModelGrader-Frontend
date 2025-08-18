import { GroupModel } from "@/types/models/Group.model";
import { Checkbox } from "./shadcn/Checkbox";

const GroupCheckbox = ({
    group,
    checked=true,
    onClick=()=>{}
}:{
    group: GroupModel
    checked?:boolean
    onClick?:()=>void
}) => {

    const customStyle = () => {
        let style = "border rounded-md p-2 flex items-center justify-between cursor-pointer "
        if (checked) {
            style += "bg-green-100 text-green-800 border-green-600 "
        }
        return style
    }

	return (
		<div className={customStyle()} onClick={onClick}>
			<div className="flex items-center">
				<div style={{backgroundColor: group.color}} className="w-3 rounded-full h-3 mr-2"></div>
				<p className="font-medium">{group.name}</p>
			</div>
            <Checkbox checked={checked}/>
		</div>
	);
};

export default GroupCheckbox;
