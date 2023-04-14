import { ImSpinner2 } from "react-icons/im";

import styles from "../styles/Spinner.module.scss";

const Spinner = ({ size }) => {
  return <ImSpinner2 size={size} className={styles.spinner} />
}

export default Spinner;
