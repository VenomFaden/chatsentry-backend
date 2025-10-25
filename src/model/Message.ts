

export interface Message{
    id: string;
    chatroom_id: string;
    content: string;
    type: string;
    created_at: string;
    sender: Sender
}

export interface Sender{
    id: number;
    username: string;
    slug: string;
    identity: Identity;
}

export interface Identity{
    color: string;
    badges: Array<any>;
}