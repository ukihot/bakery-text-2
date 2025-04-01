export type UsageCode = {
    ja: string;
    en?: string;
};

export enum LogLevel {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
}

export enum TerminalSectionId {
    Purchasing = 0,
    Pantry = 1,
    Mixing = 2,
    Cooling = 3,
    Shaping = 4,
    Baking = 5,
    Packaging = 6,
    SalesFront = 7,
    Waste = 8,
    Utilities = 9,
}
