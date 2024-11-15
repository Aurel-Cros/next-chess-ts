import type { PieceType } from "@/types/ChessTypes.js";
import styles from './Piece.module.css';

export default function Piece({ p }: { p: PieceType; }) {
    if (!p.isAlive)
        throw new Error('Cannot display a piece that is off the game.');

    return <img className={styles.chessPiece} title={p.name} alt={p.name} src={'/img/sprites/' + p.sprite} />;
}