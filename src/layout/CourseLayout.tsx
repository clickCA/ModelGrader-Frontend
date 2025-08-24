import React, { useContext, useEffect } from 'react';
import { SidebarProvider } from '../components/ui/sidebar';
import { CourseNavSidebarContext } from '@/contexts/CourseNavSidebarContext';

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
    const { isOpenSidebar, setIsOpenSidebar } = useContext(CourseNavSidebarContext);

    useEffect(() => {
        const isOpenSidebarStorage = localStorage.getItem('isOpenSidebar');
        if (isOpenSidebarStorage) {
            setIsOpenSidebar(isOpenSidebarStorage === 'true');
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('isOpenSidebar', isOpenSidebar.toString());
    }, [isOpenSidebar])

    return (
        <SidebarProvider open={isOpenSidebar}>
            <div className='w-full'>{children}</div>
        </SidebarProvider>
    );
};

export default CourseLayout;
