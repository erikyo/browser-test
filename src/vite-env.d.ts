/// <reference types="vite/client" />

interface NewTestList {
    testName: string;
    test: boolean | string | object;
    value?: boolean | string | number | object;
}

interface NewTestResults {
    id: number;
    testName: string;
    value: boolean | string | number | object;
    test?: boolean | string | object;
    result?: string;
}

type ObjTest = Record<string, NewTestList[]>;
type ObjResult = Record<string,NewTestResults[]>
