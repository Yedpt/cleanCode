export interface NewsInterface {
    id: number;
    user_id: number;
    title: string;
    news: string;
    published_at?: Date;
    updated_at?: Date;
    num_likes?: number;
    image_url?: string;
}