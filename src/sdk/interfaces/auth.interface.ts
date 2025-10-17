interface signUpDTO {
    birth_date: Date;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    identity_document: string;
    phone: string;
}

interface signUpResponse {
    code: number;
    message: string;
    status: string;
}
