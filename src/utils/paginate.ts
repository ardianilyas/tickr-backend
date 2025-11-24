import { Request } from "express"

export async function paginate(
  model: any,
  req: Request,
  opts: {
    where?: any
    include?: any
    select?: any
    orderBy?: any
    cursorField?: string
    defaultLimit?: number
  } = {}
) {
  const {
    where,
    include,
    select,
    orderBy = { id: "asc" },
    cursorField = "id",
    defaultLimit = 10,
  } = opts

  const query = req.query
  const limit = Math.min(100, Number(query.limit ?? defaultLimit))
  const cursor = query.cursor ? String(query.cursor) : null
  const direction = query.dir === "prev" ? "prev" : "next"

  const [pathOnly] = req.originalUrl.split('?')
  const baseUrl = `${req.protocol}://${req.get('host')}${pathOnly}`

  const take = direction === "next" ? limit + 1 : -(limit + 1)

  const args: any = {
    where,
    take,
    orderBy,
  }

  if (include) args.include = include
  if (select) args.select = select

  if (cursor) {
    args.cursor = { [cursorField]: cursor }
    args.skip = 1
  }

  let rows = await model.findMany(args)
  const hasMore = rows.length > limit
  rows = hasMore ? rows.slice(0, limit) : rows

  if (direction === "prev") rows.reverse()

  const first = rows[0]
  const last = rows[rows.length - 1]

  const nextCursor = last?.[cursorField] ?? null
  const prevCursor = first?.[cursorField] ?? null

  const buildUrl = (cursorValue: any, dir: string) => {
    const params = new URLSearchParams(req.query as any)
    params.set("cursor", cursorValue)
    params.set("dir", dir)
    return `${baseUrl}?${params.toString()}`
  }

  return {
    data: rows,
    meta: {
      limit,
      nextCursor,
      prevCursor,
      hasNext: direction === "next" ? hasMore : Boolean(cursor),
      hasPrev: direction === "prev" ? hasMore : Boolean(cursor),
      next: hasMore ? buildUrl(nextCursor, "next") : null,
      prev: cursor ? buildUrl(prevCursor, "prev") : null
    }
  }
}