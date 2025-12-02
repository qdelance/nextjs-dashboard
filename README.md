## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

# Notes de QDE

## Difficultés

Le bind de l'ID sur le formulaire d'update

Le redirect() et invalidate() à mettre en dehors du try/catch

La traditionnelle blague de typage sur les nombres/ID qui sont parfois des strings

Supabase ne marchait pas bien pour moi (retour à Neon)

La progression du tuto pas top avec les erreurs de build/déploiement sur Vercel quand on retourne une structure avec un message d'erreur
et avant de passer à des vraies server actions ; les versions des typings en retard, qui ne montrent pas l'erreur dans l'IDE

De manière générale, on peut ne pas avoir des erreurs en mode dev, mais en avoir dans mode build prod

Globalement bcp de choses à faire en manuel sur les forms, donc l'affichage des erreurs remontées par Zod

Avec les server actions, lorsqu'on valide un formulaire, on perd les données précédemment saisies, sauf à faire : 
* https://dev.to/bookercodes/nextjs-form-validation-on-the-client-and-server-with-zod-lbc
* https://github.com/vercel/next.js/issues/72949#issuecomment-2640456062
* https://github.com/vercel/next.js/issues/72949#issuecomment-2581391521 => https://github.com/facebook/react/issues/29034

## Vrac

https://github.com/vercel/next.js/discussions/86447
