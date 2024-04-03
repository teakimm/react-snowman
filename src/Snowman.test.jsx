import { it, expect, describe } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

const TEST_IMAGES = ["img1", "img2", "img3", "img4", "img5", "img6"];



it("hides button and displays loss message when 6 wrong guesses are made", function () {
    const { container } = render(
        <Snowman
            images={TEST_IMAGES}
            words={["test"]}
            maxWrong={1}
        />
    );

    const aButton = container.querySelector("button[value=a]");
    fireEvent.click(aButton);

    expect(
        container.querySelector(".Snowman-buttons")
    ).toHaveClass("hidden");
});

it("matches snapshot", function () {
    const { container } = render(
        <Snowman
            images={TEST_IMAGES}
            words={["test"]}
            maxWrong={1}
        />
    );
    expect(container).toMatchSnapshot();
});