"use client";

import GraphemeBlock from "../base/GraphemeBlock";
import { useState, useEffect, useCallback } from "react";
import Tooltip from "../base/Tooltip";
import { AnimatePresence } from "framer-motion";
import { graphemeContent } from "@/data/graphemeContent";

type GraphemeSection = {
	title: string;
	items: string[];
};

export default function GraphemeGrid({
	sections,
}: {
	sections: GraphemeSection[];
}) {
	const [selected, setSelected] = useState<string | null>(null);
	const [selectedPosition, setSelectedPosition] = useState<{
		section: number;
		row: number;
	} | null>(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [tooltipKey, setTooltipKey] = useState(0);
	const [colCount, setColCount] = useState(window.innerWidth >= 768 ? 5 : 6);

	// Add resize listener
	useEffect(() => {
		const handleResize = () => {
			setColCount(window.innerWidth >= 768 ? 5 : 6);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Debounced selection handler
	const debouncedSelect = useCallback(
		(grapheme: string | null, section?: number, row?: number) => {
			return setTimeout(() => {
				setTooltipKey((prev) => prev + 1);
				setSelected(grapheme);
				if (grapheme && section !== undefined && row !== undefined) {
					setSelectedPosition({ section, row });
				} else {
					setSelectedPosition(null);
				}
			}, 100);
		},
		[]
	);

	const handleSelect = (
		grapheme: string,
		sectionIndex: number,
		rowIndex: number
	) => {
		const isClickingCurrentTooltip =
			selected === grapheme &&
			selectedPosition?.section === sectionIndex &&
			selectedPosition?.row === rowIndex;

		if (isAnimating) {
			// Cancel current animation
			setIsAnimating(false);

			// Schedule next state
			if (isClickingCurrentTooltip) {
				debouncedSelect(null);
			} else {
				debouncedSelect(grapheme, sectionIndex, rowIndex);
			}
		} else {
			if (isClickingCurrentTooltip) {
				debouncedSelect(null);
			} else {
				debouncedSelect(grapheme, sectionIndex, rowIndex);
			}
		}
	};

	// Helper to create rows based on items and current colCount state
	const createRows = (items: string[]) => {
		const rows: string[][] = [];

		for (let i = 0; i < items.length; i += colCount) {
			const row = items.slice(i, i + colCount);
			while (row.length < colCount) {
				row.push("");
			}
			rows.push(row);
		}
		return rows;
	};

	const getGraphemeContent = (grapheme: string, sectionTitle: string) => {
		const sectionKey = sectionTitle.toLowerCase();
		return (
			graphemeContent[sectionKey]?.items[grapheme] || {
				title: grapheme,
				description: `Information about "${grapheme}"`,
			}
		);
	};

	const renderSection = (section: GraphemeSection, sectionIndex: number) => {
		const rows = createRows(section.items);

		return (
			<>
				<div className="grid grid-cols-subgrid col-span-full border-b border-border items-center py-6 px-3">
					<h3 className="text-2xs font-bold">{section.title}</h3>
				</div>
				{rows.map((row, rowIndex) => (
					<div key={rowIndex} className="grid grid-cols-subgrid col-span-full">
						{row.map((grapheme, i) => (
							<GraphemeBlock
								key={`${grapheme || "empty"}-${i}`}
								selectable={!!grapheme}
								onClick={() =>
									grapheme && handleSelect(grapheme, sectionIndex, rowIndex)
								}
								isSelected={
									selected === grapheme &&
									selectedPosition?.section === sectionIndex &&
									selectedPosition?.row === rowIndex
								}
							>
								{grapheme}
							</GraphemeBlock>
						))}
						<AnimatePresence mode="wait">
							{selected &&
								selectedPosition?.section === sectionIndex &&
								selectedPosition?.row === rowIndex && (
									<Tooltip
										key={tooltipKey}
										grapheme={selected}
										content={getGraphemeContent(selected, section.title)}
										onAnimationStart={() => setIsAnimating(true)}
										onAnimationComplete={() => setIsAnimating(false)}
									/>
								)}
						</AnimatePresence>
					</div>
				))}
			</>
		);
	};

	return (
		<div className="grid grid-cols-subgrid col-span-6 md:col-span-5 border-l border-b border-border h-full overflow-y-auto">
			{sections.map((section, index) => renderSection(section, index))}
		</div>
	);
}
