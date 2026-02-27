export interface GuideFilters {
    countries?: string[];
    university?: string;
    major?: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface ApiError {
    message: string;
    code?: string;
    status: number;
}
