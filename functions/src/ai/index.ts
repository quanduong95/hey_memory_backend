import { Tag } from '@luudvan94/hey-memory-shared-models'

import { TweetContent } from '../firestore'

export const analyzedTweetContent = async (content: TweetContent): Promise<Tag[]> => {
  return ['ab', 'cd', 'ed']
}
