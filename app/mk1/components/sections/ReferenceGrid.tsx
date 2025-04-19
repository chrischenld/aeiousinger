"use client";

import ReferenceBlock from "../base/ReferenceBlock";
import { useState, useEffect, useCallback, useRef } from "react";
import Tooltip from "../base/Tooltip";
import { AnimatePresence } from "framer-motion";
import { graphemeContent, graphemeSections } from "@/data/graphemeContent";
import { pitchContent, pitchSections } from "@/data/pitchContent";
import { timeContent, timeSections } from "@/data/timeContent";
import Select from "../base/Select";

type ContentSection = {
	title: string;
	items: string[];
};

type ContentType = {
	sections: ContentSection[];
	content: Record<
		string,
		{
			title: string;
			description: string;
			items: Record<
				string,
				{
					title: string;
					description: string;
					examples?: string[];
					related?: string[];
				}
			>;
		}
	>;
};

const contentMap: Record<string, ContentType> = {
	phoneme: {
		sections: graphemeSections,
		content: graphemeContent,
	},
	pitch: {
		sections: pitchSections,
		content: pitchContent,
	},
	duration: {
		sections: timeSections,
		content: timeContent,
	},
};

export default function ReferenceGrid() {
	const [selected, setSelected] = useState<string | null>(null);
	const [selectedPosition, setSelectedPosition] = useState<{
		section: number;
		row: number;
	} | null>(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [tooltipKey, setTooltipKey] = useState(0);
	const [colCount, setColCount] = useState(6);
	const gridRef = useRef<HTMLDivElement>(null);

	const [selectedOption, setSelectedOption] = useState("phoneme");

	useEffect(() => {
		const updateColCount = () => {
			setColCount(window.innerWidth >= 768 ? 5 : 6);
		};

		updateColCount();

		window.addEventListener("resize", updateColCount);

		return () => {
			window.removeEventListener("resize", updateColCount);
		};
	}, []);

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
			setIsAnimating(false);

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

	const getContent = (item: string, sectionTitle: string) => {
		const sectionKey = sectionTitle.toLowerCase();
		return (
			contentMap[selectedOption].content[sectionKey]?.items[item] || {
				title: item,
				description: `Information about "${item}"`,
			}
		);
	};

	const findItemPosition = (
		item: string
	): { section: number; row: number } | null => {
		for (
			let sectionIndex = 0;
			sectionIndex < contentMap[selectedOption].sections.length;
			sectionIndex++
		) {
			const items = contentMap[selectedOption].sections[sectionIndex].items;
			const itemIndex = items.indexOf(item);
			if (itemIndex !== -1) {
				return {
					section: sectionIndex,
					row: Math.floor(itemIndex / colCount),
				};
			}
		}
		return null;
	};

	const scrollToRow = useCallback((sectionIndex: number, rowIndex: number) => {
		if (!gridRef.current) {
			console.log("No gridRef found");
			return;
		}

		// Find the row element
		const sectionElement = gridRef.current.children[sectionIndex];
		console.log("Section index:", sectionIndex);
		console.log("Section element:", sectionElement);

		if (!sectionElement) {
			console.log("No section element found");
			return;
		}

		// Since we're using contents, we need to find the actual row
		// Skip the header div and find the row
		const rowElement = Array.from(sectionElement.children).filter(
			(child) => !child.classList.contains("border-b")
		)[rowIndex];

		console.log("Row index:", rowIndex);
		console.log("Row element:", rowElement);

		if (!rowElement) {
			console.log("No row element found");
			return;
		}

		// Scroll the row into view with smooth animation
		rowElement.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	}, []);

	const handleRelatedClick = (item: string) => {
		const position = findItemPosition(item);
		if (position) {
			handleSelect(item, position.section, position.row);
			scrollToRow(position.section, position.row);
		}
	};

	const renderSection = (section: ContentSection, sectionIndex: number) => {
		const rows = createRows(section.items);

		return (
			<div key={`section-${sectionIndex}`} className="contents">
				<div className="grid grid-cols-subgrid col-span-full border-b border-border h-[72px]">
					<div className="flex items-center px-3">
						<h3 className="text-sm font-bold">{section.title}</h3>
					</div>
				</div>
				{rows.map((row, rowIndex) => (
					<div
						key={`${section.title}-row-${rowIndex}`}
						className="grid grid-cols-subgrid col-span-full h-fit"
					>
						{row.map((grapheme, i) => (
							<ReferenceBlock
								key={`${section.title}-${grapheme || "empty"}-${i}`}
								selectable={!!grapheme}
								onClick={() =>
									grapheme && handleSelect(grapheme, sectionIndex, rowIndex)
								}
								isSelected={
									selected === grapheme &&
									selectedPosition?.section === sectionIndex &&
									selectedPosition?.row === rowIndex
								}
								className=""
							>
								{grapheme}
							</ReferenceBlock>
						))}
						<AnimatePresence mode="wait">
							{selected &&
								selectedPosition?.section === sectionIndex &&
								selectedPosition?.row === rowIndex && (
									<Tooltip
										key={`tooltip-${selected}-${sectionIndex}-${rowIndex}-${tooltipKey}`}
										content={getContent(selected, section.title)}
										onAnimationStart={() => setIsAnimating(true)}
										onAnimationComplete={() => setIsAnimating(false)}
										onRelatedClick={handleRelatedClick}
									/>
								)}
						</AnimatePresence>
					</div>
				))}
			</div>
		);
	};

	return (
		<div
			ref={gridRef}
			tabIndex={-1}
			className="grid grid-cols-subgrid col-span-6 md:col-span-5 border-l border-b border-border h-full overflow-y-auto grid-rows-[auto_1fr]"
		>
			<div className="h-16 grid grid-cols-subgrid col-span-full border-b border-border items-center">
				<Select
					options={[
						{ value: "pitch", label: "Pitch" },
						{ value: "duration", label: "Duration" },
						{ value: "phoneme", label: "Phoneme" },
					]}
					value={selectedOption}
					onChange={setSelectedOption}
				/>
			</div>
			<div className="grid grid-cols-subgrid col-span-full grid-rows-[auto_1fr]">
				<div className="grid grid-cols-subgrid col-span-full">
					{contentMap[selectedOption].sections.map((section, index) =>
						renderSection(section, index)
					)}
				</div>
				<div className="grid grid-cols-subgrid col-span-full min-h-0 flex-1" />
			</div>
		</div>
	);
}
