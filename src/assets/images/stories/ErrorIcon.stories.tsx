import ErrorIcon from "assets/images/icons/ErrorIcon";

export default {
  title: "assets/images/icons/ErrorIcon",
  component: ErrorIcon,
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
