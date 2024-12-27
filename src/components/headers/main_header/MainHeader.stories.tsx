import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import MainHeader from "./MainHeader";

export default {
  title: "components/headers/MainHeader",
  component: MainHeader,
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
