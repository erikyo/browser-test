/// <reference types="vite/client" />

interface NewTestResults {
    id: number;
    testName: string;
    value: boolean;
    test: boolean | string | object;
    result?: string;
}
