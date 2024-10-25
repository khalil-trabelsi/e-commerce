export interface Brand {
    id?: number,
    name?: string,
    description: string,
    image: {
        image_url: string, 
        image_alt: string
    }
}