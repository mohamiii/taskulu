import styles from "./Sidebar.module.css";
import { BiNews } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { ImBubbles4 } from "react-icons/im";
import { GoDotFill } from "react-icons/go";
import { ImUsers } from "react-icons/im";
import { TbSettingsStar } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";

type Props = {
  projectTitle: string;
};
export default function Sidebar({ projectTitle }: Props) {
  return (
    <div className={styles["sidebar"]}>
      <Link href={"/dashboard"} className={styles["header"]}>
        <div className={styles["home-icon"]}>
          <FaHome />
        </div>
        <div className={styles["right-icon"]}>
          <FaAngleRight />
        </div>
        <div className={styles["home-link"]}>{projectTitle}</div>
      </Link>
      <div className={styles["body"]}>
        <li className={styles["link-active"]}>
          <BiNews />
          کارها
        </li>
        <li className={styles["link"]}>
          <LuTimer />
          زمان‌های کاری
        </li>
        <li className={styles["link"]}>
          <ImBubbles4 />
          گفتگو‌ها
        </li>
        <li className={styles["link"]}>
          <GoDotFill />
          گفتگوی همگانی
        </li>
      </div>
      <div className={styles["footer"]}>
        <span className={styles["footer-link"]}>
          <ImUsers />
          مدیریت کاربران
        </span>
        <span className={styles["footer-link"]}>
          <TbSettingsStar />
          تنظیمات
          <div className={styles["dropdown-icon"]}>
            <RiArrowDropDownLine />
          </div>
        </span>
      </div>
    </div>
  );
}
