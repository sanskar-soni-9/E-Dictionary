import { RiBook2Line } from "react-icons/ri";
import { HiOutlineMoon } from "react-icons/hi";
import { BsFillSunFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

import styles from "../styles/Header.module.scss";

const Header = ({ displayMode, setDisplayMode, query, setQuery, handleSubmit, setFonts }) => {

  const selectStyles = {
    backgroundColor: displayMode ? "#fff" : "#000",
    color: displayMode ? "#000" : "#fff",
  }

  const handleInput = (e) => {
    if(e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <header>
      <nav className={styles.nav}>
        <RiBook2Line size={32} className={styles.brandIcon} />
        <select style={{...selectStyles}} onChange={(e) => setFonts(e.target.value)}>
          <option value="serif">Serif</option>
          <option value="sans-serif">Sans-Serif</option>
          <option value="monospace">
            Monospace
          </option>
          <option value="cursive">Cursive</option>
        </select>
        <label className={styles.toggleMode}>
          <input type="checkbox" onClick={() => setDisplayMode(!displayMode)} checked={!displayMode} onChange={() => setDisplayMode(!displayMode)} />
          <span></span>
          {!displayMode ? 
            <HiOutlineMoon className={styles.modeIcons} />
          :
            <BsFillSunFill className={styles.modeIcons} />
          }
        </label>
      </nav>
      <label className={styles.searchLabel}>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => handleInput(e)} style={{
          backgroundColor: displayMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.15)"
        }} />
        <FiSearch className={styles.searchBtn} onClick={() => handleSubmit()} />
      </label>
    </header>
  );
};

export default Header;
