export default function ReferenceBlock({
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
			className={`h-full w-full grid col-span-1 aspect-square items-center justify-center border border-border border-t-0 border-l-0 px-1 ${
				selectable ? "hover:bg-bg-xstrong hover:cursor-pointer" : ""
			} ${isSelected ? "bg-bg-strong border-b-bg-strong" : "border-b-border"} ${
				lastRow ? "border-b-0" : "border-b-1"
			} ${className}`}
		>
			<p className="break-all text-center leading-tight">{children}</p>
		</div>
	);
}
