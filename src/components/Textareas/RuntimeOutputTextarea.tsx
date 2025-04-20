import { useMemo } from "react";
import { cn } from "../../lib/utils";
import { Card } from "../shadcn/Card";

const RuntimeOutputTextarea = ({
	value = "",
	compareValue = "",
	className = "",
	onClick = () => {},
}: {
	value?: string | null;
	compareValue?: string | null;
	className?: string;
	onClick?: () => void;
}) => {
	const displayValue = useMemo(() => {
		const text = value || ""; // JSON.stringify(value).slice(1, -1);
		const compareText: string[] | null = compareValue
			? compareValue.split("")
			: null;

		return text.split("").map((char, i, textList) => {
			let base = "";

			if (compareText && textList[i] !== compareText[i]) {
				base = "bg-yellow-300";
			}

			if (char === "\n") {
				return (
					<>
						<span className={cn(base, "text-blue-500")}>\n</span>
						<br />
					</>
				);
			} else if (char === "\r") {
				return <span className={cn(base, "text-red-500")}>\r</span>;
			} else {
				return <span className={base} key={i}>{char}</span>;
			}
		});
	}, [value, compareValue]);

	return (
		// <Textarea
		// 	rows={rows}
		// 	readOnly={readOnly}
		// 	className={className}
		// 	onClick={onClick}
		// 	value={JSON.stringify(value)}
		// />
		<Card
			className={cn("px-4 py-2 min-h-[80px]", className)}
			onClick={onClick}
		>
			<div className="font-mono">{displayValue}</div>
		</Card>
	);
};

export default RuntimeOutputTextarea;
