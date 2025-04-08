import { BreadCookingStatus, BreadType } from "@/app/bt.types";
import {
    type Ingredient,
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import { breadRecipes } from "@/app/utils/breadRecipe";
import {
    USAGE_MIXING_ERROR,
    USAGE_MIXING_SUCCESS,
} from "@/app/utils/usage/usageMixing";
import { v4 as uuidv4 } from "uuid";

export const handleMixingBatch = (context: TerminalContextType) => {
    const { addNews, updateRepository, updateBread } = context;

    // 消費する原料を計算
    const totalConsumption = breadRecipes.reduce(
        (acc, recipe) => {
            for (const key of Object.keys(recipe) as (keyof typeof recipe)[]) {
                if (key !== "kind") {
                    acc[key] = (acc[key] || 0) + recipe[key];
                }
            }
            return acc;
        },
        {} as Partial<Ingredient>,
    );

    // 原料を消費
    if (!updateRepository(false, totalConsumption)) {
        addNews(TerminalSectionId.Mixing, USAGE_MIXING_ERROR);
        return;
    }

    // 製造したパン
    const newBread = breadRecipes.map((recipe) => ({
        id: uuidv4(),
        kind: recipe.kind,
        cookStatus: BreadCookingStatus.Raw,
    }));

    updateBread([...context.bread, ...newBread]);

    const breadKinds = newBread.map((bread) => BreadType[bread.kind]);
    addNews(TerminalSectionId.Mixing, USAGE_MIXING_SUCCESS(breadKinds));
};
