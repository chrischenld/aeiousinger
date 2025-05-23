import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Search({
	placeholder,
	value,
	onChange,
	className,
}: {
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}) {
	return (
		<Input
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={cn("text-xs h-full w-full", className)}
		/>
	);
}
