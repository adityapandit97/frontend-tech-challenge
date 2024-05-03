export async function fetchFeed(page: number): Promise<any> {
    try {
        const response = await fetch(`http://localhost:4000/feed?page=${page}`);
        if (!response.ok) {
            throw new Error('Failed to fetch feed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching feed:', error);
        return [];
    }
}

export async function fetchComments(briefRef: string): Promise<any> {
    try {
        const response = await fetch(`http://localhost:4000/comments/${briefRef}`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}
