
<div align="center">
  <img src='beans.jpeg' width="40%">
</div>

## <p align="center"><a href="https://rockntasks.vercel.app">FoodCare</a></p>

## <p align="center"> Projet sur le coaching et l'alimentation saine</p> 

#### site en production : 
  
Ce site est hébergé sur vercel pour le front et render pour le back. Ma limite est lié à l'usage de la base de donnée: en effet le projet se bloque du fait qu'il y a une limite d'appel à la base du fait d'un plan gratuit.

## Contexte

Ce projet est en cours de conception. Il portera sur le thème de l'alimentation saine et les bonnes habitudes. <br/>

Ce projet est lié à un test de positionnement dans le cadre des cours sur Ynov.b Le but initial est de faire une todo list mais j'ai ajouté la partie sur l'alimentation.

Ce projet a pour but d'initier mon apprentissage de la librairie JavaScript React, créer une authentification avec JWT et déployer en prod. <br/>

Cliquez sur le titre pour avoir un aperçu de certaines fonctionnalités<br/>

### Installation 

Vérifiez que vous avez node.js en tapant <code>node -v</code> en ligne de commande.<br/>
Si non: installez Node.js <a href="https://nodejs.org/en/">en cliquant ici</a><br/>

Vérifiez que vous avez bien un gestionnaire de paquet (yarn ou npm) sinon installez l'un d'eux<br/> 

Commandes (ici avec npm) pour importer en local ce repo et les outils ajoutés en plus: <br/>

```` 
git clone <lien du repo> <nom du dossier où héberger le repo>
````

Puis vous devez installer les fichiers nécessaires au démarrage d'une app React : <br/>
  
```
npm install
```
  
Si vous n'avez pas déjà ces outils en locales, il faut alors aussi installer sass et react-router: 

```
npm i sass
```

```
npm install react-router-dom@
```

Puis aller dans le projet front (`cd client`) et faite : 

```
npm run watch
```
ou:
```
npm run start
```
Puis, assurez-vous d'avoir importer le dump `task.sql` dans votre bdd local et aller dans le projet back (`cd client`) et faite : 

```
npm run dev
```
Configurer votre bdd et les url avec le .env mais aussi dans le dossier config du front pour ce qui aurait pu changer.

### Inspiration

Ma motivation pour la conception de ce projet est le site de Michael Greger <a href="https://nutritionfacts.org/"> Nutrition Facts </a>.
Il est l'un des médecins qui a alerté sur les conséquences dramatiques de la malbouffe occidentale. <br/>

Sans prétendre à une visée scientifique que je n'ai pas, j'aimerais puiser sur les sources les plus sérieuses - notamment celles de Nutrition Facts - afin de concevoir ce projet d'apprentissage pour mettre mes compétences au service d'une noble cause: se donner les moyens de se respecter et vivre en bonne santé et plus longtemps grâce aux nouvelles habitudes alimentaires. <br/>

### Idée

L'idée est de faire un site qui soit dynamique avec la possibilité de voir les résultats de ses choix en terme d'habitudes alimentaires et être sensibilisé ou se créer un suivi sur un dashboard. Il y aura aussi la possibilité - fictive - d'acheter des produits. <br/>

Enfin, j'ai l'idée de gamifier le projet<br/>

Affaire à suivre !<br/>

### Technologies

En utilisant la librairie React et son mode spécifique de fonctionnement, je décide aussi d'utiliser sass et peut-être TypeScript qui viendra remplacer alors mes premiers choix en JavaScript.

Le backend utilise node js.

Nota: les photos sont libre de droit. Pour trouver les sources des photos utilisées dans le site allez voir dans le fichier SOURCES.md
