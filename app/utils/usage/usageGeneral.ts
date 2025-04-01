import type { UsageCode } from "../../bt.types";

export const USAGE_TEXTS = {
    EMPTY: "",
    HELP_HEADER: {
        ja: "利用可能なコマンド一覧:",
        en: "Here are the available commands:",
    },
    HELP_LS: {
        ja: "ls - すべてのセクションの名前とIDを一覧表示",
        en: "ls - List the names and IDs of all sections.",
    },
    HELP_MODE: {
        ja: "mode {id} - 別のセクションに切り替えます。",
        en: "mode {id} - Switch to a different section.",
    },
    HELP_TERM_OPEN: {
        ja: "term open {id} - 指定したIDのターミナルを開く。",
        en: "term open {id} - Open a terminal with the specified ID.",
    },
    HELP_TERM_FORMAT: {
        ja: "term format - 開いているターミナルを整理する。",
        en: "term format - Arrange the open terminals neatly.",
    },
    PURCHASING_TROUBLE: {
        ja: "購買ターミナルに問題が発生しました！",
        en: "Purchasing terminal encountered a problem!",
    },
    PANTRY_TROUBLE: {
        ja: "パントリーターミナルに問題が発生しました！",
        en: "Pantry terminal encountered a problem!",
    },
    MIXING_TROUBLE: {
        ja: "ミキシングターミナルに問題が発生しました！",
        en: "Mixing terminal encountered a problem!",
    },
    COOLING_TROUBLE: {
        ja: "冷却ターミナルに問題が発生しました！",
        en: "Cooling terminal encountered a problem!",
    },
    SHAPING_TROUBLE: {
        ja: "成形ターミナルに問題が発生しました！",
        en: "Shaping terminal encountered a problem!",
    },
    BAKING_TROUBLE: {
        ja: "焼成ターミナルに問題が発生しました！",
        en: "Baking terminal encountered a problem!",
    },
    PACKAGING_TROUBLE: {
        ja: "包装ターミナルに問題が発生しました！",
        en: "Packaging terminal encountered a problem!",
    },
    SALES_FRONT_TROUBLE: {
        ja: "販売ターミナルに問題が発生しました！",
        en: "Sales front terminal encountered a problem!",
    },
    WASTE_TROUBLE: {
        ja: "廃棄物ターミナルに問題が発生しました！",
        en: "Waste terminal encountered a problem!",
    },
    UTILITIES_TROUBLE: {
        ja: "ユーティリティターミナルに問題が発生しました！",
        en: "Utilities terminal encountered a problem!",
    },
    UNHANDLED_TROUBLE: {
        ja: "未処理のターミナル問題が発生しました！",
        en: "Unhandled terminal trouble!",
    },
} as const;

export const USAGE_EMPTY: UsageCode = {
    ja: USAGE_TEXTS.EMPTY,
} as const;

export const USAGE_HELP_HEADER: UsageCode = USAGE_TEXTS.HELP_HEADER;

export const USAGE_HELP_LS: UsageCode = USAGE_TEXTS.HELP_LS;

export const USAGE_HELP_MODE: UsageCode = USAGE_TEXTS.HELP_MODE;

export const USAGE_HELP_TERM_OPEN: UsageCode = USAGE_TEXTS.HELP_TERM_OPEN;

export const USAGE_HELP_TERM_FORMAT: UsageCode = USAGE_TEXTS.HELP_TERM_FORMAT;

export const USAGE_TERM_FORMATTED: UsageCode = {
    ja: "ターミナルが整理されました。",
    en: "Terminals have been formatted.",
};

export const USAGE_UNKNOWN_COMMAND: UsageCode = {
    ja: "不明なコマンドです。",
    en: "Unknown command.",
};

export const USAGE_LS_ITEM = (
    sectionName: string,
    sectionId: string,
): UsageCode => ({
    ja: `-[ ${sectionName} ] ${sectionId}`,
    en: `-[ ${sectionName} ] ${sectionId}`,
});

export const USAGE_INVALID_TERMINAL_ID = (id: string): UsageCode => ({
    ja: `無効なターミナルID: ${id}。有効なTerminalSectionIdに対応する数値である必要があります。`,
    en: `Invalid Terminal ID: ${id}. Must be a number corresponding to a valid TerminalSectionId.`,
});

export const USAGE_ACTIVATING_TERMINAL = (terminalName: string): UsageCode => ({
    ja: `ターミナルをアクティブ化しています: ${terminalName.toUpperCase()}`,
    en: `Activating Terminal: ${terminalName.toUpperCase()}`,
});

export const USAGE_MISSING_ID_TERM_OPEN: UsageCode = {
    ja: "'term open'のIDが不足しています。",
    en: "Missing ID for 'term open'.",
};

export const USAGE_UPDATED_TERMINAL_POSITION = (
    id: number,
    position: { x: number; y: number; z: number },
): UsageCode => ({
    ja: `ターミナルID: ${id} の位置を更新しました: (${position.x}, ${position.y}, ${position.z})`,
    en: `Updated Terminal ID: ${id} to Position: (${position.x}, ${position.y}, ${position.z})`,
});

export const USAGE_INVALID_TERM_SUBCOMMAND = (
    subCommand: string,
): UsageCode => ({
    ja: `無効なtermサブコマンド: ${subCommand}`,
    en: `Invalid term subcommand: ${subCommand}`,
});

export const USAGE_INVALID_MODE_ID = (id: string): UsageCode => ({
    ja: `無効なモードID: ${id}。有効なTerminalSectionIdに対応する数値である必要があります。`,
    en: `Invalid Mode ID: ${id}. Must be a number corresponding to a valid TerminalSectionId.`,
});

export const USAGE_MODE_CHANGED = (modeName: string): UsageCode => ({
    ja: `モードが変更されました: ${modeName.toUpperCase()}`,
    en: `Mode changed to: ${modeName.toUpperCase()}`,
});

export const USAGE_INVALID_OR_MISSING_ID_MODE: UsageCode = {
    ja: "'mode'のIDが無効または不足しています。",
    en: "Invalid or missing ID for 'mode'.",
};

export const USAGE_LANGUAGE_CHANGED = (lang: "ja" | "en"): UsageCode => ({
    ja: `言語が変更されました: ${lang === "ja" ? "日本語" : "英語"}`,
    en: `Language changed to: ${lang === "ja" ? "Japanese" : "English"}`,
});

export const USAGE_COMMAND_NOT_ALLOWED = (cmd: string): UsageCode => ({
    ja: `コマンド "${cmd}" は現在のモードでは使用できません。`,
    en: `Command "${cmd}" is not allowed in the current mode.`,
});
