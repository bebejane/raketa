import { backup } from 'next-dato-utils/route-handlers'

export const runtime = "edge"

export async function GET(req: Request) {
  return await backup(req)
}