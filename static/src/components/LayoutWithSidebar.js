import React from 'react'
import { Sidebar } from './Sidebar';

const LayoutWithSidebar = (props) => {
    const SidebarComponent = props.Sidebar || Sidebar;
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 d-none d-md-block">
                    <SidebarComponent>

                    </SidebarComponent>
                </div>
                <div className="col-sm-12 col-md-10">
                    {props.children}
                </div>
            </div>
        </div>
    );
};



export { LayoutWithSidebar }