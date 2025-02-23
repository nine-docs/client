import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

import useUpdatePassword from "apis/profile_apis/useUpdatePassword";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import classes from "./PasswordUpdateModal.module.scss";

const PasswordUpdateModal = ({ onClose }: { onClose: () => void }) => {
  const methods = useFormContext();

  const { mutate } = useUpdatePassword();

  const handleSubmit = async () => {
    if (!(await methods.trigger(`password`))) {
      methods.setFocus(`password`);
      toast.error(`기존 비밀번호를 확인해 주세요.`);
      return;
    }

    if (!(await methods.trigger(`newPassword`))) {
      methods.setFocus(`newPassword`);
      toast.error(`새 비밀번호를 확인해 주세요.`);
      return;
    }

    mutate(methods.getValues(`password`), methods.getValues(`newPassword`));
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={classes.modal_backdrop}
      onMouseDown={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.75,
        }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.15 }}
        className={classes.modal_content}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={classes.modal_body}>
          <label className={classes.input_wrap}>
            <div>기존 비밀번호</div>
            <BaseInput
              type="password"
              registerName="password"
              placeholder="기존 비밀번호"
              registerOption={{ required: "기존 비밀번호를 입력해 주세요." }}
            />
          </label>
          <label className={classes.input_wrap}>
            <div>새 비밀번호</div>
            <BaseInput
              type="password"
              registerName="newPassword"
              placeholder="새 비밀번호"
              registerOption={{ required: "기존 비밀번호를 입력해 주세요." }}
            />
          </label>
        </div>
        <div className={classes.modal_footer}>
          <TextButton text="변경하기" onClick={handleSubmit} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PasswordUpdateModal;
