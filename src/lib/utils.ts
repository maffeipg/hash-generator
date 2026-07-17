import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
	WithElementRef,
	WithoutChild,
	WithoutChildren,
	WithoutChildrenOrChild,
} from "svelte-toolbelt";

export type { WithElementRef, WithoutChild, WithoutChildren, WithoutChildrenOrChild };

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
