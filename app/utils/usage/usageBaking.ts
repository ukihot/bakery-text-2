import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_BAKING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な焼成コマンド: ${cmd}`,
    en: `Unknown baking command: ${cmd}`,
});

export const USAGE_BAKING_TROUBLE: UsageCode = {
    ja: "焼成ターミナルに問題が発生しました！",
    en: "Baking terminal encountered a problem!",
};

export const USAGE_BAKING_ACTIVITY: UsageCode = {
    ja: "焼成ターミナルが正常に動作しています。",
    en: "Baking terminal is operating normally.",
};

export const USAGE_NO_SECOND_PROOFED_BREAD: UsageCode = {
    ja: "二次発酵済みのパンがありません。",
    en: "No second-proofed bread available.",
};

export const USAGE_BAKING_PANIC1: UsageCode = {
    ja: "従業員の声：なんかめっちゃくさい",
    en: "Staff voice: Something smells really bad",
};

export const USAGE_BAKING_REPAIR_SUCCESS: UsageCode = {
    ja: "焼成ターミナルが正常に修理されました。",
    en: "Baking terminal has been successfully repaired.",
};

export const USAGE_BAKING_REPAIR_FAILURE: UsageCode = {
    ja: "焼成ターミナルの修理に失敗しました。",
    en: "Failed to repair the baking terminal.",
};
