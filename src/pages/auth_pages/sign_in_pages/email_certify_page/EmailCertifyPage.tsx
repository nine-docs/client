import React from "react";

import KeyIcon from "assets/images/icons/KeyIcon";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import classes from "./EmailCertifyPage.module.scss";

const EmailCertifyPage = () => {
  const email = "ninedocs@ninedocs.com";

  return (
    <main className={classes.page_wrap}>
      <section className={classes.email_auth_section}>
        <div className={classes.email_auth_title_wrap}>
          <KeyIcon width={40} height={40} />
          <h2 className={classes.email_auth_title}>
            이메일 인증을 완료해 주세요.
          </h2>
        </div>
        <h4 className={classes.email_auth_desc}>
          {email} 으로 인증 번호가 발송되었습니다.
        </h4>
        <form>
          <BaseInput
            type="text"
            registerName="emaliCode"
            registerOption={{}}
            placeholder="000000"
            align="start"
            maxLength={6}
          />
        </form>
      </section>
      <div className={classes.email_notice_wrap}>
        <span>이메일을 받지 못하셨나요?</span>
        <TextButton
          text="다시 발송하기"
          size="small"
          p="s"
          theme="primary-line"
        />
      </div>
    </main>
  );
};

export default EmailCertifyPage;
