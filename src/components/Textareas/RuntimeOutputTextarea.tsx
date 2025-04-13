import { useEffect, useMemo } from "react";
import { Textarea } from "../shadcn/Textarea";
import { Card } from "../shadcn/Card";

const RuntimeOutputTextarea = ({
	value = "second(s): 3661 => 1 hour(s): 1 minute(s): 1 second(s)\r\n",
	rows = 5,
	readOnly = false,
	className = "",
	onClick = () => {},
}: {
	value?: string | null;
	rows?: number;
	readOnly?: boolean;
	className?: string;
	onClick?: () => void;
}) => {
	useEffect(() => {
		console.log("String.raw`${value}`", JSON.stringify(value));
	}, [value]);

	const displayValue = useMemo(() => {
		const text = JSON.stringify(value).slice(1, -1);

		const result = text.split(/(\r?\n)/)

        const bytes = new TextEncoder().encode(text);

        const mapped = Array.from(bytes).map(byte => {
            // Do whatever you want with each byte
            return byte;
        });
		// const result = text.split("").map((char, index) => {
		// 	if (char === "\n") {
		// 		return <span className="text-blue-500">{char}</span>;
		// 	} else if (char === "\r") {
		// 		return <span className="text-red-500">{char}</span>;
		// 	} else {
		// 		return <span key={index}>{char}</span>;
		// 	}
		// });

		console.log(mapped);
		console.log(text.split(""));

		return "Hi";
	}, [value]);

	return (
		// <Textarea
		// 	rows={rows}
		// 	readOnly={readOnly}
		// 	className={className}
		// 	onClick={onClick}
		// 	value={JSON.stringify(value)}
		// />
		<Card className="px-4 py-2">
			<div className="font-mono">{displayValue}</div>
		</Card>
	);
};

export default RuntimeOutputTextarea;
