/* eslint-disable no-console */
import { Content, Tag, Tweet } from '@luudvan94/hey-memory-shared-models'
import * as openai from 'openai'
require('dotenv').config()

const client = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const analyzeTweet = async (tweet: Tweet): Promise<Tag[]> => {
  try {
    const sanitizedContent = await sanitizeContent(tweet.content)
    // eslint-disable-next-line no-console
    const tags = await extractKeywords(sanitizedContent)
    let currentTags = tags
    let count = 10
    while (currentTags.length > 1 && count > 0) {
      const newTags = await findRelatedWords(tags, Math.floor(currentTags.length / 2))
      currentTags = newTags
      tags.push(...newTags)

      count -= 1
    }

    return tags.map((tag) => tag.toLowerCase())
  } catch (error) {
    return []
  }
}

export const sanitizeContent = async (content: Content): Promise<Content> => {
  const completion = await client.chat.completions.create({
    model: 'ft:gpt-3.5-turbo-1106:personal::8VOFBrr4',
    messages: [
      { role: 'system', content: 'You are an English specialist, correct the English sentence.' },
      { role: 'user', content }
    ]
  })

  if (completion.choices.length === 0 || !completion.choices[0].message.content) {
    throw new Error('No completion')
  }

  return completion.choices[0].message.content
}

export const findRelatedWords = async (tags: Tag[], length: number): Promise<Tag[]> => {
  const tagsString = tags.join(', ')
  const completion = await client.chat.completions.create({
    model: 'ft:gpt-3.5-turbo-1106:personal::8VX1zb6R',
    messages: [
      { role: 'system', content: 'You are an vocabulary specialist' },
      {
        role: 'user',
        content: `generate ${length} related, exclude: ${tagsString}`
      }
    ]
  })

  if (completion.choices.length === 0 || !completion.choices[0].message.content) {
    throw new Error('No related words')
  }

  return completion.choices[0].message.content.split(',').map((tag) => tag.trim())
}

export const extractKeywords = async (content: Content): Promise<Tag[]> => {
  const completion = await client.chat.completions.create({
    model: 'ft:gpt-3.5-turbo-1106:personal::8VWmCCYn',
    messages: [
      { role: 'system', content: 'Marv is chatbot that helps extracting keywords from a sentence' },
      {
        role: 'user',
        content
      }
    ]
  })

  if (completion.choices.length === 0 || !completion.choices[0].message.content) {
    throw new Error('No keywords')
  }

  return completion.choices[0].message.content.split(',').map((tag) => tag.trim())
}
