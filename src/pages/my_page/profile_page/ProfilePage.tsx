import { useForm } from "react-hook-form";

import useProfile from "apis/mypage_apis/useProfile";

import classes from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const { data } = useProfile();

  const methods = useForm({
    mode: "all",
    defaultValues: {
      nickname: "",
      email: "",
    },
  });

  console.log(data);

  return (
    <main className={classes.page_wrap}>
      <section></section>
    </main>
  );
};

export default ProfilePage;
