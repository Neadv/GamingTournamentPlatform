export interface ValidationError {
    title: string;
    status: number;
    errors: {
        [K: string]: string[];
    };
}
