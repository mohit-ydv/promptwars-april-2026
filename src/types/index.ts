export interface CrowdData {
    section: string;
    density: number; // 0 to 1
    waitTime: number; // minutes
    type: 'gate' | 'concession' | 'restroom' | 'seating';
}

export interface StadiumEvent {
    id: string;
    type: 'emergency' | 'game_update' | 'crowd_alert';
    message: string;
    timestamp: Date;
    location?: string;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}
