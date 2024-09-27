import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function NavBar() {
    const [menuItems, setMenuItems] = useState([]);
    const [expandedItems, setExpandedItems] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the navigation items from the backend
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/navbar", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the JWT token is stored in localStorage
                    },
                });
                setMenuItems(response.data); // Set the menu items from the backend
            } catch (error) {
                console.error("Error fetching navigation items:", error);
            }
        };

        fetchMenuItems();
    }, []);

    // Toggle the expanded state of menu items
    const toggleMenuItem = (id) => {
        setExpandedItems(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const renderMenuItem = (item, index) => {
        const hasSubitems = item.subMenus && item.subMenus.length > 0;
        const isExpanded = expandedItems[item.DisplayName];
    
        return (
            <li key={index} className="relative">
                <button
                    className="w-full flex items-center justify-between space-x-3 rounded-lg px-3 py-2 text-left text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
                    onClick={() => toggleMenuItem(item.DisplayName)}
                    aria-expanded={isExpanded}
                    aria-controls={hasSubitems ? `submenu-${index}` : undefined}
                >
                    <span>{item.DisplayName}</span>
                    {hasSubitems ? (
                        isExpanded ? <ChevronDown className='h-5 w-5' /> : <ChevronRight className='h-5 w-5' />
                    ) : null /* No icon if there are no subitems */}
                </button>
                {hasSubitems && (
                    <ul
                        id={`submenu-${index}`}
                        className={`mt-2 ml-4 space-y-2 ${isExpanded ? 'block' : 'hidden'}`}
                    >
                        {item.subMenus.map((subItem, subIndex) => (
                            <li key={subIndex}>
                                <button
                                    onClick={() => navigate(subItem.URL)}
                                    className="block px-3 py-1 text-blue-600 hover:bg-blue-100 hover:text-blue-800 rounded-lg transition-colors duration-200"
                                >
                                    {subItem.DisplayName}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        );
    };
    

    return (
        <nav className="w-80 bg-white bg-opacity-80 shadow-lg flex flex-col h-screen">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Menu</h1>
            </div>
            <div className="flex-grow overflow-y-auto">
                <ul className="space-y-2 px-4">
                    {menuItems.map((item, index) => renderMenuItem(item, index))}
                </ul>
            </div>
        </nav>
    );
}