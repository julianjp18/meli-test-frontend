export interface ProductI {
    id: string;
    title: string;
    price: {
        currency: string;
        amount: number;
        decimals: number;
    },
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity?: number;
    description?: string;
    category_id?: string | number;
}

export interface ServiceI {
    data: ProductI[] | null;
    statusCode: number;
    error?: string | null;
}