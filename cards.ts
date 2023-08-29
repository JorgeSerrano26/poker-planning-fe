import type { CardProps } from "@/components/Card/Card";

// Necesito una lista de cartas con los valores siguientes:
// 0,1,2,3,5,8,13,21,34,55,89,?,☕
const cards: Pick<CardProps, "label" | "value">[] = [
	{
		label: "☕",
		value: null,
	},
	{
		label: "?",
		value: null,
	},
	{
		label: "0",
		value: 0,
	},
	{
		label: "1",
		value: 1,
	},
	{
		label: "2",
		value: 2,
	},
	{
		label: "3",
		value: 3,
	},
	{
		label: "5",
		value: 5,
	},
	{
		label: "8",
		value: 8,
	},
	{
		label: "13",
		value: 13,
	},
	{
		label: "21",
		value: 21,
	},
	{
		label: "34",
		value: 34,
	},
	{
		label: "55",
		value: 55,
	},
	{
		label: "89",
		value: 89,
	},
];

export default cards;
