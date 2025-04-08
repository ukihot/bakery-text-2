import type { Terminal } from "../context/TerminalContext";

export const StatusBar = ({ terminal }: { terminal: Terminal }) => {
    const isHealthy = terminal.statusText.terminalStatus === "HEALTHY";

    return (
        <div className="status-bar">
            <p className="status-bar-field">
                {isHealthy ? (
                    <span className="mr-2 text-lime-300">✔</span>
                ) : (
                    <span className="mr-2 text-lime-900">?</span>
                )}
                {terminal.statusText.terminalStatus}
            </p>
            <p className="status-bar-field">
                TEMP: {`${terminal.thresholds.roomTemperature} ℃`}
            </p>
            <p className="status-bar-field">
                LOAD: {`${terminal.thresholds.equipmentWear.toFixed(1)} %`}
            </p>
            {terminal.statusText.errorMessage && (
                <p className="status-bar-field">
                    {terminal.statusText.errorMessage}
                </p>
            )}
        </div>
    );
};
