import styles from "./Input.module.css";

export default function Input({
  label,
  id,
  error,
  ...props
}: {
  id?: string;
  error?: any;
  [key: string]: any;
}) {
  return (
    <div className={styles["form-content"]}>
      <input
        className={error ? styles["input-error"] : styles["input"]}
        id={id}
        {...props}
      />
      <div className={styles["input-bottom-error"]}>
        {error && <p className={styles["error-text"]}>{error}</p>}
      </div>
    </div>
  );
}
