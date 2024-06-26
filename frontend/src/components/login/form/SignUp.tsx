import Input from "../../tag/Input";
import { useInput } from "../../../hooks/useInput";
import {
  usernameError,
  emailError,
  passwordError,
  confirmPasswordError,
} from "../../../utils/validation";
import styles from "./form.module.css";

export default function SignUp({ onToggle }: { onToggle: () => void }) {
  const {
    value: usernameValue,
    handleInputChange: handleUsernameChange,
    handleInputBlur: handleUsernameBlur,
    Error: usernameErrorValue,
  } = useInput("", (value: any) => usernameError(value));

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
    Error: passwordErrorValue,
  } = useInput("", (value: any) => passwordError(value));

  const {
    value: confirmPasswordValue,
    handleInputChange: handleConfirmPasswordChange,
    handleInputBlur: handleConfirmPasswordBlur,
    Error: confirmPasswordErrorValue,
  } = useInput("", (value: any) => confirmPasswordError(passwordValue, value));

  let dataIsInvalid =
    usernameErrorValue ||
    emailErrorValue ||
    passwordErrorValue ||
    confirmPasswordErrorValue;

  function handleSubmit(event: any) {
    event.preventDefault();

    if (dataIsInvalid) {
      return;
    }

    //console log for valid inputs
    console.log(
      "%c" +
        "Username: " +
        usernameValue +
        "\nEmail: " +
        emailValue +
        "\nPassword: " +
        passwordValue,
      "padding: 0.15rem; background: #04406b; color: #fcfabd"
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className={styles["h3"]}>عضویت</h3>

        <div className={styles["form-group"]}>
          <Input
            type="text"
            name="username"
            onBlur={handleUsernameBlur}
            onChange={handleUsernameChange}
            value={usernameValue}
            error={usernameErrorValue}
            placeholder="نام کاربری، مانند bilbo"
            data-name="نام کاربری"
          />

          <Input
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
            error={passwordErrorValue}
            placeholder="گذرواژه، مانند •••••••••••••••••"
            data-name="گذرواژه"
          />

          <Input
            id="reg-pass-ver"
            type="password"
            name="password_confirmation"
            onBlur={handleConfirmPasswordBlur}
            onChange={handleConfirmPasswordChange}
            value={confirmPasswordValue}
            error={confirmPasswordErrorValue}
            placeholder="تکرار گذرواژه"
            data-name="تکرار گذرواژه"
          />
        </div>

        <p className={styles["form-actions"]}>
          <button className={styles["btn"]}>عضویت</button>
          <button className={styles["flat"]} onClick={onToggle}>
            ورود
          </button>
        </p>
      </form>
    </>
  );
}
