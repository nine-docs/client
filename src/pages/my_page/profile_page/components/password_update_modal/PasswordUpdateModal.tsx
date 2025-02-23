import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

import BaseInput from "components/inputs/base_input/BaseInput";

import classes from "./PasswordUpdateModal.module.scss";

const PasswordUpdateModal = ({ onClose }: { onClose: () => void }) => {
  const methods = useFormContext();

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
        <h3>비밀번호 변경</h3>
        <label>
          <div>기존 비밀번호</div>
          <BaseInput
            type="password"
            registerName="password"
            placeholder="기존 비밀번호"
            registerOption={{ required: "기존 비밀번호를 입력해 주세요." }}
          />
        </label>
        <label>
          <div>새 비밀번호</div>
          <BaseInput
            type="password"
            registerName="newPassword"
            placeholder="새 비밀번호"
            registerOption={{ required: "기존 비밀번호를 입력해 주세요." }}
          />
        </label>
      </motion.div>
    </motion.div>
  );
};

export default PasswordUpdateModal;
