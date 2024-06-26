import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "/public/assets/images/taskulu-fa-blue.svg";
import Login from "@/components/login/form/Login";
import SignUp from "@/components/login/form/SignUp";
import OtherOptions from "@/components/login/OtherOptions";
import Footer from "@/components/login/Footer";
import styles from "./index.module.css";

export default function SignIn() {
  const [signUp, setSignUp] = useState(false);

  function handleSignUpToggle() {
    setSignUp(!signUp);
  }

  const form = signUp ? (
    <SignUp onToggle={() => handleSignUpToggle()} />
  ) : (
    <Login onToggle={() => handleSignUpToggle()} />
  );

  return (
    <>
      <div className={styles["authorize"]}>
        <div className={styles["authorize-inner"]}>
          <div className={styles["authorize-form"]}>
            <h1 className={styles["logo"]}>
              <Link href={""}>
                <Image src={Logo} alt="" width={"153"} />
              </Link>
            </h1>
            <div className={styles["form"]}>
              <div className={styles["form-inner"]}>{form}</div>
            </div>
            <OtherOptions />
          </div>
          <Footer />
        </div>
        <div className={styles["authorize-image"]}>
          <div className={styles["header-text"]}>
            <h3>برنامه امروزتون چیه؟</h3>
            <h5>وقتشه کار رو شروع کنیم</h5>
          </div>
        </div>
      </div>
    </>
  );
}
