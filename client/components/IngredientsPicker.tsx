import { BaseSyntheticEvent, useEffect } from "react";
import { useQuery } from "react-query";
import Ingredients from "lib/api/ingredients";

const IngredientsPicker = ({
  title,
  setIngredientIds,
  ingredientIds,
}: {
  title: string;
  setIngredientIds: Function;
  ingredientIds?: string[];
}) => {
  const listIngredients = useQuery("ingredients", Ingredients.list);
  const { data } = listIngredients;
  const ingredientsBoxes: JSX.Element[] = [];

  function handleCheckBox(event: BaseSyntheticEvent) {
    const { target } = event;
    const currentId = target.id;
    if (target.checked) {
      setIngredientIds((oldIds: string[]) => [...oldIds, currentId]);
    } else {
      setIngredientIds((oldIds: string[]) => {
        return oldIds.filter((item: string) => item !== currentId);
      });
    }
  }

  function ingredientPresent(boxId: string) {
    if (ingredientIds) {
      return ingredientIds.filter((id) => id === boxId).length === 1;
    }
  }

  if (data) {
    data.map((ingredient, index) => {
      if (index > 0 && index % 4 === 0) {
        ingredientsBoxes.push(<br />);
      }
      ingredientsBoxes.push(
        <span key={ingredient.id}>
          <input
            type="checkbox"
            name={ingredient.name}
            id={ingredient.id}
            onChange={handleCheckBox}
            checked={ingredientPresent(ingredient.id)}
          />
          <label htmlFor={ingredient.name}>{ingredient.name}</label>
        </span>
      );
    });
  }
  return (
    <fieldset>
      <legend>{title}</legend>
      {ingredientsBoxes}
    </fieldset>
  );
};

export default IngredientsPicker;
