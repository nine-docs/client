import DeleteIcon from "assets/images/icons/DeleteIcon";

export default {
  title: "assets/images/icons/DeleteIcon",
  component: DeleteIcon,
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
