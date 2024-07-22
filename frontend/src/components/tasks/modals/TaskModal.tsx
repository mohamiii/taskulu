import styles from "./TaskModal.module.css";
import Modal from "@/components/customComponent/Modal";
import CircularImage from "@/components/dashboard/CircularImage";
import { IoClose } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { useContext, useEffect } from "react";
import { UserContext } from "@/store/user-context";

type Props = {
  open: boolean;
  onClose: () => void;
  tasks: Tasks[];
  setTasks?: (tasks: Tasks[]) => void;
  task?: Tasks;
};

export default function TaskModal({
  open,
  onClose,
  tasks,
  setTasks,
  task,
}: Props) {
  const { user } = useContext(UserContext);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  let createdDate: Date | null = task?.created ? new Date(task.created) : null;
  let formattedCreatedDate = `توسط: ${
    user?.username
  }, در ${createdDate?.toLocaleString()}`;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles["modal-container"]} onKeyDown={handleKeyDown}>
        <div className={styles["header"]}>
          <div className={styles["header-right"]}>
            <div className={styles["image"]}>
              <CircularImage />
            </div>
            <div className={styles["header-text"]}>
              <p>{task?.title}</p>
              <p className={styles["date"]}>{formattedCreatedDate}</p>
            </div>
          </div>
          <div className={styles["header-left"]}>
            <div className={styles["call"]}>
              <div className={styles["call-icon"]}>
                <IoIosCall />
              </div>
              <p className={styles["call-text"]}>تماس</p>
            </div>
            <div onClick={onClose} className={styles["cross-icon"]}>
              <IoClose />
            </div>
          </div>
        </div>

        <div className={styles["body"]}>
          <div className={styles["main"]}>
            <div className={styles["add-description"]}>
              <div className={styles["link-blue"]}>افزودن توضیحات</div>
              <div className={styles["link-black"]}>افزودن برچسب</div>
            </div>
            <div className={styles["checklist"]}>
              <div className={styles["checklist-header"]}>
                <div> لیست انتخاب ۱ </div>
              </div>
              <div className={styles["checklist-item"]}>
                <div className={styles["link"]}> افزودن گزینه‌ جدید</div>
              </div>
            </div>
            <div className={styles["files"]}>
              <div className={styles["files-header"]}>
                <div> فایل‌ها</div>
              </div>
              <div className={styles["files-item"]}>
                <div className={styles["link-blue"]}> انتخاب فایل </div>
                <div> فایل را اینجا بیندازید</div>
              </div>
            </div>
            <div className={styles["comments"]}>
              <div className={styles["comments-header"]}></div>
              <div> دیدگاه‌ها</div>

              <div className={styles["comments-body"]}>
                <input className={styles["comments-input"]} />
              </div>

              <div onClick={onClose} className={styles["btn"]}>
                ارسال
              </div>
            </div>
          </div>

          <div className={styles["side"]}>
            <ul>
              <li>{task?.state}</li>
              <li>لیست: {task?.list}</li>
              <hr />
              <li>اعضا</li>
              <li>تعیین زمان شروع</li>
              <li>تعیین سررسید</li>
              <li>تعیین رنگ</li>
              <li>افزودن لیست انتخاب</li>
              <li>بایگانی</li>
              <li>تنظیمات بیشتر</li>
              <hr />
              <li>تعیین وزن</li>
              <li>تعیین میزان پیشرفت</li>
              <li>ثبت زمان</li>
              <li>کل زمان: ۰:۰۰:۰۰</li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}
