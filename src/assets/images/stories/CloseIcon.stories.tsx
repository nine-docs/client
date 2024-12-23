import CloseIcon from "assets/images/icons/CloseIcon";

export default {
  title: "assets/images/icons/CloseIcon",
  component: CloseIcon,
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
