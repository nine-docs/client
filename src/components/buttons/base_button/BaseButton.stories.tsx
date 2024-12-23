import BaseButton from "./BaseButton";

export default {
  title: "components/buttons/BaseButton",
  component: BaseButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "inline-radio",
    },
    children: {
      control: false,
    },
    theme: {
      control: "inline-radio",
    },
  },
};

export const Default = {
  args: {
    type: "button",
    children: <div>Base Button</div>,
  },
};
