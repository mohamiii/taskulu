import { useEffect, useState } from "react";
import styles from "./Pages.module.css";
import List from "@/components/tasks/List";
import { FaPlus } from "react-icons/fa";
import { api } from "../api/api";
import { toast } from "react-toastify";

type Props = {
  page?: Pages;
  setPage: (page: Pages) => void;
};
export default function Pages({ page, setPage }: Props) {
  const [lists, setLists] = useState<Lists[]>([]);
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    if (page?.lists) {
      setLists(page.lists);
    }
  }, [page]);

  const handleAddList = async () => {
    if (listTitle.length > 0) {
      try {
        const body = { title: listTitle, page: page?.id };
        const response = await api.post("list/create/", body);
        if (response.status === 201) {
          const allLists = [...lists, response.data];
          setLists(allLists);
          setListTitle("");
        } else {
          toast.error("خطا در ساخت لیست");
        }
      } catch (error) {
        console.error(error);
        toast.error("خطا در ساخت لیست");
      }
    } else {
      toast.error("عنوان نباید خالی باشد");
    }
  };

  return (
    <div className={styles["body"]}>
      {lists && lists.length > 0 ? (
        lists.map((item) => <List key={item.id} list={item} />)
      ) : (
        <div className={styles["task-list-empty"]}>
          <div className={styles["create-list-box"]}>
            <div>
              هیچ لیستی اینجا نیست
              <div>یک لیست جدید ایجاد کن</div>
            </div>
            <div className={styles["input-wrapper"]}>
              <input
                onChange={(e) => setListTitle(e.target.value)}
                className={styles["create-list-input"]}
                placeholder="عنوان لیست"
              ></input>
              <button
                onClick={handleAddList}
                className={styles["create-list-btn"]}
              >
                ایجاد لیست
              </button>
            </div>
          </div>
        </div>
      )}

      {lists && lists.length > 0 && (
        <div className={styles["add-list"]}>
          <input
            onChange={(e) => setListTitle(e.target.value)}
            placeholder="ایجاد لیست جدید"
            className={styles["input"]}
          ></input>
          <span onClick={handleAddList}>
            <FaPlus />
          </span>
        </div>
      )}
    </div>
  );
}
