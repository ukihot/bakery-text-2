import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_MIXING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な混錬コマンド: ${cmd}`,
    en: `Unknown mixing command: ${cmd}`,
});

export const USAGE_MIXING_SUCCESS = (breadKinds: string[]): UsageCode => ({
    ja: `混錬が成功しました！作成されたパン: ${breadKinds.join("\n")}`,
    en: `Mixing was successful! Created bread: ${breadKinds.join("\n")}`,
});

export const USAGE_MIXING_ERROR: UsageCode = {
    ja: "原料が不足しています。",
    en: "Ingredients are insufficient.",
};

export const USAGE_MIXING_REPAIR_SUCCESS: UsageCode = {
    ja: "混錬ターミナルが正常に修復されました。",
    en: "Mixing terminal has been successfully repaired.",
};

export const USAGE_MIXING_REPAIR_FAILURE: UsageCode = {
    ja: "混錬ターミナルの修復に失敗しました。",
    en: "Failed to repair the mixing terminal.",
};
