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
        // 1. Fetch currently active matches
        const liveUrl = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`;
        const liveResponse = await fetch(liveUrl);
        const liveData = await liveResponse.json();
        
        // 2. Check if a CSK match is currently happening or recently finished
        let cskMatch = null;
        if (liveData && liveData.data && Array.isArray(liveData.data)) {
            cskMatch = liveData.data.find(m => {
                const matchName = (m.name || m.teams?.join(' ') || '').toLowerCase();
                return matchName.includes('chennai') || matchName.includes('csk');
            });
        }
        
        // 3. If found in live data, return it immediately!
        if (cskMatch) {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify(liveData)
            };
        }
        
        // 4. If no CSK match is live, fetch the upcoming SCHEDULE instead
        const scheduleUrl = `https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0`;
        const scheduleResponse = await fetch(scheduleUrl);
        const scheduleData = await scheduleResponse.json();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(scheduleData)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message || 'Failed to fetch live score' })
        };
    }
};
