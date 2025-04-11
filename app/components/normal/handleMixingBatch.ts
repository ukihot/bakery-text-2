import { BreadCookingStatus, BreadType } from "@/app/bt.types";
import {
    type Ingredient,
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import { breadRecipes } from "@/app/utils/breadRecipe";
import {
    USAGE_INGREDIENT_CONSUMPTION,
    USAGE_MIXING_ERROR,
    USAGE_MIXING_SUCCESS,
} from "@/app/utils/usage/usageMixing";
import { v4 as uuidv4 } from "uuid";

export const handleMixingBatch = async (context: TerminalContextType) => {
    const { addNews, updateRepository, updateBread } = context;

    const newBread = [];
    for (const recipe of breadRecipes) {
        const requiredIngredients = Object.entries(recipe).reduce(
            (acc, [key, value]) => {
                if (key !== "kind") {
                    acc[key as keyof Ingredient] = value;
                }
                return acc;
            },
            {} as Partial<Ingredient>,
        );

        const isSuccess = updateRepository(false, requiredIngredients);
        const breadKind = BreadType[recipe.kind];

        // 必要な原料が不足している場合は次のパンに進む
        if (!isSuccess) {
            addNews(TerminalSectionId.Mixing, USAGE_MIXING_ERROR(breadKind));
            continue;
        }

        // 原料消費のusageを追加
        for (const [ingredient, amount] of Object.entries(
            requiredIngredients,
        )) {
            if (amount > 0) {
                addNews(
                    TerminalSectionId.Mixing,
                    USAGE_INGREDIENT_CONSUMPTION(ingredient, amount),
                );
            }
        }

        // 原料を消費し、パンを追加
        newBread.push({
            id: uuidv4(),
            kind: recipe.kind,
            cookStatus: BreadCookingStatus.Raw,
        });

        addNews(TerminalSectionId.Mixing, USAGE_MIXING_SUCCESS(breadKind));
    }

    updateBread([...context.bread, ...newBread]);
};
