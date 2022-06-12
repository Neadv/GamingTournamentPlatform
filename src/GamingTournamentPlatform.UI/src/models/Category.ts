export interface Category {
    id: number;
    name: string;
    description: string;
    allowCreatingTeams: boolean;
    allowOrganizeCompetitions: boolean;
    parent?: Category;
    parentId?: number | null;
    children: Category[];
}
