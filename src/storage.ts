import { Character, Attribute } from './types';
import { produce } from 'immer';

export function getCharacterList(): Character[] {
    const characterList = localStorage.getItem('characterList');
    if (characterList) {
        return JSON.parse(characterList);
    } else {
        return [];
    }
}

export function addCharacter(character: Character) {
    const characterList = getCharacterList();
    const newList = produce(characterList, (draft) => {
        draft.unshift(character);
    })
    localStorage.setItem('characterList', JSON.stringify(newList));
 }

