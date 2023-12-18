export function processString(input: string): string {
  let processedString = input.trim()
  processedString = processedString.replace(/\n/g, '. ')
  processedString = processedString.replace(/\t/g, '')
  processedString = processedString.replace(/\r/g, '')

  return processedString.toLowerCase()
}
