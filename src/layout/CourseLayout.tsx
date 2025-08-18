import React from "react";
import { SidebarProvider } from "../components/ui/sidebar";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div>{children}</div>
    </SidebarProvider>
  );
};

export default CourseLayout;
