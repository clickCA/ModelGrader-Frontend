import { useEffect, useState } from "react";
import "./App.css";
import { Toaster } from "./components/shadcn/Toaster";
import {
	CourseNavSidebarContext,
	getCourseNavSidebarContextStateValue,
} from "./contexts/CourseNavSidebarContexnt";
import { LoginContext } from "./contexts/LoginContext";
import { NavSidebarContext } from "./contexts/NavSidebarContext";
import Router from "./router";
import { AuthService } from "./services/Auth.service";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
	const [isLogin, setIsLogin] = useState<boolean | null>(null);
	const [section, setSection] = useState("");
	const [isOpenNavSidebar, setIsOpenNavSidebar] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const account_id = String(localStorage.getItem("account_id"));

		if (!token || !account_id) {
			setIsLogin(false);
			return;
		}

		AuthService.authorize({ token, account_id }).then((response) => {
			if (response.data.result) {
				setIsLogin(true);
			} else {
				setIsLogin(false);
				localStorage.removeItem("token");
				localStorage.removeItem("account_id");
				localStorage.removeItem("username");
			}
		});
	}, []);

	return (
		<div>
			<div className="App">
				<LoginContext.Provider value={{ isLogin, setIsLogin }}>
					<SidebarProvider>
						<NavSidebarContext.Provider
							value={{
								section,
								setSection,
								isOpen: isOpenNavSidebar,
								setIsOpen: setIsOpenNavSidebar,
							}}
						>
							<CourseNavSidebarContext.Provider
								value={getCourseNavSidebarContextStateValue()}
							>
								<Router />
								<Toaster />
							</CourseNavSidebarContext.Provider>
						</NavSidebarContext.Provider>
					</SidebarProvider>
				</LoginContext.Provider>
			</div>
		</div>
	);
}

export default App;
