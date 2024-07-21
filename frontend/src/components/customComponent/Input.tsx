import styles from "./Input.module.css";

type Props = {
  id?: string;
  error?: any;
  [key: string]: any;
};
export default function Input({ id, error, ...props }: Props) {
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
