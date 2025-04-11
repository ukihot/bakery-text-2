"use client";

import { useCallback, useContext, useEffect } from "react";
import {
    type Terminal,
    TerminalContext,
    TerminalStatus,
} from "../context/TerminalContext";
import { useAbnormalHandlers } from "../hooks/useAbnormalHandlers";
import { useNormalHandlers } from "../hooks/useNormalHandlers";
import { USAGE_HEAL } from "../utils/usage/usageGeneral";
import TerminalWindowUnit from "./TerminalWindowUnit";

export const TerminalWindows = () => {
    const context = useContext(TerminalContext);
    if (!context) {
        return null;
    }
    const {
        terminals,
        addNews,
        maintainEquipment,
        productionSpeed,
        wearEquipment,
        isGameOver,
    } = context;

    const abnormalHandlers = useAbnormalHandlers(context);
    const normalHandlers = useNormalHandlers(context);

    const handleTrouble = useCallback(
        (terminal: Terminal) => {
            switch (terminal.id) {
                case 0:
                    abnormalHandlers.handlePurchasingTrouble();
                    break;
                case 1:
                    abnormalHandlers.handlePantryTrouble();
                    break;
                case 2:
                    abnormalHandlers.handleMixingTrouble();
                    break;
                case 3:
                    abnormalHandlers.handleCoolingTrouble();
                    break;
                case 4:
                    abnormalHandlers.handleShapingTrouble();
                    break;
                case 5:
                    abnormalHandlers.handleBakingTrouble();
                    break;
                case 6:
                    abnormalHandlers.handlePackagingTrouble();
                    break;
                case 7:
                    abnormalHandlers.handleSalesFrontTrouble();
                    break;
                case 8:
                    abnormalHandlers.handleWasteTrouble();
                    break;
                case 9:
                    abnormalHandlers.handleUtilitiesTrouble();
                    break;
                default:
            }
        },
        [abnormalHandlers],
    );

    const handleNormalBatch = useCallback(
        (terminal: Terminal) => {
            switch (terminal.id) {
                case 0:
                    normalHandlers.handlePurchasingBatch();
                    break;
                case 1:
                    normalHandlers.handlePantryBatch();
                    break;
                case 2:
                    normalHandlers.handleMixingBatch();
                    break;
                case 3:
                    normalHandlers.handleCoolingBatch();
                    break;
                case 4:
                    normalHandlers.handleShapingBatch();
                    break;
                case 5:
                    normalHandlers.handleBakingBatch();
                    break;
                case 6:
                    normalHandlers.handlePackagingBatch();
                    break;
                case 7:
                    normalHandlers.handleSalesFrontBatch();
                    break;
                case 8:
                    normalHandlers.handleWasteBatch();
                    break;
                case 9:
                    normalHandlers.handleUtilitiesBatch();
                    break;
                default:
            }
        },
        [normalHandlers],
    );

    const applyDamage = useCallback(
        (terminalId: number) => {
            const damage = Math.random() * 3 + 4; // 4から7の乱数
            wearEquipment(terminalId, damage);
        },
        [wearEquipment],
    );

    // パン工房稼働
    useEffect(() => {
        const intervals = terminals.map((terminal) =>
            setInterval(() => {
                if (isGameOver()) return intervals.forEach(clearInterval);

                const { terminalStatus } = terminal.statusText;

                switch (terminalStatus) {
                    case TerminalStatus.ON_BREAK:
                        maintainEquipment(terminal.id, 5);
                        addNews(terminal.id, USAGE_HEAL);
                        break;

                    case TerminalStatus.HEALTHY:
                        handleNormalBatch(terminal);
                        if (Math.random() < terminal.troubleProbability) {
                            applyDamage(terminal.id); // ダメージを適用
                            handleTrouble(terminal);
                        }
                        break;

                    default:
                        applyDamage(terminal.id); // ダメージを適用
                        handleTrouble(terminal);
                        break;
                }
            }, productionSpeed),
        );

        return () => intervals.forEach(clearInterval);
    }, [
        terminals,
        handleTrouble,
        handleNormalBatch,
        applyDamage,
        isGameOver,
        maintainEquipment,
        addNews,
        productionSpeed,
    ]);

    return (
        <>
            {terminals.map((terminal) => (
                <TerminalWindowUnit
                    key={terminal.id}
                    {...terminal}
                    visible={false}
                    progress={0}
                />
            ))}
        </>
    );
};
