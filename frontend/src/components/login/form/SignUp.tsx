import { api } from "@/components/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInput } from "../../../hooks/useInput";
import {
  confirmPasswordError,
  emailError,
  passwordError,
  usernameError,
} from "../../../utils/validation";
import Input from "../../customComponent/Input";
import styles from "./form.module.css";

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

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (dataIsInvalid || dataHasError) {
      dataHasError
        ? toast.error(dataHasError)
        : toast.error("لطفاً اطلاعات مورد نیاز را تکمیل کنید");
      return;
    }

    const handleSignup = async () => {
      try {
        const body = {
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          passwordConfirm: confirmPasswordValue,
        };
        const response = await api.post("user/signup/", body);
        if (response.status === 201) {
          toast.success("حساب کاربری با موفقیت ساخته شد");
        } else {
          toast.error(response.data.detail || "خطا در ساخت حساب کاربری");
        }
      } catch (error: any) {
        console.error(error);
        const errorMessage = error.response.data.username[0].includes(
          "username already exists"
        )
          ? "یک کاربر با این نام کاربری وجود دارد، نام دیگری استفاده کنید"
          : "خطا در ورود";
        toast.error(errorMessage);
      }
    };
    handleSignup();
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
      </form>
    </>
  );
}
