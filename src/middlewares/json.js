export async function json(req, res) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try{
  req.body= JSON.parse(Buffer.concat(buffers).toString()) //transforma corpo em objeto JS
  } catch {
  req.body = null
  }

  res.setHeader('Content-Type', 'application/json')
}