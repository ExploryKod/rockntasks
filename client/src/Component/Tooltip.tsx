
import React, { useState } from "react";

interface ITooltip {
        children: React.ReactNode;
        content: string;
        direction?: string;
        delay?: number;
}



export const Tooltip = ({children, content, direction, delay}: ITooltip) => {
    let timeout: any;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, delay || 400);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className="Tooltip-Wrapper"
            // When to show the tooltip
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {/* Wrapping */}
            {children}
            {active && (
                <div className={`Tooltip-Tip ${direction || "top"}`}>
                    {/* Content */}
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
