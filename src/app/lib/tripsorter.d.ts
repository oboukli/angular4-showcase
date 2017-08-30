export interface Deal {
    "transport": string;
    "departure": string;
    "arrival": string;
    "duration": {
        "h": string;
        "m": string;
    };
    "cost": number;
    "discount": number;
    "reference": string;
}

export type WeighProvider = (deal: Deal) => number;

export interface PathGraph {
    [x: string]: any;
    path: any[];
    cost: number;
}