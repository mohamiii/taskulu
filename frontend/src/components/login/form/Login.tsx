import Input from "../../customComponent/Input";
import { useInput } from "../../../hooks/useInput";
import { usernameError, passwordError } from "../../../utils/validation";
import styles from "./form.module.css";
import { api } from "@/components/api/api";
import { toast } from "react-toastify";
import router from "next/router";

export default function Login({ onToggle }: { onToggle: () => void }) {
  const {
    value: usernameValue,
    handleInputChange: handleUsernameChange,
    handleInputBlur: handleUsernameBlur,
    Error: usernameErrorValue,
  } = useInput("", (value: string) => usernameError(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useInput("", (value: any) => passwordError(value));

  function handleSubmit(event: any) {
    event.preventDefault();

    let dataIsInvalid = !usernameValue || !passwordValue;

    if (dataIsInvalid) {
      toast.error("لطفاً اطلاعات مورد نیاز را تکمیل کنید");
      return;
    }

    const handleSignIn = async () => {
      try {
        const body = {
          username: usernameValue,
          password: passwordValue,
        };
        const response = await api.post("user/login/", body);
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.access);
          router.replace("/dashboard");
        } else {
          toast.error(response.data.detail || "خطا در ورود");
        }
      } catch (error: any) {
        console.error(error);
        const errorMessage = error.response.data.detail.includes(
          "No active account found"
        )
          ? "نام کاربری یا گذرواژه اشتباه است"
          : "خطا در ورود";
        toast.error(errorMessage);
      }
    };
    handleSignIn();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles["form-control"]}>
        <h3 className={styles["h3"]}>ورود</h3>

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
          <button onClick={handleSubmit} className={styles["btn"]}>
            ورود
          </button>
          <button className={styles["flat"]} onClick={onToggle}>
            عضویت
          </button>
        </p>
      </form>
    </>
  );
}
