import { dispatch } from "@/context/EventObserver";
import styles from './menu.module.css';
import { ContextEvent } from "@/types/enums";
import toast from "react-hot-toast";

export default function Menu() {

    const handleReset = () => {
        toast.success('Game resetted.');
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