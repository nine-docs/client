import CloseIcon from "../CloseIcon";

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
    color: "black",
  },
};
