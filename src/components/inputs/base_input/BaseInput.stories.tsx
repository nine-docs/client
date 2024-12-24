import { StoryFn } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import BaseInput from "./BaseInput";

export default {
  title: "components/inputs/BaseInput",
  component: BaseInput,
  decorators: [
    (Story: StoryFn) => {
      const methods = useForm({ mode: "all" });

      return (
        <FormProvider {...methods}>
          <form>
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
};

export const Default = {
  args: {
    registerName: "test",
    placeholder: "placeholder",
  },
};
