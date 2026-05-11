import json

ch1 = {
  "number": 1,
  "title": "Les débuts de la domination hollywoodienne",
  "concentre": {
    "reading_time": 5,
    "sections": [
      {
        "type": "key",
        "title": "La France, première puissance du cinéma mondial",
        "bullets": [
          "1895 : cinématographe des frères Lumière. Succès immédiat mais limité — le public se lasse après 18 mois faute de vraie mise en scène.",
          "Georges Méliès introduit la mise en scène et les trucages. Le Voyage dans la Lune (1902) fait le tour du monde, mais des centaines de copies sont piratées aux USA. Méliès n'a pas su s'adapter à la dimension industrielle du cinéma.",
          "Pathé Frères (1896) : intégration verticale complète (matériel + films + salles). Dès 1905, conquête internationale. En 1914, plus de 50% des films dans le monde sont français.",
          "Fragilité structurelle : marché intérieur trop petit. En 1905, 75% du CA de Pathé se fait à l'étranger. Le CA réalisé à New York seul est équivalent à celui réalisé en France."
        ]
      },
      {
        "type": "def",
        "title": "L'essor américain : nickelodeons et Hollywood",
        "bullets": [
          "1905 : nickelodeons — salles rudimentaires dans des boutiques désaffectées, 5 centimes l'entrée, films sans droits. Premier film = The Great Train Robbery. En 1909 : 10 000 nickelodeons aux USA.",
          "1907 : cartel MPPC créé par Edison. Impose des redevances sur tout le matériel cinématographique. Les producteurs indépendants fuient à Hollywood (loin du cartel, frontière mexicaine proche, bon climat, État moins strict).",
          "1915 : dissolution du cartel MPPC. The Birth of a Nation (Griffith) : 100 000$ de coût, 20 millions de recettes. Début des superproductions. Hollywood s'impose comme centre mondial du cinéma.",
          "Studio system : intégration verticale complète (production + distribution + exploitation). Contrats longs 7 ans pour stars, réalisateurs, scénaristes. Le producteur (mogul) a le final cut."
        ]
      },
      {
        "type": "def",
        "title": "Les Big Five et l'organisation oligopolistique",
        "bullets": [
          "Big Five (majors) : Paramount, MGM, 20th Century Fox, Warner, Radio Keith Orpheum. Intégration verticale complète. Contrôlent 75% des salles de première catégorie.",
          "Little Three (minors) : United Artists, Universal, Columbia. Grands producteurs et distributeurs, mais sans réseaux de salles.",
          "Pratiques abusives : block booking (lier un bon film à l'achat de 13 à 104 mauvais films) et blind bidding (vendre un film avant sa réalisation).",
          "MPPDA créée en 1922 (devient MPAA en 1945) : lobby + auto-censure (Motion Picture Production Code 1930). Sert d'ambassadeur privé aux films américains. Stratégie internationale via la MPEA."
        ]
      },
      {
        "type": "key",
        "title": "Raisons structurelles de la domination américaine",
        "bullets": [
          "Marché intérieur énorme : 800 films/an aux USA dans les années 1920 vs 50 en France. Permet d'amortir les productions avant d'exporter à prix cassé.",
          "Soutien des banques : Bank of America, Merrill Lynch, Goldman Sachs investissent dans Hollywood. Le coût moyen des films Fox est multiplié par 7 entre 1914 et 1927.",
          "Rationalisation industrielle : taylorisation de la production, division du travail, test screenings (importés du marketing industriel).",
          "Soft power : Herbert Hoover — 'Dans les pays où pénètrent les films américains, nous vendons deux fois plus d'automobiles américaines.' La MPPDA = 'branche complémentaire du département d'État' (W. Hays).",
          "1919 : 90% des films en Europe viennent des USA. Domination française effondrée après la WWI."
        ]
      }
    ]
  },
  "flashcards": [
    {
      "question": "En quelle année est inventé le cinématographe des frères Lumière et quelle est sa limite ?",
      "answer": "1895. Qualité technique + scènes de vie quotidiennes. Limite : le public se lasse après 18 mois — il n'y a pas de véritable mise en scène. Lumière ne sait pas adapter le cinéma à sa dimension spectaculaire."
    },
    {
      "question": "Quel est le rôle de Georges Méliès dans l'histoire du cinéma ?",
      "answer": "Ex-directeur de théâtre et magicien, il introduit la mise en scène et les trucages. Le Voyage dans la Lune (1902) fait le tour du monde mais est massivement piraté aux USA. Méliès est ruiné car il n'a pas su s'adapter à la dimension industrielle du cinéma."
    },
    {
      "question": "Qu'est-ce que l'intégration verticale dans le cinéma ?",
      "answer": "Le fait qu'une même entreprise contrôle l'ensemble de la filière : production, distribution et exploitation (salles). Pathé l'a pratiqué dès 1896. Les majors hollywoodiennes en ont fait leur force principale."
    },
    {
      "question": "Qu'est-ce qu'un nickelodeon ?",
      "answer": "Salle de cinéma rudimentaire apparue aux USA en 1905, dans des boutiques désaffectées. Prix d'entrée : 5 centimes (un nickel). En 1909 : 10 000 nickelodeons aux USA vs 300 salles en France. Ces établissements font émerger des entrepreneurs qui vont fonder Hollywood (frères Warner, Adolph Zukor, William Fox)."
    },
    {
      "question": "Qu'est-ce que la MPPC et pourquoi est-elle importante ?",
      "answer": "Motion Picture Patents Company, cartel créé par Edison en 1907. Impose des redevances à tous les producteurs et exploitants sur le matériel cinématographique. Les indépendants fuient à Hollywood pour l'éviter. Dissous en 1915."
    },
    {
      "question": "Quelle est la différence entre les Big Five (majors) et les Little Three (minors) ?",
      "answer": "Les Big Five (Paramount, MGM, Fox, Warner, RKO) pratiquent l'intégration verticale complète avec des réseaux de salles et contrôlent 75% des salles de première catégorie. Les Little Three (United Artists, Universal, Columbia) sont de grands producteurs et distributeurs mais n'investissent pas les réseaux de salles."
    },
    {
      "question": "Qu'est-ce que le block booking ?",
      "answer": "Pratique par laquelle les majors liaient la vente d'un film à succès à l'achat d'un grand nombre de films peu compétitifs (jusqu'à 104 mauvais pour 1 bon). Les exploitants devaient prendre tout le catalogue pour accéder aux blockbusters."
    },
    {
      "question": "Qu'est-ce que le blind bidding ?",
      "answer": "Vente d'un film aux exploitants avant même sa réalisation. L'exploitant achetait un film en cours de tournage, sans l'avoir vu, s'il voulait avoir accès aux productions des grandes stars et réalisateurs."
    },
    {
      "question": "Qu'est-ce que la MPPDA et quel est son double rôle ?",
      "answer": "Motion Picture Producers and Distributors of America, créée en 1922 (devient MPAA en 1945). Double rôle : (1) auto-censure (Motion Picture Production Code, 1930) pour éviter une censure externe ; (2) lobbying diplomatique pour défendre les exportations américaines. W. Hays la qualifie de 'branche complémentaire du département d'État'."
    },
    {
      "question": "Pourquoi la domination française sur le cinéma mondial était-elle structurellement fragile ?",
      "answer": "Parce que le marché intérieur français était trop petit pour amortir seul les productions. En 1905, 75% du CA de Pathé se faisait à l'étranger. Le CA réalisé à New York seul équivalait au CA français. La France dépendait donc entièrement des marchés étrangers."
    },
    {
      "question": "Qu'est-ce que le studio system hollywoodien ?",
      "answer": "Système dans lequel les grandes majors intégraient tous les métiers en leur sein avec des contrats longs (7 ans) pour les stars, réalisateurs et scénaristes. Le producteur (mogul) avait le final cut et tous les pouvoirs décisionnels. Ce système a fonctionné jusqu'aux années 1950."
    },
    {
      "question": "Pourquoi le gouvernement américain soutient-il l'exportation des films hollywoodiens ?",
      "answer": "1. Soft power : les films sont des vitrines du mode de vie américain. 2. Impact commercial direct : là où les films américains pénètrent, les exportations américaines augmentent (Hoover). 3. Outil de propagande potentiel. La MPPDA est qualifiée de 'branche complémentaire du département d'État'."
    }
  ],
  "qcm": {
    "easy": [
      {
        "question": "En quelle année est inventé le cinématographe des frères Lumière ?",
        "choices": ["1889", "1893", "1895", "1902"],
        "correct_index": 2,
        "explanation": "Le cinématographe est inventé en 1895 par les frères Lumière. Il se distingue par sa qualité technique et ses films de scènes de vie quotidienne."
      },
      {
        "question": "Quel film de Méliès fait le tour du monde en 1902 ?",
        "choices": ["L'Arrivée du train en gare", "Le Voyage dans la Lune", "La Naissance d'une nation", "Le Grand Train de l'Ouest"],
        "correct_index": 1,
        "explanation": "Le Voyage dans la Lune (1902) de Méliès fait le tour du monde, avec des centaines de copies piratées aux USA."
      },
      {
        "question": "Qu'est-ce qu'un nickelodeon ?",
        "choices": ["Un appareil de visionnage individuel inventé par Edison", "Une salle de cinéma rudimentaire à 5 centimes", "Un cartel cinématographique américain", "Un studio de production à Hollywood"],
        "correct_index": 1,
        "explanation": "Un nickelodeon est une salle rudimentaire dans une boutique désaffectée, à 5 centimes l'entrée. On en comptait 10 000 aux USA en 1909."
      },
      {
        "question": "Quel pourcentage des films projetés en Europe venait des USA en 1919 ?",
        "choices": ["50%", "75%", "90%", "100%"],
        "correct_index": 2,
        "explanation": "En 1919, 90% des films projetés en Europe venaient des États-Unis. La domination française s'est effondrée après la Première Guerre mondiale."
      },
      {
        "question": "Qu'est-ce que la MPPC créée par Edison en 1907 ?",
        "choices": ["Un syndicat d'acteurs", "Un cartel qui impose des redevances sur le matériel cinématographique", "La première agence de production hollywoodienne", "Un accord de distribution entre pays européens"],
        "correct_index": 1,
        "explanation": "La Motion Picture Patents Company est un cartel qui impose des redevances à tous les producteurs et exploitants. C'est pour fuir ce cartel que les indépendants créent Hollywood."
      },
      {
        "question": "Qu'est-ce que l'intégration verticale dans l'industrie cinématographique ?",
        "choices": ["Le fait de produire des films dans plusieurs pays", "Le contrôle par une même entreprise de la production, la distribution et l'exploitation", "Le fait de faire travailler des acteurs internationaux", "Le fait de vendre les droits à l'étranger"],
        "correct_index": 1,
        "explanation": "L'intégration verticale = contrôle de l'ensemble de la filière de l'amont vers l'aval : production, distribution et exploitation (salles)."
      },
      {
        "question": "En quelle année est dissous le cartel MPPC ?",
        "choices": ["1905", "1910", "1915", "1922"],
        "correct_index": 2,
        "explanation": "Le cartel MPPC est dissous en 1915, date à laquelle Hollywood s'impose comme la capitale mondiale du cinéma."
      },
      {
        "question": "Qu'est-ce que le blind bidding ?",
        "choices": ["Un système de vente d'un film avant sa réalisation", "Un concours pour les films indépendants", "Une technique de montage cinématographique", "Un accord entre distributeurs américains"],
        "correct_index": 0,
        "explanation": "Le blind bidding consiste à vendre aux exploitants un film avant même qu'il soit réalisé."
      },
      {
        "question": "Quel pourcentage des films dans le monde était français en 1914 ?",
        "choices": ["20%", "35%", "50%", "70%"],
        "correct_index": 2,
        "explanation": "En 1914, plus de 50% des films projetés dans le monde étaient français. Pathé était alors la première puissance cinématographique mondiale."
      },
      {
        "question": "Qui crée la MPPDA en 1922 ?",
        "choices": ["Le gouvernement américain", "Les Big Five (majors hollywoodiennes)", "Les petits producteurs indépendants", "Les réseaux de salles européens"],
        "correct_index": 1,
        "explanation": "La MPPDA est créée par les Big Five pour défendre leurs intérêts : pratiquer une auto-censure et servir d'ambassadeur privé aux films américains à l'international."
      }
    ],
    "medium": [
      {
        "question": "Pourquoi la domination française sur le cinéma mondial était-elle structurellement fragile ?",
        "choices": [
          "Parce que les films français étaient de mauvaise qualité technique",
          "Parce que le marché intérieur français était trop petit pour amortir les productions — 75% du CA de Pathé se faisait à l'étranger, rendant l'entreprise vulnérable",
          "Parce que la France n'avait pas de stars internationales",
          "Parce que les films français coûtaient trop cher à produire"
        ],
        "correct_index": 1,
        "explanation": "La domination reposait sur des bases fragiles : le marché intérieur était trop restreint. En 1905, 75% du CA de Pathé se faisait à l'étranger. Le CA de New York seul équivalait à celui de toute la France."
      },
      {
        "question": "Comment le block booking permettait-il aux majors d'écouler leur production ?",
        "choices": [
          "En vendant uniquement les meilleurs films à prix élevé",
          "En liant la vente d'un film à succès à l'achat d'un grand nombre de films médiocres (jusqu'à 104 mauvais pour 1 bon)",
          "En imposant des tarifs préférentiels aux exploitants fidèles",
          "En rachetant directement les salles qui refusaient leurs films"
        ],
        "correct_index": 1,
        "explanation": "Le block booking forçait les exploitants à acheter des films médiocres s'ils voulaient accéder aux films à succès. Pour la Paramount, cela pouvait être 1 bon film contre 13 à 104 mauvais."
      },
      {
        "question": "Pourquoi Hollywood a-t-il été choisi comme lieu de la nouvelle industrie cinématographique américaine ?",
        "choices": [
          "Parce que la Californie avait les meilleures infrastructures techniques",
          "Pour fuir le cartel MPPC : loin de New York, proche de la frontière mexicaine, bon climat, État californien moins strict sur les droits du cartel",
          "Parce que les studios coûtaient moins cher à construire en Californie",
          "Parce que les stars américaines préféraient vivre en Californie"
        ],
        "correct_index": 1,
        "explanation": "Hollywood a été choisi pour échapper au cartel MPPC de New York : proximité de la frontière mexicaine (échapper aux poursuites), bon climat pour tourner, État californien moins enclin à faire respecter les droits du cartel."
      },
      {
        "question": "En quoi le film The Birth of a Nation (1915) marque-t-il un tournant économique ?",
        "choices": [
          "C'est le premier film distribué à l'international par une major",
          "Il coûte 100 000$ et rapporte 20 millions, montrant qu'en investissant massivement on génère des recettes disproportionnées — début des superproductions",
          "C'est le premier film parlant produit à Hollywood",
          "Il crée le système des test screenings"
        ],
        "correct_index": 1,
        "explanation": "The Birth of a Nation révèle qu'en investissant massivement (100 000$, cinq fois le film le plus cher de l'époque), les recettes peuvent être non proportionnelles (20 millions). C'est le début des superproductions hollywoodiennes."
      },
      {
        "question": "Quel est le double rôle de la MPPDA selon ses fondateurs ?",
        "choices": [
          "Produire des films et les distribuer à l'international",
          "Pratiquer une auto-censure pour éviter une censure externe, et servir d'ambassadeur privé aux films américains à l'international",
          "Défendre les droits des acteurs et négocier avec les syndicats",
          "Financer les productions indépendantes et réguler le marché des salles"
        ],
        "correct_index": 1,
        "explanation": "La MPPDA a deux rôles : l'auto-censure (Motion Picture Production Code) pour éviter une censure externe, et le lobbying diplomatique pour défendre les exportations. W. Hays la qualifie de 'branche complémentaire du département d'État'."
      },
      {
        "question": "Pourquoi le studio system hollywoodien était-il si puissant dans les années 1930-40 ?",
        "choices": [
          "Parce qu'il était financé directement par le gouvernement américain",
          "Parce qu'il combinait taylorisation (division du travail spécialisée) et contrats longs (7 ans) garantissant une production industrielle régulière et maîtrisée",
          "Parce qu'il disposait d'un monopole légal sur la production",
          "Parce que les acteurs n'avaient aucun droit de négociation"
        ],
        "correct_index": 1,
        "explanation": "Le studio system combinait taylorisation (chaque employé spécialisé dans une tâche) et contrats longs (7 ans pour stars et techniciens), permettant une production industrielle régulière à moindre coût."
      },
      {
        "question": "En quoi la politique des test screenings illustre-t-elle la rationalisation de la production hollywoodienne ?",
        "choices": [
          "C'est une pratique importée du monde du sport",
          "Hollywood importe du marketing industriel la pratique de tester le produit avant sa mise sur le marché pour maximiser les chances de succès commercial",
          "Les test screenings permettent de vendre les droits internationaux avant la sortie",
          "C'est une pratique inventée par les réalisateurs pour résister aux producteurs"
        ],
        "correct_index": 1,
        "explanation": "Les test screenings sont importés des entreprises de grande consommation des années 1920 : on teste le produit avant de le lancer. Cela permet de modifier le montage, voire d'arrêter la production si les résultats sont mauvais."
      },
      {
        "question": "Pourquoi la Première Guerre mondiale a-t-elle favorisé l'essor d'Hollywood ?",
        "choices": [
          "Parce que les Européens ont décidé de ne plus faire de films pendant la guerre",
          "Parce que la guerre a paralysé les industries cinématographiques européennes (Pathé, Gaumont) pendant qu'Hollywood continuait à produire et à exporter massivement sur tous les marchés",
          "Parce que les USA ont subventionné massivement leur industrie pendant la guerre",
          "Parce que les stars européennes sont toutes parties aux USA"
        ],
        "correct_index": 1,
        "explanation": "La guerre a paralysé les industries françaises et européennes. Hollywood a profité de ce vide pour s'imposer sur tous les marchés. En 1919, 90% des films projetés en Europe viennent des USA."
      },
      {
        "question": "Pourquoi le gouvernement américain défend-il les exportations d'Hollywood ?",
        "choices": [
          "Parce que le gouvernement est propriétaire des studios",
          "Parce que les films sont des vitrines du mode de vie américain et favorisent les exportations commerciales — soft power + impact sur les ventes de produits américains",
          "Parce que les studios paient des impôts très élevés",
          "Parce qu'Hollywood finance directement les campagnes électorales"
        ],
        "correct_index": 1,
        "explanation": "Deux raisons : le soft power (vitrine du mode de vie américain) et l'impact commercial direct (Hoover : 'Où pénètrent les films américains, on vend deux fois plus d'automobiles américaines')."
      },
      {
        "question": "Comment les premières politiques protectionnistes européennes ont-elles tenté de résister à la domination d'Hollywood ?",
        "choices": [
          "En interdisant totalement l'importation de films américains",
          "En mettant en place des systèmes de quotas : l'Allemagne en 1925 limite les imports à 120 films/an, la France en 1928, la Grande-Bretagne impose 30% de longs-métrages nationaux",
          "En créant des studios européens communs pour concurrencer Hollywood",
          "En taxant massivement les films américains à l'entrée"
        ],
        "correct_index": 1,
        "explanation": "Les premières réponses protectionnistes sont des politiques de quotas : limitation du nombre de films américains importés (Allemagne 1925 : 120 max/an, France 1928) et obligation de réserver une part aux films nationaux (Grande-Bretagne : 30%)."
      }
    ],
    "hard": [
      {
        "question": "En quoi la notion de soft power s'applique-t-elle à la domination d'Hollywood sur les marchés internationaux ?",
        "choices": [
          "Le soft power désigne la politique de prix bas pratiquée par les distributeurs américains",
          "Le soft power désigne la capacité d'influencer par la culture et les valeurs — Hollywood diffuse le mode de vie américain à travers ses films, créant une familiarité qui facilite les échanges commerciaux et politiques sans recourir à la contrainte",
          "Le soft power est la capacité d'Hollywood à racheter les cinémas étrangers",
          "Le soft power désigne uniquement l'utilisation de la MPAA comme outil diplomatique"
        ],
        "correct_index": 1,
        "explanation": "Le soft power désigne l'influence exercée par la culture et les idées plutôt que par la force (concept de Joseph Nye). Hollywood exerce un soft power : les films américains diffusent des valeurs et des modes de vie, créant une familiarité avec le modèle américain qui facilite les exportations commerciales et l'influence diplomatique."
      },
      {
        "question": "Comment la structure oligopolistique du marché hollywoodien a-t-elle facilité la domination internationale ?",
        "choices": [
          "En permettant aux majors de s'entendre illégalement sur les prix à l'international",
          "En concentrant les ressources (capital, réseaux de distribution, stars) entre quelques entreprises capables d'investir massivement et de déployer des réseaux de distribution mondiale que les petits producteurs ne pouvaient pas concurrencer",
          "En éliminant juridiquement la concurrence étrangère",
          "En bénéficiant d'un monopole légal accordé par le gouvernement américain"
        ],
        "correct_index": 1,
        "explanation": "L'oligopole hollywoodien crée des barrières à l'entrée infranchissables : seules les Big Five ont les ressources pour produire massivement, distribuer à l'international via leurs propres réseaux et imposer leurs pratiques (block booking, blind bidding) aux exploitants du monde entier."
      },
      {
        "question": "En quoi le piratage précoce des films de Méliès aux USA illustre-t-il une tension fondamentale de l'internationalisation culturelle ?",
        "choices": [
          "Il illustre la supériorité technique des Américains",
          "Il illustre la tension entre circulation internationale des oeuvres (qui profite à leur diffusion) et protection des droits de propriété intellectuelle (qui garantit les revenus des créateurs) — tension qui traverse toute l'histoire de l'industrie jusqu'à aujourd'hui",
          "Il prouve que le cinéma américain n'était pas créatif",
          "Il illustre uniquement la mauvaise gestion financière de Méliès"
        ],
        "correct_index": 1,
        "explanation": "Le piratage des films de Méliès préfigure une tension structurelle qui traverse toute l'histoire des industries culturelles : la circulation internationale amplifie la diffusion des oeuvres (ce qui peut être bénéfique à leur rayonnement) mais prive les créateurs de leurs revenus. La même tension se retrouvera avec la vidéo VHS, puis Internet et le streaming."
      },
      {
        "question": "Pourquoi le Motion Picture Production Code (1930) est-il à la fois un outil d'auto-censure et un outil de conquête des marchés internationaux ?",
        "choices": [
          "Parce qu'il permet aux majors d'interdire les films étrangers sur le marché américain",
          "Parce qu'en garantissant que les films américains respectent certaines normes morales, il les rend exportables dans des pays conservateurs et évite les scandales pouvant provoquer des restrictions à l'importation à l'étranger",
          "Parce qu'il impose aux pays étrangers d'adopter les mêmes règles de production",
          "Parce qu'il finance directement les exportations des majors"
        ],
        "correct_index": 1,
        "explanation": "Le Motion Picture Production Code sert deux objectifs : éviter une censure externe (qui nuirait aux majors sur le marché américain) et produire des films moralement acceptables à l'international pour éviter que des gouvernements étrangers ne restreignent les importations américaines. Il contient explicitement des passages sur la nécessité d'éviter de représenter défavorablement les autres nations."
      },
      {
        "question": "Pourquoi peut-on dire que la création de Hollywood constitue un paradoxe dans l'histoire de l'anti-monopolisme américain ?",
        "choices": [
          "Il n'y a aucun paradoxe dans cette histoire",
          "Les producteurs indépendants ont détruit un monopole (MPPC) pour en créer un autre encore plus puissant (les Big Five), montrant que la concentration est une tendance structurelle de l'industrie culturelle, non un accident",
          "La création de Hollywood a permis une véritable démocratisation du cinéma",
          "Les producteurs indépendants sont restés indépendants après la dissolution du cartel"
        ],
        "correct_index": 1,
        "explanation": "Le paradoxe est fondamental : les producteurs qui ont combattu le cartel MPPC ont eux-mêmes créé un oligopole encore plus puissant (les Big Five) avec des pratiques de concentration verticale identiques (block booking, blind bidding). L'anti-monopolisme américain en matière de cinéma a tendance à remplacer une concentration par une autre."
      },
      {
        "question": "Comment l'importation du taylorisme dans la production cinématographique a-t-elle transformé la nature de la création artistique à Hollywood ?",
        "choices": [
          "Elle n'a eu aucun impact sur la création artistique",
          "En divisant la production en tâches spécialisées et en donnant au producteur (mogul) le final cut, le taylorisme a subordonné la logique artistique à la logique commerciale — le film devient un produit industriel optimisé pour le marché",
          "Elle a amélioré la qualité artistique des films en permettant aux réalisateurs de se concentrer",
          "Elle a permis aux réalisateurs de garder un contrôle total sur leurs oeuvres"
        ],
        "correct_index": 1,
        "explanation": "L'importation du taylorisme transforme profondément la création : le producteur (mogul) a le final cut, les équipes sont spécialisées, les test screenings permettent d'adapter le produit aux attentes du marché. La logique artistique se soumet à la logique commerciale — Hollywood devient une 'usine à rêves' (Hortense Powdermaker, 1950)."
      },
      {
        "question": "En quoi la domination de Pathé dans les années 1910 était-elle paradoxalement plus fragile que celle d'Hollywood dans les années 1920 ?",
        "choices": [
          "Parce que Pathé produisait des films de moins bonne qualité",
          "Parce que la domination de Pathé reposait sur l'exportation sans marché intérieur suffisant pour amortir les productions, alors qu'Hollywood amortissait d'abord sur un marché intérieur gigantesque avant d'exporter à prix défiant toute concurrence",
          "Parce que la France n'avait pas de système de distribution internationale",
          "Parce que les films français ne plaisaient pas au public international"
        ],
        "correct_index": 1,
        "explanation": "La domination de Pathé était paradoxalement fragile : 75% du CA à l'étranger en 1905. Hollywood a inversé le modèle : d'abord amortir sur un marché intérieur gigantesque (800 films/an), puis exporter à des prix que les concurrents étrangers ne peuvent pas atteindre car ils n'ont pas ce volume."
      },
      {
        "question": "Comment les politiques de quotas adoptées par les pays européens dans les années 1920 illustrent-elles les limites d'une régulation défensive face à la domination culturelle américaine ?",
        "choices": [
          "Les quotas ont parfaitement fonctionné et ont stoppé l'expansion d'Hollywood en Europe",
          "Les quotas limitent les importations mais ne s'attaquent pas aux causes profondes de la domination (marché intérieur américain gigantesque, soutien bancaire, studio system, réseaux de distribution mondiaux) — ils protègent temporairement sans inverser le rapport de forces",
          "Les quotas ont immédiatement été contournés par les majors via des coproductions",
          "Les quotas ont eu un effet négatif sur la qualité des cinémas nationaux"
        ],
        "correct_index": 1,
        "explanation": "Les quotas sont une réponse défensive qui ne s'attaque pas aux causes structurelles de la domination : un marché intérieur américain gigantesque qui permet d'amortir les coûts avant d'exporter, le soutien des banques, la rationalisation industrielle et les réseaux de distribution mondiale. Ils protègent temporairement une part de marché sans reconstruire une industrie nationale compétitive."
      },
      {
        "question": "En quoi la trajectoire de Méliès illustre-t-elle les tensions entre art et industrie qui caractérisent le cinéma comme bien culturel ?",
        "choices": [
          "Méliès n'était pas un artiste mais un industriel, ce qui explique son échec",
          "Méliès incarne le versant artistique du cinéma (mise en scène, trucages, dimension poétique) mais échoue à en maîtriser la dimension industrielle (production à grande échelle, lutte contre le piratage, intégration verticale) — le cinéma est dès le départ à la fois un art et une industrie",
          "Méliès a échoué uniquement à cause de la concurrence américaine déloyale",
          "Méliès était un industriel qui a voulu devenir artiste, contrairement aux frères Lumière"
        ],
        "correct_index": 1,
        "explanation": "Méliès illustre parfaitement la tension fondamentale du cinéma comme bien culturel : il excelle dans la dimension artistique (mise en scène, trucages, dimension poétique) mais ne maîtrise pas la dimension industrielle (production à grande échelle, intégration verticale, protection contre le piratage). Cette tension entre art et industrie est constitutive du cinéma depuis ses origines."
      }
    ]
  },
  "panic": [
    "1895 : cinématographe Lumière. Méliès (1902) = mise en scène + trucages. Ruiné par le piratage.",
    "Pathé (1896) : intégration verticale + internationalisation dès 1905. En 1914 : 50% des films dans le monde sont français. Fragilité : marché intérieur trop petit.",
    "1905 : nickelodeons aux USA. 1909 : 10 000 salles. 1907 : cartel MPPC d'Edison.",
    "Hollywood : réaction au cartel (bon climat, frontière mexicaine, loin de NY). 1915 : dissolution MPPC.",
    "Big Five (majors) : Paramount, MGM, Fox, Warner, RKO. Intégration verticale. Block booking + blind bidding.",
    "MPPDA (1922) → MPAA (1945) : lobby + auto-censure (Motion Picture Production Code 1930) + soft power.",
    "1919 : 90% des films en Europe viennent des USA. Domination française effondrée après WWI."
  ],
  "qrc": [
    {
      "question": "Comment expliquer l'essor de la domination hollywoodienne sur le marché cinématographique mondial dans les années 1910-1930 ?",
      "plan_type": "I. Le déclin de la domination française (Pathé, fragilité structurelle, WWI) / II. La constitution d'un oligopole hollywoodien (nickelodeons, studio system, Big Five, intégration verticale) / III. Les facteurs structurels de domination (marché intérieur, banques, rationalisation, soft power)",
      "model_answer": "Au début du XXe siècle, la France est la première puissance cinématographique mondiale. Pathé Frères (1896) pratique une intégration verticale complète — matériel, films, salles — et s'internationalise dès 1905. En 1914, plus de 50% des films projetés dans le monde sont français. Mais cette domination repose sur des bases fragiles : le marché intérieur est trop petit pour amortir seul des productions coûteuses (75% du CA de Pathé à l'étranger en 1905). La Première Guerre mondiale paralyse les industries européennes et permet à Hollywood de s'imposer sur tous les marchés : en 1919, 90% des films projetés en Europe viennent des États-Unis.\n\nL'essor américain repose sur plusieurs mécanismes. En 1905, les nickelodeons (salles rudimentaires à 5 centimes) créent un réseau de salles sans précédent (10 000 en 1909) et font émerger des entrepreneurs qui vont constituer les studios. En réaction au cartel MPPC créé par Edison (1907), les producteurs indépendants fuient à Hollywood. Les Big Five (Paramount, MGM, Fox, Warner, RKO) s'y constituent progressivement en pratiquant l'intégration verticale complète. En 1915, The Birth of a Nation (100 000$ de coût, 20 millions de recettes) impose le modèle des superproductions. Les majors abusent de leur position dominante via le block booking (lier un bon film à des dizaines de mauvais) et le blind bidding (vendre avant réalisation).\n\nTrois facteurs structurels expliquent la durabilité de cette domination. D'abord, un marché intérieur gigantesque : 800 films/an aux USA vs 50 en France, permettant d'amortir avant d'exporter à prix cassé. Ensuite, le soutien des banques (Bank of America, Goldman Sachs). Enfin, la rationalisation industrielle (taylorisation, studio system, test screenings). À cela s'ajoute le soft power : la MPPDA (1922) sert d'ambassadeur privé aux films américains, qui fonctionnent comme des vitrines du mode de vie américain et favorisent les exportations commerciales.",
      "key_concepts": ["intégration verticale", "oligopole", "Big Five", "studio system", "block booking", "blind bidding", "soft power", "MPPDA/MPAA", "nickelodeons", "Pathé", "marché intérieur"]
    },
    {
      "question": "Qu'est-ce que l'intégration verticale et quel rôle joue-t-elle dans la domination des majors hollywoodiennes ?",
      "plan_type": "I. Définition et origines de l'intégration verticale dans le cinéma / II. Comment elle confère un avantage concurrentiel décisif / III. Les pratiques abusives qu'elle rend possibles et leurs limites",
      "model_answer": "L'intégration verticale désigne le contrôle par une même entreprise de l'ensemble des segments d'une filière économique, de l'amont (production) vers l'aval (exploitation). Dans le cinéma, cela signifie qu'une même entreprise produit les films, les distribue aux salles et exploite ses propres réseaux de salles.\n\nPathé l'a pratiquée en France dès 1896. Aux États-Unis, Adolph Zukor l'invente avec la Famous Players Lasky Corporation, en rachetant d'abord des sociétés de production (expansion horizontale) puis des réseaux de salles. Les Big Five (Paramount, MGM, Fox, Warner, RKO) l'adoptent toutes, contrôlant 75% des salles de première catégorie aux États-Unis.\n\nCette intégration verticale confère un avantage concurrentiel décisif à trois niveaux. Elle garantit un débouché à toute la production des majors : leurs films auront toujours des salles pour les projeter. Elle permet de compenser les pertes de la production (activité risquée) par les recettes de l'exploitation (très rentables). Elle oblige les producteurs indépendants à se soumettre aux conditions des majors s'ils veulent accéder aux salles.\n\nElle rend enfin possibles des pratiques abusives : le block booking (lier un bon film à l'achat de nombreux films médiocres, jusqu'à 104 mauvais pour 1 bon) et le blind bidding (vendre un film avant sa réalisation). Ces pratiques permettent aux majors d'écouler toute leur production. C'est précisément contre ces abus que le ministère de la Justice intentera un procès en 1938, aboutissant au divorcment de 1948.",
      "key_concepts": ["intégration verticale", "Big Five", "production", "distribution", "exploitation", "block booking", "blind bidding", "débouché garanti", "divorcment"]
    }
  ]
}

with open('scripts/intern_ch1.json', 'w', encoding='utf-8') as f:
    json.dump(ch1, f, ensure_ascii=False, indent=2)

with open('scripts/intern_ch1.json', 'w', encoding='utf-8') as f:
    loaded = json.load(f)

fc = len(loaded['flashcards'])
easy = len(loaded['qcm']['easy'])
med = len(loaded['qcm']['medium'])
hard = len(loaded['qcm']['hard'])
qrc = len(loaded['qrc'])
panic = len(loaded['panic'])
size = len(open('/home/claude/intern_ch1.json').read())
print(f"Ch1 OK — FC:{fc} | QCM:{easy}/{med}/{hard} | QRC:{qrc} | Panic:{panic} | {size} chars")