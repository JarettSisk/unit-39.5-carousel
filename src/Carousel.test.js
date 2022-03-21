import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// Smoke test
it("renders without crashing", function() {
    render(<Carousel />);
});
// Snapshot test
it("matches snapshot", () => {
    const { asFragment } = render(<Carousel/>);
    expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
    const { queryByTestId, queryByAltText, debug } = render(<Carousel />);
    debug();
    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
    
  
    // move backwords in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);
  
    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
    
  });

  it('hides navigation arrows when cardIdx is at last or first photos', () => {
    const { queryByTestId, queryByAltText, debug } = render(<Carousel />);
    debug();

    // Left arrow should be hidden
    expect(queryByTestId("left-arrow")).toHaveClass("hide");
    expect(queryByTestId("right-arrow")).toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow); // 0 to 1

    // Should have left and right arrow
    expect(queryByTestId("left-arrow")).toBeInTheDocument();
    expect(queryByTestId("right-arrow")).toBeInTheDocument();

    // move forward in the carousel
    fireEvent.click(rightArrow); // 1 to 2

    // Right arrow should be hidden
    expect(queryByTestId("right-arrow")).toHaveClass("hide");
    expect(queryByTestId("left-arrow")).toBeInTheDocument();
  })
