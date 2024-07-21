import Input from "../../customComponent/Input";
import { useInput } from "../../../hooks/useInput";
import {
  usernameError,
  emailError,
  passwordError,
  confirmPasswordError,
} from "../../../utils/validation";
import styles from "./form.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp({ onToggle }: { onToggle: () => void }) {
  const {
    value: usernameValue,
    handleInputChange: handleUsernameChange,
    handleInputBlur: handleUsernameBlur,
    Error: usernameErrorValue,
  } = useInput("", (value: string) => usernameError(value));

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    Error: emailErrorValue,
  } = useInput("", (value: string) => emailError(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    Error: passwordErrorValue,
  } = useInput("", (value: string) => passwordError(value));

  const {
    value: confirmPasswordValue,
    handleInputChange: handleConfirmPasswordChange,
    handleInputBlur: handleConfirmPasswordBlur,
    Error: confirmPasswordErrorValue,
  } = useInput("", (value: string) =>
    confirmPasswordError(passwordValue, value)
  );

  let dataIsInvalid =
    !usernameValue || !emailValue || !passwordValue || !confirmPasswordValue;

  let dataHasError =
    usernameErrorValue ||
    emailErrorValue ||
    passwordErrorValue ||
    confirmPasswordErrorValue;

  function handleSubmit(event: any) {
    event.preventDefault();

    if (dataIsInvalid || dataHasError) {
      dataHasError
        ? toast.error(dataHasError)
        : toast.error("لطفاً اطلاعات مورد نیاز را تکمیل کنید");
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
            placeholder="نام کاربری، مانند bilbo"
            onBlur={handleUsernameBlur}
            onChange={handleUsernameChange}
            value={usernameValue}
            error={usernameErrorValue}
          />

          <Input
            type="email"
            placeholder="ایمیل، مانند username@example.com"
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            value={emailValue}
            error={emailErrorValue}
          />

          <Input
            type="password"
            placeholder="گذرواژه، مانند •••••••••••••••••"
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            value={passwordValue}
            error={passwordErrorValue}
          />

          <Input
            type="password"
            placeholder="تکرار گذرواژه"
            onBlur={handleConfirmPasswordBlur}
            onChange={handleConfirmPasswordChange}
            value={confirmPasswordValue}
            error={confirmPasswordErrorValue}
          />
        </div>

        <p className={styles["form-actions"]}>
          <button className={styles["btn"]}>عضویت</button>
          <button className={styles["flat"]} onClick={onToggle}>
            ورود
          </button>
        </p>
        <ToastContainer
          rtl
          draggable
          position="top-center"
          pauseOnFocusLoss={false}
        />
      </form>
    </>
  );
}
