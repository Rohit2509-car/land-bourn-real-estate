import https from 'https';

const url = 'https://upload.wikimedia.org/wikipedia/commons/b/b4/India_outline.svg';

const options = {
  headers: {
    'User-Agent': 'AuraLandsDeveloper/1.0 (developer@auralands.com) Node.js/16'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    if (res.statusCode === 200) {
      const header = data.substring(0, data.indexOf('>') + 1);
      console.log("SVG Header:", header);
      
      // Let's also check if there is a viewBox attribute
      const match = data.match(/<svg[^>]+viewBox="([^"]+)"/);
      if (match) {
        console.log("Found viewBox:", match[1]);
      } else {
        console.log("No viewBox attribute found.");
      }

      // Check width and height
      const widthMatch = data.match(/<svg[^>]+width="([^"]+)"/);
      const heightMatch = data.match(/<svg[^>]+height="([^"]+)"/);
      console.log("Width:", widthMatch ? widthMatch[1] : "not found");
      console.log("Height:", heightMatch ? heightMatch[1] : "not found");
    }
  });
});
