exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') return {statusCode:405,body:'Method Not Allowed'};
  try {
    const {path, method, body} = JSON.parse(event.body);
    const res = await fetch('https://api.notion.com/v1' + path, {
      method: method || 'GET',
      headers: {
        'Authorization': 'Bearer ' + process.env.NOTION_TOKEN,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json();
    return {statusCode: res.status, headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)};
  } catch(e) {
    return {statusCode:500, body: JSON.stringify({message: e.message})};
  }
};