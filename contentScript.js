// Note: On V2 I could have used a background service to do the redirect, but it seems impossible
// to do in V3. So it's possible a flicker is seen when the page loads before the redirect actually happens.

    const url = new URL(window.location.href);
    const hostname = url.hostname;
    const pathname = url.pathname;

    // Check if it's a Google domain and a search page
    if (hostname.endsWith('google.co.uk') || (/\.google\.\w+$/).test(hostname)) 
	{
        if (pathname === '/search') 
		{
            // Check if the parameters are already set to avoid infinite loop
            const hasLanguageRestrict = url.searchParams.get('lr') === 'lang_ca';

            if (!hasLanguageRestrict) 
			{
				updateParameters (url);
            }
        }
    }

	function updateParameters (url)
	{
		// Add the parameters
		url.searchParams.set('hl', 'ca');					// host language
		url.searchParams.set('lr', 'lang_ca'); 				// language restrict
		url.searchParams.set('tbs', 'lr:lang_1ca');

		// Redirect
		window.location.href = url.toString();
	}


