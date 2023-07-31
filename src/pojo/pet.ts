import {PetImage} from "@/pojo/petImage";

export interface Pet  {
    petId: number;
    userId: number;
    petName: string;
    birthday: Date;
    category: string;
    petAvatar: string;
    petDescription: string;
    petVisible: boolean;
}

export interface PetDto extends Pet  {
    petImage: PetImage[];
}