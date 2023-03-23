import bodyParser from 'body-parser';

bodyParser.json();

async function getAuthToken(authCode) {
  const data = JSON.stringify({
    'grant_type': 'authorization_code',
    'client_id': process.env.NEXT_PUBLIC_JIRA_CLIENT_ID,
    'client_secret': process.env.NEXT_PUBLIC_JIRA_CLIENT_SECRET,
    'code': authCode,
    'redirect_uri': process.env.NEXT_PUBLIC_REDIRECT_URI
  });

  fetch('https://auth.atlassian.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data,
  })
    .then((res) => {
      console.log('res', res);
      return res.json();
    })
    .then((data) => {
      console.log('data', data);
    })
    .catch((err) => {
      console.error(err);
    })
}

export async function POST(req, res) {
  console.log('request method', req.method);
  if (req.method === 'POST') {
    const body = await req.body;
    console.log(body);
  }
  return new Response('Sucess!')
  // res.status(200).json(JSON.stringify({ name: 'Success' }));
}