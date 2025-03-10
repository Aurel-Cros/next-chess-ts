import { subscribe } from "@/context/EventObserver";
import { useContext, useState, type PropsWithChildren } from "react";
import styles from "./gameStatusModal.module.css";
import { ContextEvent, GameStatus, PlayerColour } from "@/types/enums";
import type { BoardContextType } from "@/types/ChessTypes";
import { BoardStateContext } from "@/context/BoardState";

export default function GameStatusModal({ children }: PropsWithChildren) {
    const [statusMessage, setStatusMessage] = useState<GameStatus | null>(null);
    const boardState = useContext<BoardContextType>(BoardStateContext);

    subscribe(ContextEvent.STATUS, (message: GameStatus | null) => {
        setStatusMessage(message);
    });
    subscribe(ContextEvent.FORFEIT, () => {
        setStatusMessage(
            boardState.player === PlayerColour.White ?
                GameStatus.WhiteFF :
                GameStatus.BlackFF
        );
    });

    return <div className={styles.wrapper}>
        {statusMessage &&
            <div className={styles.statusMessage}>
                <p className={styles.text}>{
                    statusMessage
                }</p>
            </div>}
        {children}
    </div >;
}