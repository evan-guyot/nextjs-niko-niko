import { Feeling } from "./feeling";

export default interface User {
    id: number;
    email: string;
    img: string;
    feelings?: Feeling[];
}