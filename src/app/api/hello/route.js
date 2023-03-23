export async function GET(request) {
  console.log('hello request was hit');
  return new Response('Hello, Next.js!')
}
