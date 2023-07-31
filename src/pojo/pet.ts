import {PetImage} from "@/pojo/petImage";

export type Pet = {
    petId: number;
    userId: number;
    petName: string;
    birthday: Date;
    category: string;
    petAvatar: string;
    petDescription: string;
    petVisible: boolean;
};

export type PetDto = Pet & {
    petImage: PetImage[];
};