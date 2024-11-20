import { dispatch } from "@/context/EventObserver";
import styles from './menu.module.css';
import { ContextEvent } from "@/types/enums";

export default function Menu() {

    const handleReset = () => {
        dispatch(ContextEvent.RESET);
    };

    const handleForfeit = () => {
        dispatch(ContextEvent.FORFEIT);
    };

    return <nav className={styles.navBar}>
        <button className={styles.navBtn} onClick={handleReset}>Reset game</button>
        <button className={styles.navBtn} onClick={handleForfeit}>Forfeit game</button>
    </nav >;
}