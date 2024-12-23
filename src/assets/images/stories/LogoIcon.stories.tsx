import LogoIcon from "assets/images/logos/LogoIcon";

export default {
  title: "assets/images/logos/LogoIcon",
  component: LogoIcon,
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
    color: "#fe7e37",
  },
};
