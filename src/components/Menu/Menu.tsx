import { dispatch } from "@/context/EventObserver";
import styles from './menu.module.css';

export default function Menu() {

    const handleReset = () => {
        dispatch('reset-board');
    };

    return <nav className={styles.navBar}>
        <button className={styles.navBtn} onClick={handleReset}>Reset game</button>
    </nav >;
}