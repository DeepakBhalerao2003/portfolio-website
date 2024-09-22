import React from 'react'



export const Tooltip = ({ text, children }:{
    text:string,
    children: React.ReactNode
}) => {
    return (
        <div className="relative group">
            {children}
            <span className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full mb-2 hidden group-hover:block bg-gray-700 text-white text-sm py-2 px-3 rounded">
                {text}
            </span>
        </div>
    );
};