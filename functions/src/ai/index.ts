/* eslint-disable no-console */
import { Content, Tag, Tweet } from '@luudvan94/hey-memory-shared-models'
import * as openai from 'openai'

import { processString } from './utils'
require('dotenv').config()

const client = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const analyzeTweet = async (tweet: Tweet): Promise<Tag[]> => {
  try {
    const content = processString(tweet.content)
    // await classifyContent(content)
    const sanitizedContent = await sanitizeContent(content)
    // eslint-disable-next-line no-console
    const tags = await extractKeywords(sanitizedContent)
    console.log(sanitizedContent)
    let currentTags = tags
    let count = 10
    while (currentTags.length > 1 && count > 0) {
      const newTags = await findRelatedWords(tags, Math.ceil(currentTags.length / 2))
      currentTags = newTags
      tags.push(...newTags)

      count -= 1
    }
    console.log(tags)
    return tags.map((tag) => tag.replace('/', ',').toLowerCase())
    // return []
  } catch (error) {
    return []
  }
}

export const classifyContent = async (content: Content): Promise<Content> => {
  const completion = await client.chat.completions.create({
    model: 'ft:gpt-3.5-turbo-1106:personal::8WZzr6Em',
    messages: [
      { role: 'system', content: 'You can classify english words' },
      { role: 'user', content }
    ]
  })

  if (completion.choices.length === 0 || !completion.choices[0].message.content) {
    throw new Error('No completion')
  }
  console.log(completion.choices[0].message.content)
  return ''
}

export const sanitizeContent = async (content: Content): Promise<Content> => {
  const completion = await client.chat.completions.create({
    model: 'ft:gpt-3.5-turbo-1106:personal::8WQ8YUuY',
    messages: [
      { role: 'system', content: 'You can correct English sentences.' },
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
    model: 'ft:gpt-3.5-turbo-1106:personal::8W9zbjH6',
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
    model: 'ft:gpt-3.5-turbo-1106:personal::8WQNWR24',
    messages: [
      { role: 'system', content: 'You can extract important keywords from a sentence' },
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
