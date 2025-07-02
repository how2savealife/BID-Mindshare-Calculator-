export async function handler(event) {
  const username = event.queryStringParameters.username;
  if (!username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing username" })
    };
  }

  try {
    const response = await fetch(`https://api.kaito.ai/api/v1/yaps?username=${username}`);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ mindshare: parseFloat(data.yaps_l30d) || 0 })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch mindshare" })
    };
  }
}
