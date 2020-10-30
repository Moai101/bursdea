export enum PublishActionType {
    UPDATE_IDEA = 'UPDATE_IDEA',
  }


  export interface PublishAction {
    type: PublishActionType;  // 必須
    idea: string;  // 値増加の時のみ使う
  }


  export const updateIdea = (idea: string): PublishAction => ({
    type: PublishActionType.UPDATE_IDEA,
    idea,
  });