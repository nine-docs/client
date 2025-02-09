import KeyIcon from "assets/images/icons/KeyIcon";

export default {
  title: "assets/images/icons/KeyIcon",
  component: KeyIcon,
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "number",
    },
    height: {
      control: "number",
    },
    color: {
      control: "color",
    },
  },
};

export const Default = {
  args: {
    width: 24,
    height: 24,
    color: "#646f7c",
  },
};
