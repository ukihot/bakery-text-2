"use client";

import { useCallback, useContext, useEffect } from "react";
import { type Terminal, TerminalContext } from "../context/TerminalContext";
import { USAGE_TEXTS } from "../utils/usage/usageGeneral";
import TerminalWindowUnit from "./TerminalWindowUnit";

export const TerminalWindows = () => {
    const context = useContext(TerminalContext);
    if (!context) {
        return null;
    }
    const { terminals, addNews } = context;

    const handlePurchasingTrouble = useCallback(
        (terminal: Terminal) => {
            addNews(terminal.id, USAGE_TEXTS.PURCHASING_TROUBLE);
            // 他の処理をここに追加可能
        },
        [addNews],
    );

    const handlePantryTrouble = useCallback(
        (terminal: Terminal) => {
            addNews(terminal.id, USAGE_TEXTS.PANTRY_TROUBLE);
            // 他の処理をここに追加可能
        },
        [addNews],
    );

    const handleMixingTrouble = useCallback(
        (terminal: Terminal) => {
            addNews(terminal.id, USAGE_TEXTS.MIXING_TROUBLE);
            // 他の処理をここに追加可能
        },
        [addNews],
    );

    const handleCoolingTrouble = useCallback(
        (terminal: Terminal) => {
            addNews(terminal.id, USAGE_TEXTS.COOLING_TROUBLE);
            // 他の処理をここに追加可能
        },
        [addNews],
    );

    const handleShapingTrouble = useCallback(
        (terminal: Terminal) => {
            addNews(terminal.id, USAGE_TEXTS.SHAPING_TROUBLE);
            // 他の処理をここに追加可能
        },
        [addNews],
    );

    const handleBakingTrouble = useCallback(
        (terminal: Terminal) => {
            addNews(terminal.id, USAGE_TEXTS.BAKING_TROUBLE);
            // 他の処理をここに追加可能
        },
        [addNews],
    );

    const handlePackagingTrouble = useCallback(
        (terminal: Terminal) => {
            addNews(terminal.id, USAGE_TEXTS.PACKAGING_TROUBLE);
            // 他の処理をここに追加可能
        },
        [addNews],
    );

    const handleSalesFrontTrouble = useCallback(
        (terminal: Terminal) => {
            addNews(terminal.id, USAGE_TEXTS.SALES_FRONT_TROUBLE);
            // 他の処理をここに追加可能
        },
        [addNews],
    );

    const handleWasteTrouble = useCallback(
        (terminal: Terminal) => {
            addNews(terminal.id, USAGE_TEXTS.WASTE_TROUBLE);
            // 他の処理をここに追加可能
        },
        [addNews],
    );

    const handleUtilitiesTrouble = useCallback(
        (terminal: Terminal) => {
            addNews(terminal.id, USAGE_TEXTS.UTILITIES_TROUBLE);
            // 他の処理をここに追加可能
        },
        [addNews],
    );

    const handleTrouble = useCallback(
        (terminal: Terminal) => {
            switch (terminal.id) {
                case 0:
                    handlePurchasingTrouble(terminal);
                    break;
                case 1:
                    handlePantryTrouble(terminal);
                    break;
                case 2:
                    handleMixingTrouble(terminal);
                    break;
                case 3:
                    handleCoolingTrouble(terminal);
                    break;
                case 4:
                    handleShapingTrouble(terminal);
                    break;
                case 5:
                    handleBakingTrouble(terminal);
                    break;
                case 6:
                    handlePackagingTrouble(terminal);
                    break;
                case 7:
                    handleSalesFrontTrouble(terminal);
                    break;
                case 8:
                    handleWasteTrouble(terminal);
                    break;
                case 9:
                    handleUtilitiesTrouble(terminal);
                    break;
                default:
                    addNews(terminal.id, USAGE_TEXTS.UNHANDLED_TROUBLE);
            }
        },
        [
            handlePurchasingTrouble,
            handlePantryTrouble,
            handleMixingTrouble,
            handleCoolingTrouble,
            handleShapingTrouble,
            handleBakingTrouble,
            handlePackagingTrouble,
            handleSalesFrontTrouble,
            handleWasteTrouble,
            handleUtilitiesTrouble,
            addNews,
        ],
    );

    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];

        terminals.forEach((terminal, index) => {
            const timer = setTimeout(() => {
                setInterval(() => {
                    if (Math.random() < terminal.troubleProbability) {
                        handleTrouble(terminal);
                    }
                }, 8000); // 8秒ごとに実行
            }, index * 1000); // 1秒ずつずらして開始
            timers.push(timer);
        });

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [terminals, handleTrouble]);

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
