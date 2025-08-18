import { useContext } from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle
} from "@/components/shadcn/NevigationMenu";


import { LoginContext } from "../../contexts/LoginContext";
import ProfileDropdown from './ProfileDropdown';
import { LayoutDashboard, Library, StickyNote } from "lucide-react";



const NavigationBar = (/* { isLogin = false }: { isLogin?: boolean } */) => {

	const {isLogin} = useContext(LoginContext);

	const customNavigationMenuTriggerStyle = () => {
		return (
			navigationMenuTriggerStyle() +
			" bg-green-600 hover:bg-green-700 hover:text-white text-white cursor-pointer active:bg-green-800 active:text-white focus:bg-green-600 focus:text-white"
		);
	};

	

	return (
		<NavigationMenu className="bg-green-600">
			{/* <div className="flex w-screen"> */}
			<NavigationMenuList className="flex w-screen justify-between">
				<div className="flex gap-1">
					<NavigationMenuItem className="">
						<NavigationMenuLink
							className={navigationMenuTriggerStyle() +
								" py-0 bg-green-600 hover:bg-green-700 hover:text-white text-white cursor-pointer active:bg-green-800 active:text-white focus:bg-green-600 focus:text-white"}
							href="/"
						>
							{/* <img width={10} src='/favicon.ico'/> */}
							<StickyNote size={20} className="mr-1"/>
							ModelGrader
						</NavigationMenuLink>
						<NavigationMenuLink
							className={customNavigationMenuTriggerStyle()}
							href="/explore"
						>
							<Library size={20} className="mr-1"/>
							Explore
						</NavigationMenuLink>
						{/* <NavigationMenuLink
							className={customNavigationMenuTriggerStyle()}
							href="/courses"
						>
							Courses
						</NavigationMenuLink> */}
						{isLogin && <NavigationMenuLink
							className={customNavigationMenuTriggerStyle()}
							href="/dashboard"
						>
							<LayoutDashboard size={20} className="mr-1"/>
							Dashboard
						</NavigationMenuLink>}
					</NavigationMenuItem>
					{/* <NavigationMenuItem>
						<NavigationMenuTrigger>
							Getting started
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<a
											className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
											href="/"
										> */}
					{/* <Icons.logo className="h-6 w-6" /> */}
					{/* <div className="mb-2 mt-4 text-lg font-medium">
												shadcn/ui
											</div>
											<p className="text-sm leading-tight text-muted-foreground">
												Beautifully designed components
												built with Radix UI and Tailwind
												CSS.
											</p>
										</a>
									</NavigationMenuLink>
								</li>
								<ListItem href="/docs" title="Introduction">
									Re-usable components built using Radix UI
									and Tailwind CSS.
								</ListItem>
								<ListItem
									href="/docs/installation"
									title="Installation"
								>
									How to install dependencies and structure
									your app.
								</ListItem>
								<ListItem
									href="/docs/primitives/typography"
									title="Typography"
								>
									Styles for headings, paragraphs, lists...etc
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							Components
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								{components.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem> */}
				</div>
				<div className="flex gap-1 pr-1">
					{!isLogin ? (
						<>
							<NavigationMenuItem>
								<NavigationMenuLink
									href="/login"
									className={customNavigationMenuTriggerStyle()}
								>
									Login
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink
									href="/register"
									className={customNavigationMenuTriggerStyle()}
								>
									Register
								</NavigationMenuLink>
							</NavigationMenuItem>
						</>
					) : (
						<>
							<NavigationMenuItem>
								<ProfileDropdown>
									<NavigationMenuLink
										className={customNavigationMenuTriggerStyle()}
										href="#"
									>
										{localStorage.getItem("username")}
									</NavigationMenuLink>
								</ProfileDropdown>
							</NavigationMenuItem>
						</>
					)}
				</div>
			</NavigationMenuList>
			{/* </div> */}
		</NavigationMenu>
	);
};

export default NavigationBar;
