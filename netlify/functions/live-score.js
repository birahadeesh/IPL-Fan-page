exports.handler = async function(event, context) {
    const API_KEY = process.env.CRICKET_API_KEY;

    if (!API_KEY) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: "CRICKET_API_KEY is missing in Netlify Environment Variables." })
        };
    }

    try {
        const apiUrl = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`;
        const response = await fetch(apiUrl); // Node 18+ has built in fetch
        const data = await response.json();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Allows frontend to fetch from it
            },
            body: JSON.stringify(data)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message || 'Failed to fetch live score' })
        };
    }
};
