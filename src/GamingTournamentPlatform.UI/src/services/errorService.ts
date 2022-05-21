import { AxiosError } from "axios";
import { ValidationError } from "../models/ValidationError";

class ErrorService {
    public getErrorMessagesFromError(error: AxiosError): string[] {
        if (error.response) {
            if (error.response.status === 400) {
                const validationError = error.response.data as ValidationError;
                return this.getErrorsFromValidationError(validationError);
            }
        }
        return [error.message];
    }

    public getErrorsFromValidationError(error: ValidationError): string[] {
        const errors: string[] = [];
        if (error.errors) {
            Object.entries(error.errors).forEach((e) =>
                errors.push(`${e[0]} - ${e[1].join(";")}`)
            );
        }
        return errors;
    }
}

export default new ErrorService();
