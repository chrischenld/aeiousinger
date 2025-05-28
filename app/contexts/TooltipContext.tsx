"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TooltipContextType {
	showTooltips: boolean;
	toggleTooltips: () => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export function TooltipProvider({ children }: { children: ReactNode }) {
	const [showTooltips, setShowTooltips] = useState(true);

	const toggleTooltips = () => {
		setShowTooltips((prev) => !prev);
	};

	return (
		<TooltipContext.Provider value={{ showTooltips, toggleTooltips }}>
			{children}
		</TooltipContext.Provider>
	);
}

export function useTooltips() {
	const context = useContext(TooltipContext);
	if (context === undefined) {
		throw new Error("useTooltips must be used within a TooltipProvider");
	}
	return context;
}
