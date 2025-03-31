import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_COOLING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な冷却コマンド: ${cmd}`,
    en: `Unknown cooling command: ${cmd}`,
});

export const USAGE_COOLING_FIRST_PROOFING_COMPLETED: UsageCode = {
    ja: "一次発酵が完了しました。",
    en: "First proofing is completed.",
};

export const USAGE_COOLING_NO_DOUGH_AFTER_MIXING: UsageCode = {
    ja: "混錬後の生地はありません。",
    en: "No dough available after mixing.",
};

export const USAGE_COOLING_SECOND_PROOFING_COMPLETED: UsageCode = {
    ja: "二次発酵が完了しました。",
    en: "Second proofing is completed.",
};

export const USAGE_COOLING_NO_SHAPED_BREAD: UsageCode = {
    ja: "成型済みのパンはありません。",
    en: "No shaped bread available.",
};
