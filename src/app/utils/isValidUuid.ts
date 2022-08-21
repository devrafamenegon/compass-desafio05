export default function isValidUuid (id: string): boolean {
  const regexUuid = '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  return id.match(regexUuid) !== null
}
