export enum Stake {
    Low,
    Mid,
    High,
}

export enum Resolution {
    Fail,
    WeakFail,
    WeakSucceed,
    Succeed,
}

export type Attribute = {
    id: string;
    title: string;
    description: string;
    disabled: boolean;
    useCount: number;
};

export type Character = {
    id: string;
    name: string;
    description?: string;
    concept?: string;
    trouble?: Attribute;
    attributes: Attribute[];
};

export type Scene = {
    id: string;
    title: string;
    problem: string;
    plan: string;
    result: string;

    includedCharacters: [Character];
    advantages: [Attribute];
    disadvantages: [Attribute];
    stakes: Stake;
    resolution: Resolution;

};

export type Episode = {
    id: string,
    title: string,
    description: string,
    goal: string,

    includedCharacters: [Character];
    advantages: [Attribute];
    disadvantages: [Attribute];

}


