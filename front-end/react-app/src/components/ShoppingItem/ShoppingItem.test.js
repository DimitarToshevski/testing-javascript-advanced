import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShoppingItem from "./ShoppingItem";

const product = {
  id: 1,
  name: "Product 1",
  quantity: 3,
};

test("should mark item as completed", () => {
  const { getByTestId, getByText } = render(<ShoppingItem {...product} />);
  const item = getByTestId(`product-${product.id}`);
  const nameRegex = new RegExp(product.name, "i");

  expect(item).toBeInTheDocument();

  userEvent.click(item);
  expect(getByText(nameRegex)).toHaveStyleRule(
    "text-decoration",
    "line-through"
  );

  userEvent.click(item);
  expect(getByText(nameRegex)).not.toHaveStyleRule(
    "text-decoration",
    "line-through"
  );
});
