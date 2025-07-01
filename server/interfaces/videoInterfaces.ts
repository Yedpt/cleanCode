export interface videoAttributes {
    id: number;
    user_id: number;
    title: string;
    video_url: string;
    published_at?: Date;
    updated_at?: Date;
    thumbnail?: string | null; 
}