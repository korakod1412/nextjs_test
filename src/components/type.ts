import {type RouterInput, type RouterOutput} from "~/server/api/root";


export type hello = RouterInput["post"]["hello"];
export type helloarray = RouterOutput["post"]["helloarray"];

//export type helloarraySelect = RouterOutput["post"]["helloarraySelect"];