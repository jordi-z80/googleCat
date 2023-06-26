# GoogleCat
[Català](#català)

Chromium extension (Chrome, Edge, etc.) to enhance results for Catalan speakers when searching with Google. (note: for computers only, as mobile Chrome doesn't support extensions)

A few months ago, Google made the decision to overlook certain minority languages, providing responses in alternative languages that it presumes the users would understand.

This extension keeps track of Google searches (on select domains) and injects parameters into the URL so that results are displayed in Catalan. However, it’s not perfect.

Adapting this extension to other languages should be straightforward by simply modifying the initial const values in the contentScript.js file.

With Manifest V3, it appears to be impossible to rewrite the URL before the page is loaded, which might cause a flicker before the results are displayed. This is because the standard Google search page is loaded initially; thereafter, the URL is rewritten and the modified page is rendered. Depending on the computer and connection speed, the initial page might be briefly visible before the modified page can be accessed, which results in the flicker.


----
## Català

Extensió de Chromium (Chrome, Edge, ...) per millorar els resultats en català a les cerques de Google (nota: només per ordinador. El Chrome en mòbil no suporta extensions)

Fins que Google decideixi tornar a retornar els resultats en l'idioma configurat per l'usuari, independentment de la seva ubicació, aquesta extensió afegeix alguns paràmetres a cada cerca que maximitzen els resultats en català. No és perfecte, però sembla funcionar millor que la cerca estàndar.

Amb el manifest V3 no és possible reescriure els paràmetres de la pàgina abans de carregar-la, o sigui que és possible que es vegi un lleuger parpalleig a cada cerca (primer es carrega la pàgina 'estandard' de google, i al rebre els resultats s'injecten els nous paràmetres).
