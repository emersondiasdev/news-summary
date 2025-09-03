import { Hono } from 'hono'
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer'

const app = new Hono()

app.get('*',
  jsxRenderer(({ children }) => {
    return (
      <html>
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        ></link>
        <body>
          <header>Menu</header>
          {children}
        </body>
      </html>
    )
  })
)

app.get('/page/about', (c) => {
  return c.render(<h1>About me!</h1>)
})

app.get('/', (c) => {
  throw new Error('This is an error')
  return c.render(
    <h1>Hello woRLD!</h1>
  )
})

app.notFound((c) => {
  return c.render(
    <h1>404 Not Found - {c.req.path}</h1>
  )
})

app.onError((error, c) => {
  return c.render(
    <h1>{error.message} - Internal Server Error</h1>
  )
})

export default app