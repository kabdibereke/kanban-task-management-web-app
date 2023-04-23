import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface IBoardButton
	extends Omit<
		DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		"onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
	> {
	children: ReactNode;
	create?: boolean;
	hide?: boolean;
	active?: boolean;
}
