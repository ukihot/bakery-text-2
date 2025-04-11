import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_MIXING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な混錬コマンド: ${cmd}`,
    en: `Unknown mixing command: ${cmd}`,
});

export const USAGE_MIXING_SUCCESS = (breadKind: string): UsageCode => ({
    ja: `${breadKind} の生地ができました。`,
    en: `The dough for ${breadKind} has been prepared.`,
});

export const USAGE_MIXING_ERROR = (breadKind: string): UsageCode => ({
    ja: `${breadKind} の材料が足りませんでした。`,
    en: `The ingredients for ${breadKind} were insufficient.`,
});

export const USAGE_MIXING_REPAIR_SUCCESS: UsageCode = {
    ja: "混錬ターミナルが正常に修復されました。",
    en: "Mixing terminal has been successfully repaired.",
};

export const USAGE_MIXING_REPAIR_FAILURE: UsageCode = {
    ja: "混錬ターミナルの修復に失敗しました。",
    en: "Failed to repair the mixing terminal.",
};

export const USAGE_INGREDIENT_CONSUMPTION = (
    ingredient: string,
    amount: number,
): UsageCode => ({
    ja: `${ingredient} を ${amount} g使用した。`,
    en: `${amount} g of ${ingredient} was used.`,
});
