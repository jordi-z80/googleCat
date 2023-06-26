// Note: On V2 I could have used a background service to do the redirect, but it seems impossible
// to do in V3. So it's possible a flicker is seen when the page loads before the redirect actually happens.

	const HostLanguage = "ca";
	const LanguageRestrict = "lang_ca";
	const LanguageRestrict2 = "lr:lang_1ca";
	const AnyLanguageText = "Qualsevol idioma";			// String that appears in search when you're asking for a specific language as an option to remove the language requirement.

	const url = new URL(window.location.href);
	const AnyLanguageSet = url.searchParams.get('anyLanguage') === 'true';

	function isGoogleSearchUrl (url)
	{
		if ((/\.google\.\w+(\.\w+)?$/).test(url.hostname)) 
		{
			if (url.pathname === '/search') 
			{
				return true;
			}
		}

		return false;
	}

	// Check if it's a Google domain and a search page
	if (isGoogleSearchUrl (url))
	{
		// Check if the parameters are already set to avoid infinite loop
		const hasLanguageRestrict = url.searchParams.get('lr') === 'lang_ca';

		if (!hasLanguageRestrict) 
		{
			redirectIfNeeded (url);
		}
	}

	function redirectIfNeeded (url)
	{
		// if the url contains the parameter anyLanguage=true, return
		if (AnyLanguageSet) return;

		// Add the parameters
		url.searchParams.set('hl', HostLanguage);					// host language
		url.searchParams.set('lr', LanguageRestrict); 				// language restrict
		url.searchParams.set('tbs', LanguageRestrict2);

		// Redirect
		window.location.href = url.toString();
	}




	// modify the anchor href, add "&anyLanguage=true"
	function addAnyLanguageParameterToUrl (aElement)
	{
		const url = new URL(aElement.href);
		url.searchParams.set('anyLanguage', 'true');
		aElement.href = url.toString();
	}

	// Search for "Qualsevol idioma" and inject a parameter to avoid language retargeting
	function searchForAnyLanguageText (mutation) 
	{
		const allElements = mutation.querySelectorAll("a");
		if (allElements == null) return;
	
		for (let i = 0, max = allElements.length; i < max; i++) 
		{
			if (allElements[i].textContent === AnyLanguageText) 
			{
				addAnyLanguageParameterToUrl (allElements[i]);
			}
		}
	}

	// if anyLanguage is set, all google search references must include that parameter
	function updateGoogleSearchLinks (mutation)
	{
		if (!AnyLanguageSet) return;

		const allElements = mutation.querySelectorAll("a");
		if (allElements == null) return;

		for (let i = 0, max = allElements.length; i < max; i++) 
		{
			try
			{
				const href = new URL(allElements[i].href);
				if (isGoogleSearchUrl(href))
				{
					addAnyLanguageParameterToUrl (allElements[i]);
				}
			}
			catch (e)
			{

			}
		}		

	}

	function observerFunction (mutation)
	{
		searchForAnyLanguageText (mutation);
		updateGoogleSearchLinks (mutation);
	}


	// on dom loaded
	document.addEventListener("DOMContentLoaded", function() 
	{
		// pass the body through the observer (not installed yet)
		observerFunction (document.body);

		// install now for further changes
		GTools.easyObserver (observerFunction);
	});
	
	  

