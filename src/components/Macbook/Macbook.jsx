import styles from "./Macbook.module.css";

const Macbook = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className={styles.macbook}>
        <div className={styles.macbook__topBord}>
          <div className={styles.macbook__display}>
            <div className={styles.macbook__load}></div>
          </div>
        </div>

        <div className={styles.macbook__underBord}>
          <div className={styles.macbook__keybord}>
            <div className={styles.keybord}>
              <div className={styles.keybord__touchbar}></div>

              {/* Hàng phím trên */}
              <ul className={styles.keybord__keyBox}>
                {Array.from({ length: 13 }).map((_, i) => (
                  <li
                    key={i}
                    className={`${styles.keybord__key} ${
                      styles[`key--${String(i + 1).padStart(2, "0")}`]
                    }`}
                  />
                ))}
              </ul>

              {/* Hàng phím dưới */}
              <ul className={styles["keybord__keyBox--under"]}>
                {Array.from({ length: 11 }).map((_, i) => (
                  <li
                    key={i + 14}
                    className={`${styles.keybord__key} ${
                      styles[`key--${i + 14}`]
                    }`}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Macbook;
