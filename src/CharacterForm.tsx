import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Character, Attribute } from "./types";
import AttributeForm from "./AttributeForm";
import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
import { getCharacterList, addCharacter } from "./storage";

type CharacterFormProps = {
  character?: Character;
};

export default function CharacterForm(props: CharacterFormProps) {
  const defaultAttribute: Attribute = {
    id: uuidv4(),
    title: "",
    description: "",
    disabled: false,
    useCount: 0,
  };

  const defaultCharacter: Character = {
    id: uuidv4(),
    name: "",
    attributes: [],
    trouble: { ...defaultAttribute, id: uuidv4() },
  };

  const [characterState, setCharacterState] = React.useState<Character>(
    props.character ?? defaultCharacter,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log(e);
  };

  const handleTroubleTitleChange = (troubleTitle: string) => {
    if (characterState.trouble === undefined) {
      const newTrouble: Attribute = {
        ...defaultAttribute,
        id: uuidv4(),
        title: troubleTitle,
      };
      setCharacterState(
        produce((draft) => {
          draft.trouble = newTrouble;
        }),
      );
    } else {
      setCharacterState(
        produce((draft) => {
          draft.trouble!.title = troubleTitle;
        }),
      );
    }
  };

  const handleTroubleDescChange = (troubleDesc: string) => {
    if (characterState.trouble === undefined) {
      const newTrouble: Attribute = {
        ...defaultAttribute,
        id: uuidv4(),
        description: troubleDesc,
      };
      setCharacterState(
        produce((draft) => {
          draft.trouble = newTrouble;
        }),
      );
    } else {
      setCharacterState(
        produce((draft) => {
          draft.trouble!.description = troubleDesc;
        }),
      );
    }
  };

  const [characterList, setCharacterList] = React.useState(() => {
    return getCharacterList();
  });

  const characterAddHandler = (_: React.MouseEvent<HTMLButtonElement>) => {
    addCharacter(characterState);
    setCharacterList(() => getCharacterList());
    setCharacterState(() => ({ ...defaultCharacter, id: uuidv4() }));
  };

  const attributeAddHandler = (newAttribute: Attribute) => {
    setCharacterState(
      produce((draft) => {
        draft.attributes.unshift(newAttribute);
      }),
    );
  };

  return (
    <Stack>
      <TextField
        id="id"
        value={characterState.id}
        label="id"
        disabled
        onChange={handleChange}
      />
      <TextField
        id="name"
        value={characterState.name}
        label="name"
        onChange={handleChange}
      />
      <TextField
        id="concept"
        value={characterState.concept ?? ""}
        multiline
        rows={3}
        label="concept"
        onChange={handleChange}
      />
      <TextField
        id="description"
        value={characterState.description ?? ""}
        multiline
        rows={5}
        label="description"
        onChange={handleChange}
      />
      <TextField
        id="troubleTitle"
        value={characterState.trouble?.title ?? ""}
        label="Trouble"
        onChange={(e) => handleTroubleTitleChange(e.target.value)}
      />
      <TextField
        id="troubleDesc"
        value={characterState.trouble?.description ?? ""}
        multiline
        label="Trouble Description"
        onChange={(e) => handleTroubleDescChange(e.target.value)}
      />
      <AttributeForm onSubmit={attributeAddHandler} />
      <Button variant="contained" onClick={characterAddHandler}>
        Add Character
      </Button>
      <pre>{JSON.stringify(characterList, null, 2)}</pre>
    </Stack>
  );
}
