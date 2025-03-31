"use client";

import { useContext, useEffect, useRef, useState } from "react";
import {
	TerminalContext,
	type TerminalPosition,
} from "../context/TerminalContext";
import { TerminalSectionId } from "../utils/Command";

export const MyTerminalWindow = ({
	id,
	position: initialPosition,
}: {
	id: TerminalSectionId;
	position: TerminalPosition;
}) => {
	const terminalContext = useContext(TerminalContext);
	if (!terminalContext) return null;

	const { terminals, updateTerminalPosition } = terminalContext;
	const terminal = terminals.find((t) => t.id === id);
	if (!terminal) return null;

	const [position, setPosition] = useState(initialPosition);
	const [isMinimized, setIsMinimized] = useState(false);

	const [isDragging, setIsDragging] = useState(false);
	const dragStartPos = useRef({ x: 0, y: 0 });

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		dragStartPos.current = {
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		};
	};

	useEffect(() => {
		setPosition(initialPosition);
	}, [initialPosition]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			setPosition({
				x: e.clientX - dragStartPos.current.x,
				y: e.clientY - dragStartPos.current.y,
				z: position.z,
			});
		};

		const handleMouseUp = () => {
			setIsDragging(false);
			updateTerminalPosition(id, {
				x: position.x,
				y: position.y,
				z: position.z,
			});
		};

		if (isDragging) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [id, isDragging, position, updateTerminalPosition]);

	return (
		<div
			className="window absolute"
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				zIndex: position.z,
			}}
		>
			<div
				className={`title-bar cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
				onMouseDown={handleMouseDown}
			>
				<div className="title-bar-text">Terminal {TerminalSectionId[id]}</div>
				<div className="title-bar-controls">
					<button
						type="button"
						aria-label="Minimize"
						onClick={() => setIsMinimized(true)}
					/>
					<button
						type="button"
						aria-label="Maximize"
						onClick={() => setIsMinimized(false)}
					/>
					<button type="button" aria-label="Close" />
				</div>
			</div>
			{!isMinimized && (
				<div className="window-body max-h-[360px] w-[582px] overflow-y-scroll">
					<p>Terminal {id}</p>
				</div>
			)}
			<div className="status-bar">
				{terminal.statusTexts.map((text) => (
					<p key={text} className="status-bar-field">
						{text}
					</p>
				))}
			</div>
		</div>
	);
};
