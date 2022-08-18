import React from 'react';
import UserLayout from "../../layout/UserLayout";

const UserRoutes = ({element: Component}) => {
    return (
        <UserLayout>
            <Component/>
        </UserLayout>
    );
};

export default UserRoutes;