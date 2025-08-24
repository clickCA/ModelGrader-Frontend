import React from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';

export const NavbarMenuLayout = ({
    children,
    yPad = true,
    xPad = true,
}: {
    children: React.ReactNode;
    yPad?: boolean;
    xPad?: boolean;
}) => {
    return (
        <div>
            <div className="z-50 fixed w-full">
                <NavigationBar />
            </div>
            <div className={(yPad ? 'pt-10' : '') + ' ' + (xPad ? 'pl-10' : '')}>{children}</div>
        </div>
    );
};

export default NavbarMenuLayout;
