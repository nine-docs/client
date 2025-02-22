import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

import useUpdateNickname from "apis/profile_apis/useUpdateNickname";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import classes from "./NicknameInput.module.scss";

const NicknameInput = () => {
  const methods = useFormContext();

  const { mutate } = useUpdateNickname();

  const handleNicknameChangeClick = async () => {
    const isValid = await methods.trigger("nickname");

    if (!isValid) {
      toast.error("닉네임을 확인해 주세요.");
      methods.setFocus("nickname");
      return;
    }

    mutate({
      newNickname: methods.getValues("nickname"),
    });
  };

  return (
    <label className={classes.input_wrap}>
      <div className={classes.label}>닉네임</div>
      <div className={classes.input}>
        <BaseInput
          type="text"
          registerName={`nickname`}
          registerOption={{ required: "닉네임을 입력해 주세요." }}
          placeholder="닉네임을 입력해 주세요."
        />
      </div>
      <TextButton
        type="button"
        text="닉네임 변경"
        title="닉네임 변경"
        p="s"
        size="normal"
        height={"35"}
        onClick={handleNicknameChangeClick}
      />
    </label>
  );
};

export default NicknameInput;
