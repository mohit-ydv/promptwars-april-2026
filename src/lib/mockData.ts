import type { CrowdData } from "../types";

export const MOCK_STADIUM_DATA: CrowdData[] = [
    { section: "Gate A", density: 0.3, waitTime: 2, type: 'gate' },
    { section: "Gate B", density: 0.9, waitTime: 18, type: 'gate' },
    { section: "North Concourse", density: 0.5, waitTime: 5, type: 'concession' },
    { section: "South Concourse", density: 0.8, waitTime: 12, type: 'concession' },
    { section: "Section 104 Restrooms", density: 0.2, waitTime: 1, type: 'restroom' },
    { section: "Section 118 Restrooms", density: 0.7, waitTime: 8, type: 'restroom' },
    { section: "VIP Lounge", density: 0.1, waitTime: 0, type: 'seating' },
];

export const MOCK_NOTIFICATIONS = [
    { id: '1', type: 'game_update', message: "Goal! Home team leads 1-0.", timestamp: new Date() },
    { id: '2', type: 'crowd_alert', message: "Gate B is congested. Use Gate A for faster entry.", timestamp: new Date(Date.now() - 1000 * 60 * 5) },
];
