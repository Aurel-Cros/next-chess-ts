import styles from './Piece.module.css';
import type { AbstractPiece } from "@/classes/Piece/AbstractPiece";

export default function Piece({ p }: { p: AbstractPiece; }) {
    if (!p.isAlive)
        throw new Error('Cannot display a piece that is off the game.');

    return <img className={styles.chessPiece} title={p.name} alt={p.name} src={'/img/sprites/' + p.sprite} />;
}