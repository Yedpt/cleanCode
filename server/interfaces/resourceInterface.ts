export interface ResourceInterface {
    id: number;
    user_id: number;
    title: string;
    resource: string;
    resource_url: string;
    published_at?: Date;
    updated_at?: Date;
    image_url?: string;
}