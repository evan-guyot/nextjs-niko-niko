import { FormStatus } from "@/types/models/form";
import { Mood } from "@prisma/client";

export default interface FeelingFormData {
    mood : Mood;
    status : FormStatus;
    message : string;
}