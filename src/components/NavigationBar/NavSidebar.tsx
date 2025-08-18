import { FileSpreadsheet, Folder, LibraryBig, Users } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavSidebarContext } from "../../contexts/NavSidebarContext";
import { Separator } from "@/components/shadcn/Seperator";

const SectionButton = ({
	selected = false,
	children,
	onClick = () => {},
}: {
	selected?: boolean;
	children?: React.ReactNode;
	onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
	return (
		<div
			className={`flex font-medium cursor-pointer w-[90%] p-2 rounded-lg items-center ${
				selected ? "bg-green-600 text-white" : "hover:bg-green-100"
			}`}
			onClick={(e) => onClick(e)}
		>
			{children}
		</div>
	);
};

const NavSidebar = () => {
	const navigate = useNavigate();

	const { isOpen, setIsOpen } = useContext(NavSidebarContext);
	
	const { section } = useContext(NavSidebarContext);

	const customIconBehaviour = (selected: boolean) => {
		if (selected) return "mr-2 text-white";
		return "mr-2 text-green-600";
	};

	const customMiniIconBehaviour = (selected: boolean) => {
		if (selected) return "text-white";
		return "text-green-600";
	};

	return (
		<>
			{!isOpen ? (
				<div className="w-1/8 h-screen pt-10 ">
					<div className="">
						<div className="mx-1 grid gap-1 gap-y-1">
							{/* <p onClick={() => setIsOpen(true)}>Open</p> */}
							<div className="mt-4"></div>
							<SectionButton
								selected={section === "PROBLEMS"}
								onClick={() => navigate("/my/problems")}
							>
								<FileSpreadsheet
									size={30}
									className={customMiniIconBehaviour(
										section === "PROBLEMS"
									)}
								/>
								
							</SectionButton>
							<SectionButton
								selected={section === "COLLECTIONS"}
								onClick={() => navigate("/my/collections")}
							>
								<Folder
									size={30}
									className={customMiniIconBehaviour(
										section === "COLLECTIONS"
									)}
								/>
								
							</SectionButton>
							<SectionButton
								selected={section === "COURSES"}
								onClick={() => navigate("/my/courses")}
							>
								<LibraryBig
									size={30}
									className={customMiniIconBehaviour(
										section === "COURSES"
									)}
								/>
								
							</SectionButton>
							<SectionButton
								selected={section === "GROUPS"}
								onClick={() => navigate("/my/groups")}
							>
								<Users
									size={30}
									className={customMiniIconBehaviour(
										section === "GROUPS"
									)}
								/>
								
							</SectionButton>
						</div>

						<div className="mt-5">
							<Separator />
						</div>

					</div>
				</div>
			) : (
				<div className="w-1/6 h-screen pt-10">
					<div>
						<div className="grid ml-3 gap-1 gap-y-1">
							<p onClick={() => setIsOpen(false)}>Close</p>
							<SectionButton
								selected={section === "PROBLEMS"}
								onClick={() => navigate("/my/problems")}
							>
								<FileSpreadsheet
									size={30}
									className={customIconBehaviour(
										section === "PROBLEMS"
									)}
								/>
								Problems
							</SectionButton>
							<SectionButton
								selected={section === "COLLECTIONS"}
								onClick={() => navigate("/my/collections")}
							>
								<Folder
									size={30}
									className={customIconBehaviour(
										section === "COLLECTIONS"
									)}
								/>
								Collections
							</SectionButton>
							<SectionButton
								selected={section === "COURSES"}
								onClick={() => navigate("/my/courses")}
							>
								<LibraryBig
									size={30}
									className={customIconBehaviour(
										section === "COURSES"
									)}
								/>
								Courses
							</SectionButton>
							<SectionButton
								selected={section === "GROUPS"}
								onClick={() => navigate("/my/groups")}
							>
								<Users
									size={30}
									className={customIconBehaviour(
										section === "GROUPS"
									)}
								/>
								Groups
							</SectionButton>
						</div>

						<div className="mt-5">
							<Separator />
						</div>

						<p className="ml-5">Recent Edited</p>
					</div>
				</div>
			)}
		</>
	);
};

export default NavSidebar;
