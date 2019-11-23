import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-styled-components";

Enzyme.configure({ adapter: new Adapter() });

import { WeatherIcon } from "Components/Icon";

describe("Icon component", () => {
  test("should render icon size correctly when not pass prop size", () => {
    const wrapper = mount(<WeatherIcon iconCode="d10" />);

    expect(wrapper.find(WeatherIcon)).toHaveLength(1);

    expect(wrapper).toHaveStyleRule("width", "48px");
    expect(wrapper).toHaveStyleRule("height", "48px");
  });

  test("should render icon size correctly when size is small", () => {
    const wrapper = mount(<WeatherIcon iconCode="d10" size='small' />);

    expect(wrapper.find(WeatherIcon)).toHaveLength(1);

    expect(wrapper).toHaveStyleRule("width", "48px");
    expect(wrapper).toHaveStyleRule("height", "48px");
  });

  test("should render icon size correctly when size is big", () => {
    const wrapper = mount(<WeatherIcon iconCode="d10" size='big' />);

    expect(wrapper.find(WeatherIcon)).toHaveLength(1);

    expect(wrapper).toHaveStyleRule("width", "60px");
    expect(wrapper).toHaveStyleRule("height", "60px");
  });
});
