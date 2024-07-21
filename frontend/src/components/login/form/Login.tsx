import Input from "../../customComponent/Input";
import { useInput } from "../../../hooks/useInput";
import { emailError, passwordError } from "../../../utils/validation";
import styles from "./form.module.css";

export default function Login({ onToggle }: { onToggle: () => void }) {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    Error: emailErrorValue,
  } = useInput("", (value: any) => emailError(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useInput("", (value: any) => passwordError(value));

  function handleSubmit(event: any) {
    event.preventDefault();

    if (emailErrorValue) {
      return;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles["form-control"]}>
        <h3 className={styles["h3"]}>ورود</h3>

        <div className={styles["form-group"]}>
          <Input
            id="email"
            type="email"
            name="email"
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            value={emailValue}
            error={emailErrorValue}
            placeholder="ایمیل، مانند username@example.com"
            data-name="ایمیل"
          />

          <Input
            id="password"
            type="password"
            name="password"
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            value={passwordValue}
            placeholder="گذرواژه، مانند •••••••••••••••••"
            data-name="گذرواژه"
          />
        </div>

        <div className={styles["check"]}>
          <input
            type="checkbox"
            name="remember_me"
            id="remember-me"
            className={styles["check-input"]}
            value="1"
            data-name="remember_me"
          />
          <label className={styles["check-text"]}>
            من را برای ۳۰ روز به یاد داشته باش
          </label>
        </div>

        <p className={styles["form-actions"]}>
          <button className={styles["btn"]}>ورود</button>
          <button className={styles["flat"]} onClick={onToggle}>
            عضویت
          </button>
        </p>
      </form>
    </>
  );
}
