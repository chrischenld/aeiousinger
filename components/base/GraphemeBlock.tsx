export default function GraphemeBlock({
	children,
	className,
	lastRow,
	selectable,
	onClick,
	isSelected,
}: {
	children?: React.ReactNode;
	className?: string;
	lastRow?: boolean;
	selectable?: boolean;
	onClick?: () => void;
	isSelected?: boolean;
}) {
	return (
		<div
			onClick={selectable ? onClick : undefined}
			className={`h-full w-full grid col-span-1 aspect-square items-center justify-center border border-border border-t-0 border-l-0 transition-[border-bottom-color] duration-300 delay-[300ms] ${
				selectable ? "hover:bg-bg-xstrong hover:cursor-pointer" : ""
			} ${isSelected ? "bg-bg-strong border-b-bg-strong" : "border-b-border"} ${
				lastRow ? "border-b-0" : "border-b-1"
			} ${className}`}
		>
			<p>{children}</p>
		</div>
	);
}
