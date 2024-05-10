export interface ICategory {
    id: number;
    nameRu: string;
    nameEn: string;
    nameUz: string;
    image: string;
    type: string;
    isActive: boolean;
    isDeleted: boolean;
    created?: string;
    createdAt: string;
    updated?: string; 
    updatedAt: string; 
    deleted?: string; 
    deletedAt: string; 
}