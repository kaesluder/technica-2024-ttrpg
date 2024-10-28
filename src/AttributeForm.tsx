import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Character, Attribute } from "./types";
import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
import { getCharacterList, addCharacter } from "./storage";

type AttributeFormProps = {
  onSubmit: (a: Attribute) => void;
};


export default function AttributeForm(props: AttributeFormProps) {
  const newAttribute = (): Attribute => {
    return {
      id: uuidv4(),
      disabled: false,
      title: "",
      description: "",
      useCount: 0,
    };
  };

  const [attributeState, setAttributeState] = React.useState(newAttribute());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttributeState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (_: React.MouseEvent<HTMLButtonElement>) => {
    props.onSubmit(attributeState);
  }

  return (
    <Stack>
      <TextField
        id="title"
        label="Asset Title"
        value={attributeState.title}
        onChange={handleChange}
      />
      <TextField
        id="description"
        label="Description"
        value={attributeState.description}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Add Attribute</Button>
    </Stack>
  );
}
