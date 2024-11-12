import { motion } from "framer-motion";

const containerVariants = {
	hidden: {
		scaleY: 0.35,
		backgroundColor: "var(--bg-xstrong)",
	},
	visible: {
		scaleY: 1,
		backgroundColor: "var(--bg)",
		transition: {
			scaleY: {
				duration: 0.35,
				ease: [0.76, 0.06, 0.13, 0.95],
			},
			backgroundColor: {
				duration: 0.2,
				delay: 0.35,
				ease: "easeOut",
			},
			delayChildren: 0.1,
			staggerChildren: 0.1,
		},
	},
	exit: {
		scaleY: 0,
		transition: {
			duration: 0.2,
			ease: [0.76, 0.06, 0.13, 0.95],
			when: "afterChildren",
			staggerChildren: 0.05,
			staggerDirection: -1,
		},
	},
};

const contentVariants = {
	hidden: {
		opacity: 0,
		y: 16,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.45,
			ease: [0.71, 0, 0.23, 1.0],
		},
	},
	exit: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 0.15,
			ease: [0.71, 0, 0.23, 1.0],
		},
	},
};

type TooltipProps = {
	content: {
		title: string;
		description: string;
		examples?: string[];
		related?: string[];
	};
	onAnimationStart?: () => void;
	onAnimationComplete?: () => void;
	onRelatedClick?: (grapheme: string) => void;
};

export default function Tooltip({
	content,
	onAnimationStart,
	onAnimationComplete,
	onRelatedClick,
}: TooltipProps) {
	return (
		<motion.div
			className="grid grid-cols-subgrid col-span-full bg-bg border-b border-border pt-3 pb-6"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			style={{ transformOrigin: "top" }}
			onAnimationStart={onAnimationStart}
			onAnimationComplete={onAnimationComplete}
		>
			<motion.div
				className="col-span-full px-3 pb-3 border-b border-border-xlight"
				variants={contentVariants}
			>
				<h3 className="text-lg font-bold">{content.title}</h3>
			</motion.div>
			<motion.div
				className="col-span-full flex flex-col gap-3 px-3 pt-3"
				variants={contentVariants}
			>
				<p className="text-xs text-fg-light">{content.description}</p>
				{content.examples && (
					<p className="text-xs text-fg-xlight">
						{content.examples.join(", ")}
					</p>
				)}
				{content.related && (
					<p className="text-xs text-fg-light">
						Related:{" "}
						{content.related.map((item, index) => (
							<span key={item}>
								<button
									onClick={() => onRelatedClick?.(item)}
									className="underline hover:text-fg-xlight transition-colors"
								>
									{item}
								</button>
								{index < content.related!.length - 1 ? ", " : ""}
							</span>
						))}
					</p>
				)}
			</motion.div>
		</motion.div>
	);
}
