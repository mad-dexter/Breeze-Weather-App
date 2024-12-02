import styles from "./Switch.module.css";

function Switch({ id, valueProp, onChange, leftText, rightText }) {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox}
        value={valueProp}
        checked={valueProp}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />

      <label htmlFor={id} className={styles.toggle}>
        <p className={styles.toggleText}>
          {leftText} &nbsp; {rightText}
        </p>
      </label>
    </div>
  );
}

export default Switch;
