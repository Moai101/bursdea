export enum CounterActionType {
    ADD_COUNT = 'ADD_COUNT',
    RESET_COUNT = 'RESET_COUNT',
  }

  export interface CounterAction {
    type: CounterActionType;  // 必須
    value?: number;  // 値増加の時のみ使う
  }

  export const addCount = (value: number): CounterAction => ({
    type: CounterActionType.ADD_COUNT,
    value,
  });
  
  export const reset = (): CounterAction => ({
    type: CounterActionType.RESET_COUNT,
  });