import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBoard, ITask } from "../../interface/interface";
import { act } from "react-dom/test-utils";

export interface ISlice {
	openSidebar: boolean;
	currentBoard: IBoard;
	board: IBoard[];
	flag: boolean;
	currentTasks: ITask[];
}

const initialState: ISlice = {
	openSidebar: false,
	currentBoard: {} as IBoard,
	board: [],
	flag: false,
	currentTasks: [],
};

export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		setOpenSidebar: (state, action) => {
			state.openSidebar = action.payload;
		},
		setBoard: (state, action) => {
			state.board = [];
			state.board.push(...action.payload);
		},
		setCurrentBoard: (state, action) => {
			state.currentBoard = action.payload;
		},
		setFlag: (state, action) => {
			state.flag = action.payload;
		},
		setCurrentTasks: (state, action) => {
			state.currentTasks = [];
			state.currentTasks = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setOpenSidebar,
	setBoard,
	setCurrentBoard,
	setFlag,
	setCurrentTasks,
} = boardSlice.actions;

export default boardSlice.reducer;
