import { cn } from "@/lib/utils";

const ToolbarItem = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={cn("grid grid-cols-subgrid col-span-1 md:col-span-2", className)}
	>
		{children}
	</div>
);

export default ToolbarItem;
