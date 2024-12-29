import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import Nav from "./Nav";

export default {
  title: "components/Nav",
  component: Nav,
  decorators: [
    (Story: StoryFn) => {
      return (
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      );
    },
  ],
};

export const Default = {};
