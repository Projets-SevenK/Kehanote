import json

ch2 = {
  "number": 2,
  "title": "Les mutations d'Hollywood après 1945",
  "concentre": {
    "reading_time": 5,
    "sections": [
      {
        "type": "key",
        "title": "Le divorcment (1948) et la fin du studio system",
        "bullets": [
          "1938 : le ministère de la Justice intente un procès contre les majors pour intégration verticale abusive. 1940 : Consent Decree — gel de la situation, limitation du block booking à 5 films.",
          "1948 : la Cour Suprême confirme le divorcment — les majors doivent choisir entre production et exploitation. Toutes choisissent la production (sauf RKO qui garde l'exploitation).",
          "Conséquence : sans les recettes assurées des salles, le studio system coûte trop cher. Système de flexibilité avec renégociation permanente des contrats.",
          "Émergence des agences de talents et des package deals : l'agence réunit autour d'un projet un réalisateur, un scénariste et des acteurs, puis démarche les producteurs."
        ]
      },
      {
        "type": "def",
        "title": "La télévision : de l'ennemi à l'allié",
        "bullets": [
          "En 1955, 75% des foyers américains sont équipés. Les majors boycottent d'abord la TV (Jack Warner interdit les postes de TV dans ses films).",
          "1955 : Disney produit Disneyland pour ABC. Warner lance Cheyenne pour ABC. En 1957, les 7 grands studios produisent une centaine de programmes TV.",
          "Avantage de la TV : production sérialisée = fidélisation du public. Une fois la formule du succès trouvée, on la décline sur plusieurs mois ou années.",
          "Dans les années 1970, les grandes sociétés hollywoodiennes génèrent autant de recettes grâce à la TV que grâce aux entrées en salle."
        ]
      },
      {
        "type": "def",
        "title": "Les Fin-Syn Rules et les conglomérats",
        "bullets": [
          "Fin-Syn Rules (1970) : (1) Network Financial Interest Rule — un Network ne peut pas avoir d'intérêts financiers dans la production. (2) Network Syndication Rule — les Networks ne peuvent pas gérer le marché d'occasion (syndication).",
          "Paradoxe : en voulant limiter les Networks, on concentre le pouvoir de distribution internationale entre les mains des majors. En 1990 : majors = 80% des recettes du marché international de syndication.",
          "Conglomérats (dès 1962) : MCA rachète Universal, Gulf Western (pétrole) rachète Paramount, Coca-Cola rachète Columbia. Nouvelle génération de dirigeants extérieurs au cinéma.",
          "Syndication = marché de l'occasion des programmes télévisés. Un programme diffusé par un Network peut être revendu à des stations locales."
        ]
      },
      {
        "type": "key",
        "title": "Les marchés secondaires et les blockbusters",
        "bullets": [
          "Marchés secondaires (années 1970+) : chaînes câblées (HBO créée 1972 par Time), vidéo (Betamax 1975 puis VHS), DVD, déréglementation des TV privées en Europe.",
          "Betamax : Universal et Disney poursuivent Sony en 1976 (menace de piratage). Sony gagne finalement en 1984 à la Cour Suprême. Paradoxe : au moment de la victoire, c'est le standard VHS de Matsushita qui a dominé.",
          "Contrôle du marché vidéo : macro-vision (anti-copie), obligation pour les magasins de payer au nombre de vues. En 1986, les recettes vidéo dépassent les entrées en salle.",
          "Blockbusters : budgets en hausse (20M$ en 1980, 55M$ en 2000). Budget marketing : 9M$ en 1980, 27M$ en 2000. Titanic : 200M$ prod + 100M$ marketing. Risque : La Porte du Paradis (Cimino, 1980) = échec total."
        ]
      }
    ]
  },
  "flashcards": [
    {
      "question": "Qu'est-ce que le divorcment de 1948 ?",
      "answer": "La décision de la Cour Suprême obligeant les majors à choisir entre la production et l'exploitation (salles). Toutes choisissent la production, sauf RKO qui garde l'exploitation. C'est la fin du modèle d'intégration verticale basé sur la possession des salles."
    },
    {
      "question": "Comment les majors hollywoodiennes ont-elles réagi à l'arrivée de la télévision dans les années 1950 ?",
      "answer": "D'abord par un boycott total (Jack Warner interdit les postes de TV dans ses films). Puis basculement en 1955 : Disney produit Disneyland pour ABC, Warner lance Cheyenne. En 1957, les 7 grands studios produisent une centaine de programmes TV."
    },
    {
      "question": "Qu'est-ce que les Fin-Syn Rules adoptées en 1970 ?",
      "answer": "Deux règles : (1) Network Financial Interest Rule — un Network ne peut avoir d'intérêts financiers dans la production ; (2) Network Syndication Rule — les Networks ne peuvent pas gérer la syndication (marché d'occasion). Paradoxe : en limitant les Networks, on concentre le pouvoir de distribution internationale entre les mains des majors."
    },
    {
      "question": "Qu'est-ce que la syndication dans le marché télévisuel américain ?",
      "answer": "Le marché de l'occasion des programmes. Un programme acheté et diffusé par un Network peut ensuite être revendu à des stations locales. Les Networks voulaient contrôler ce marché secondaire ; les Fin-Syn Rules le leur ont interdit, au profit des majors."
    },
    {
      "question": "Qu'est-ce qu'un conglomérat et pourquoi les majors en deviennent-elles des composantes ?",
      "answer": "Un conglomérat est une grande société à portefeuille d'activités variées. Fragilisées après le divorcment et par la concurrence TV, les majors sont rachetées dès 1962 : MCA rachète Universal, Gulf Western (pétrole) rachète Paramount, Coca-Cola rachète Columbia."
    },
    {
      "question": "Qu'est-ce que la macro-vision et pourquoi est-elle mise en place ?",
      "answer": "Un système anti-copie intégrant du bruit imperceptible dans la bande magnétique d'une cassette ou d'un programme TV. Ce signal empêche d'en faire une bonne copie. Mise en place par les majors pour lutter contre le piratage des cassettes VHS."
    },
    {
      "question": "Comment les majors ont-elles pris le contrôle du marché de la location vidéo ?",
      "answer": "En imposant aux magasins (comme Blockbuster) de ne plus acheter les cassettes mais de les louer, avec obligation de suivre la consommation et de payer au nombre de vues. Résultat : en 1986, les recettes vidéo des majors dépassent les entrées en salle."
    },
    {
      "question": "Qu'est-ce qu'un blockbuster et d'où vient ce terme ?",
      "answer": "Emprunté au vocabulaire militaire (bombe capable de détruire un pâté de maisons), le terme désigne une superproduction à très gros budget. Objectif : écraser la concurrence en concentrant les plus grandes stars et les meilleurs effets spéciaux. Budgets : 20M$ en 1980, 55M$ en 2000."
    },
    {
      "question": "Quel est le paradoxe du procès Sony Betamax (1976-1984) ?",
      "answer": "Universal et Disney poursuivent Sony pour piratage potentiel. Sony gagne finalement en 1984 à la Cour Suprême. Mais paradoxe : au moment où Sony gagne, c'est le standard concurrent VHS de Matsushita qui a dominé le marché. Sony gagne juridiquement mais perd commercialement."
    },
    {
      "question": "Quel avantage économique la production télévisuelle offre-t-elle par rapport au cinéma ?",
      "answer": "La production sérialisée permet de fidéliser : une fois la formule du succès trouvée, on la décline sur plusieurs mois ou années. Contrairement au cinéma (économie de prototype où chaque film doit convaincre), la TV permet une familiarité avec le spectateur et donc sa fidélisation."
    },
    {
      "question": "Quel est le résultat paradoxal des Fin-Syn Rules selon Kerry Seagrave ?",
      "answer": "En voulant limiter le pouvoir des Networks, les Fin-Syn Rules ont concentré le pouvoir de distribution internationale entre les mains des majors d'Hollywood. En 1990 : les majors représentent 68% des recettes du marché intérieur de la syndication et 80% des recettes du marché international."
    },
    {
      "question": "Pourquoi la déréglementation des années 1980 a-t-elle favorisé l'expansion internationale d'Hollywood ?",
      "answer": "En multipliant les chaînes privées en Europe (là où il n'existait que des monopoles publics de TV), la déréglementation a créé de nouveaux marchés pour les programmes américains. Ces nouvelles chaînes avaient besoin de contenu et se sont naturellement tournées vers Hollywood, la plus grande source mondiale."
    }
  ],
  "qcm": {
    "easy": [
      {
        "question": "Qu'est-ce que le divorcment décidé par la Cour Suprême en 1948 ?",
        "choices": ["Le divorce entre les studios et leurs stars", "L'obligation pour les majors de se séparer soit de la production soit de l'exploitation", "La séparation des majors et des minors", "L'interdiction du block booking"],
        "correct_index": 1,
        "explanation": "Le divorcment de 1948 oblige les majors à choisir entre production et exploitation. Toutes choisissent la production, sauf RKO qui garde l'exploitation."
      },
      {
        "question": "Quel studio hollywoodien a, le premier, produit une émission de télévision en 1955 ?",
        "choices": ["Warner", "Paramount", "Disney", "MGM"],
        "correct_index": 2,
        "explanation": "Disney produit Disneyland pour le réseau ABC en 1955, marquant le basculement de l'attitude hollywoodienne envers la télévision."
      },
      {
        "question": "Qu'est-ce que HBO et quand est-il créé ?",
        "choices": ["Un lobby des studios hollywoodiens, créé en 1970", "Home Box-Office, une chaîne câblée spécialisée dans le cinéma, créée en 1972 par le groupe Time", "Un réseau de distribution de films, créé en 1965", "Un système anti-piratage, créé en 1975"],
        "correct_index": 1,
        "explanation": "HBO (Home Box-Office) est créé en 1972 par le groupe Time. C'est la première chaîne câblée spécialisée dans le cinéma, qui deviendra nationale à partir de 1975."
      },
      {
        "question": "Que signifie la Network Financial Interest Rule des Fin-Syn Rules (1970) ?",
        "choices": ["Un Network ne peut pas diffuser de films", "Un Network ne peut pas avoir d'intérêts financiers dans la production télévisuelle", "Un Network doit financer 30% de la production nationale", "Un Network ne peut pas diffuser de publicité"],
        "correct_index": 1,
        "explanation": "La Network Financial Interest Rule interdit aux réseaux télévisés d'avoir des intérêts financiers dans la production. Ils ne peuvent pas produire eux-mêmes leurs programmes, sauf les informations."
      },
      {
        "question": "En quelle année les recettes vidéo des majors dépassent-elles les entrées en salle ?",
        "choices": ["1980", "1983", "1986", "1990"],
        "correct_index": 2,
        "explanation": "Dès 1986, les recettes tirées de la location et vente de cassettes vidéo représentent plus d'argent aux États-Unis que les entrées en salle pour les majors hollywoodiennes."
      },
      {
        "question": "Quel outil anti-copie les majors ont-elles mis en place pour les cassettes vidéo ?",
        "choices": ["Le cryptage numérique", "La macro-vision", "Le système Dolby", "La zone géographique"],
        "correct_index": 1,
        "explanation": "La macro-vision intègre du bruit imperceptible dans la bande magnétique d'une cassette ou d'un programme TV. Ce signal empêche de réaliser une bonne copie."
      },
      {
        "question": "Qu'est-ce que la syndication dans le marché télévisuel américain ?",
        "choices": ["Un accord entre producteurs pour partager les droits", "Le marché de l'occasion des programmes — un programme diffusé par un Network peut être revendu à des stations locales", "Un système de financement des séries", "La vente de programmes à l'international"],
        "correct_index": 1,
        "explanation": "La syndication est le marché de l'occasion : un programme acheté et diffusé par un Network entre sur le marché et peut être revendu à des stations locales qui ne l'ont pas encore diffusé."
      },
      {
        "question": "Quel studio hollywoodien Sony a-t-il racheté en 1989 ?",
        "choices": ["Universal", "Paramount", "Columbia", "Warner"],
        "correct_index": 2,
        "explanation": "En 1989, Sony rachète la Columbia qui devient la Sony Pictures Entertainment. C'est une grande émotion pour Hollywood car c'est le premier rachat majeur par un groupe étranger non américain."
      },
      {
        "question": "Quel est le coût moyen de production d'un film hollywoodien en 2000 ?",
        "choices": ["20 millions de dollars", "35 millions de dollars", "55 millions de dollars", "100 millions de dollars"],
        "correct_index": 2,
        "explanation": "Le coût moyen de production passe de 20M$ en 1980 à 35M$ en 1990 et 55M$ en 2000. Au même moment en France, il est de 5 millions d'euros."
      },
      {
        "question": "Pourquoi Sony a-t-il finalement gagné le procès Betamax en 1984 ?",
        "choices": ["La Cour Suprême a estimé que les magnétoscopes facilitaient réellement le piratage", "La Cour Suprême a dit que ces appareils ne constituaient pas les monstres décrits et les a autorisés", "Sony a prouvé que personne n'utilisait le magnétoscope pour pirater", "Le procès a été abandonné faute de preuves"],
        "correct_index": 1,
        "explanation": "La Cour Suprême a statué que les magnétoscopes n'étaient pas les instruments de piratage décrits et les a autorisés sans difficulté en 1984."
      }
    ],
    "medium": [
      {
        "question": "Pourquoi la perte des réseaux de salles après le divorcment de 1948 a-t-elle fragilisé les majors ?",
        "choices": [
          "Parce que les salles étaient leur principale source de prestige",
          "Parce que les salles permettaient de compenser les risques de la production (activité incertaine) par des recettes d'exploitation régulières — sans elles, toute l'économie des majors est déstabilisée",
          "Parce que les majors ont dû licencier des milliers d'employés",
          "Parce que les films ne pouvaient plus être diffusés sans les salles des majors"
        ],
        "correct_index": 1,
        "explanation": "L'exploitation des salles était une activité très rentable qui permettait d'absorber les risques de la production (où l'échec est toujours possible). Sans ces recettes assurées, les majors ne peuvent plus maintenir le studio system coûteux."
      },
      {
        "question": "Quel est le paradoxe des Fin-Syn Rules selon Kerry Seagrave ?",
        "choices": [
          "Elles ont rendu les Networks plus puissants qu'avant",
          "En voulant limiter le pouvoir des Networks, elles ont concentré le pouvoir de distribution internationale entre les mains des majors — en 1990, les majors font 80% des recettes du marché international de la syndication",
          "Elles ont favorisé l'émergence de nombreux producteurs indépendants",
          "Elles ont permis au gouvernement de contrôler la production télévisuelle"
        ],
        "correct_index": 1,
        "explanation": "En interdisant aux Networks d'avoir des intérêts dans la production et la syndication, les Fin-Syn Rules ont involontairement concentré ces activités entre les mains des majors, qui ont ainsi dominé encore plus la distribution internationale."
      },
      {
        "question": "Pourquoi la production sérialisée pour la télévision représente-t-elle un avantage économique par rapport au cinéma ?",
        "choices": [
          "Parce qu'elle était financée par la publicité et ne coûtait rien aux majors",
          "Parce qu'elle permet la fidélisation : une fois la formule du succès trouvée, on la décline sur plusieurs mois ou années — contrairement au cinéma où chaque film (prototype unique) doit reconquérir le public",
          "Parce que les acteurs de TV travaillaient pour des salaires inférieurs",
          "Parce que les programmes TV ne nécessitaient pas de droits de distribution internationaux"
        ],
        "correct_index": 1,
        "explanation": "La TV permet un mode de production différent du cinéma : une fois la formule trouvée, on la décline. La fidélisation du téléspectateur contraste avec l'économie de prototype du cinéma où chaque film est plus ou moins unique."
      },
      {
        "question": "Comment les majors ont-elles transformé leur rapport à la vidéo entre les années 1970 et 1980 ?",
        "choices": [
          "Elles ont abandonné ce marché au profit des chaînes câblées",
          "Après avoir tenté de faire interdire le magnétoscope par les tribunaux, elles ont imposé leur contrôle sur la location en obligeant les magasins à payer au nombre de vues — dépassant les entrées en salle dès 1986",
          "Elles ont accepté la vidéo comme un marché libre",
          "Elles ont créé leurs propres magasins de location"
        ],
        "correct_index": 1,
        "explanation": "Les majors sont passées de la résistance (procès contre Sony) à la maîtrise du marché : en imposant aux magasins de location un système de paiement au nombre de vues, elles ont transformé la vidéo en leur principale source de revenus."
      },
      {
        "question": "Pourquoi la déréglementation des années 1980 a-t-elle profité à Hollywood ?",
        "choices": [
          "Parce qu'elle a permis aux majors d'acheter des chaînes européennes",
          "Parce qu'elle a multiplié les chaînes privées en Europe ayant besoin de contenu — Hollywood, la plus grande source mondiale de programmes, a naturellement fourni ces contenus",
          "Parce qu'elle a supprimé les quotas de films américains en Europe",
          "Parce qu'elle a permis aux majors de tourner en Europe sans payer d'impôts"
        ],
        "correct_index": 1,
        "explanation": "La déréglementation a créé des dizaines de nouvelles chaînes privées en Europe, toutes ayant besoin de programmes. Faute d'industrie audiovisuelle nationale suffisamment développée, ces chaînes se sont massivement approvisionnées auprès d'Hollywood."
      },
      {
        "question": "En quoi la politique des blockbusters est-elle économiquement risquée ?",
        "choices": [
          "Parce qu'elle nécessite de faire venir des acteurs étrangers très coûteux",
          "Parce qu'elle mise tout sur quelques films à très gros budgets : si le film est un échec (comme La Porte du Paradis de Cimino en 1980), les pertes sont colossales",
          "Parce qu'elle exclut les spectateurs à faibles revenus",
          "Parce qu'elle dépend trop des marchés étrangers"
        ],
        "correct_index": 1,
        "explanation": "La politique des blockbusters concentre les risques : quelques films absorbent des budgets énormes (production + marketing). Un échec comme La Porte du Paradis (1980) peut menacer l'ensemble du studio."
      },
      {
        "question": "Qu'est-ce qu'une agence de talents et quel est son rôle dans la production post-studio system ?",
        "choices": [
          "Une agence gouvernementale qui surveille les contrats des acteurs",
          "Une société qui représente les artistes et propose des package deals — elle réunit autour d'un projet un réalisateur, un scénariste et des acteurs, puis démarche les producteurs",
          "Une agence de publicité spécialisée dans la promotion des films",
          "Un organisme de formation des acteurs hollywoodiens"
        ],
        "correct_index": 1,
        "explanation": "Les agences de talents émergent après la fin du studio system pour gérer la flexibilité des contrats. Leur innovation est le package deal : elles assemblent un projet complet et le proposent aux producteurs, devenant des forces de proposition."
      },
      {
        "question": "Pourquoi la chronologie des sorties (salle > vidéo > câble > TV généraliste) est-elle une stratégie économique essentielle pour les majors ?",
        "choices": [
          "Pour respecter des obligations légales des diffuseurs",
          "Pour maximiser les recettes à chaque étape en évitant que les supports se cannibalisent — chaque fenêtre d'exploitation est exclusive pendant une période donnée",
          "Pour permettre aux spectateurs de choisir leur mode de consommation",
          "Pour protéger les acteurs contre une surexposition médiatique"
        ],
        "correct_index": 1,
        "explanation": "La chronologie des médias (windows of exploitation) est une stratégie de maximisation des revenus : en échelonnant les sorties, on extrait la valeur maximale de chaque public séquentiellement, sans auto-concurrence. Cette concertation se fait au sein de la MPAA."
      },
      {
        "question": "Comment l'arrivée des conglomérats a-t-elle transformé la structure de l'industrie cinématographique ?",
        "choices": [
          "Elle a rendu les majors plus indépendantes artistiquement",
          "Elle a intégré les majors dans de grands groupes multi-activités, apportant des capitaux mais aussi des logiques de rentabilité propres à des secteurs extérieurs au cinéma (pétrole, boissons)",
          "Elle a provoqué la fin de la production de films d'auteur",
          "Elle a permis aux majors de reprendre le contrôle de leurs réseaux de salles"
        ],
        "correct_index": 1,
        "explanation": "L'intégration dans des conglomérats apporte des capitaux nécessaires mais transforme la culture des studios : des directions extérieures au cinéma (Gulf Western pour Paramount, Coca-Cola pour Columbia) imposent leurs logiques de rentabilité."
      },
      {
        "question": "Quelle ancienne société de syndication des Networks est devenue, après les Fin-Syn Rules, l'une des plus puissantes de l'audiovisuel mondial ?",
        "choices": [
          "L'ancienne société de syndication de NBC devient Universal",
          "L'ancienne société de syndication de CBS devient Viacom, aujourd'hui propriétaire de MTV, de la Paramount et de CBS",
          "L'ancienne société de syndication de ABC devient Disney",
          "L'ancienne société de syndication de Fox devient News Corp"
        ],
        "correct_index": 1,
        "explanation": "Les Networks devaient se dessaisir de leurs sociétés de syndication avec les Fin-Syn Rules. L'ancienne société de syndication de CBS devient ainsi Viacom, qui rachète ensuite MTV, la Paramount et CBS — un groupe médiatique majeur."
      }
    ],
    "hard": [
      {
        "question": "En quoi le passage du studio system au système de flexibilité post-1948 reflète-t-il une transformation des rapports de force dans l'industrie ?",
        "choices": [
          "Le système de flexibilité a donné plus de pouvoir aux réalisateurs",
          "La fin des contrats longs a transféré du pouvoir aux agences de talents : sans marché garanti (les salles), les majors doivent négocier plutôt qu'imposer, renforçant les acteurs capables de constituer des packages attractifs",
          "Le système de flexibilité a permis au gouvernement de mieux réguler l'industrie",
          "La fin du studio system a favorisé les producteurs indépendants"
        ],
        "correct_index": 1,
        "explanation": "La fin du studio system crée un marché du travail plus fluide. Les agences de talents s'affirment car elles maîtrisent l'assemblage de packages. Le pouvoir se fragmente : on passe d'un modèle où les moguls imposaient tout à un système de négociations permanentes."
      },
      {
        "question": "Comment la notion de technologie perturbatrice s'applique-t-elle à la fois à la vidéo (années 1970-80) et à Internet (années 2000) ?",
        "choices": [
          "Les deux technologies n'ont eu aucun impact sur l'industrie",
          "Les deux perturbent un ordre existant en portant simultanément des menaces (piratage, concurrence) et des opportunités (nouveaux marchés) — Hollywood réagit avec la même séquence : résistance juridique puis intégration commerciale",
          "La vidéo était une technologie perturbatrice mais pas Internet",
          "Internet n'a été qu'une menace, contrairement à la vidéo"
        ],
        "correct_index": 1,
        "explanation": "Les deux technologies perturbent un ordre existant avec la même dualité menaces/opportunités. Hollywood applique la même séquence : procès (contre Sony, puis contre Napster), puis intégration commerciale (marché vidéo contrôlé, streaming légal)."
      },
      {
        "question": "En quoi la politique des blockbusters crée-t-elle paradoxalement des barrières à l'entrée qui renforcent les majors face aux indépendants ?",
        "choices": [
          "Les blockbusters ne concernent que les majors car les indépendants refusent cette stratégie",
          "Plus les budgets sont élevés, moins les indépendants peuvent rivaliser — les blockbusters créent des barrières financières infranchissables, renforçant l'oligopole même si le risque par film augmente",
          "Les blockbusters ont rendu les majors financièrement fragiles",
          "Les budgets des blockbusters sont principalement financés par le gouvernement"
        ],
        "correct_index": 1,
        "explanation": "La politique des blockbusters est paradoxalement un outil de concentration : en portant les budgets à des niveaux inatteignables pour les indépendants (200M$ pour Titanic), les majors créent des barrières à l'entrée infranchissables tout en diversifiant les risques sur plusieurs films."
      },
      {
        "question": "En quoi la reconstitution des réseaux de salles par les majors dans les années 1980 (malgré le divorcment de 1948) illustre-t-elle les limites de la régulation anti-trust ?",
        "choices": [
          "Cette reconstitution prouve que la régulation anti-trust a toujours fonctionné",
          "Dès les années 1980, dans le contexte Reagan de déréglementation, les majors reconstituent des réseaux de salles en violation de la décision de 1948. Le gouvernement réagit trop tard, montrant que la pression économique finit par l'emporter sur les contraintes réglementaires",
          "La reconstitution a été autorisée par une nouvelle loi en 1980",
          "C'est le gouvernement qui a encouragé les majors à reconstituer des réseaux pour contrer la concurrence"
        ],
        "correct_index": 1,
        "explanation": "Dans le contexte de déréglementation de Reagan, la Columbia commence à racheter des salles en 1983. Sans réaction du gouvernement, Universal suit avec 400 écrans. Le signal est envoyé et toutes les majors reconstituent des réseaux, violant la décision de 1948 sans conséquences réelles."
      },
      {
        "question": "Comment les Fin-Syn Rules illustrent-elles le paradoxe de la régulation dans l'industrie culturelle américaine ?",
        "choices": [
          "Elles montrent que la régulation est toujours efficace quand l'État intervient",
          "En voulant limiter la concentration (les Networks), la régulation a produit une concentration encore plus grande (les majors) dans le domaine de la distribution internationale — elle a résolu un problème de concentration en en créant un autre",
          "Elles ont parfaitement atteint leur objectif de décentralisation",
          "Elles ont favorisé l'émergence de nombreux acteurs indépendants"
        ],
        "correct_index": 1,
        "explanation": "Les Fin-Syn Rules illustrent un paradoxe classique de la régulation anti-trust dans les industries culturelles : en interdisant une forme de concentration (Networks dominant la production ET la syndication), la régulation a involontairement créé une autre forme de concentration (majors dominant la distribution internationale)."
      },
      {
        "question": "En quoi l'expérience de la vidéo a-t-elle préparé les majors à mieux gérer l'arrivée du DVD ?",
        "choices": [
          "Les majors ont appliqué exactement les mêmes stratégies à la vidéo et au DVD",
          "L'expérience vidéo (guerre de standards VHS/Betamax, piratage, nécessité de contrôle de la distribution) a poussé les majors à négocier dès le départ avec les fabricants un format unique, un cryptage anti-copie et des zones géographiques pour le DVD",
          "L'expérience vidéo a montré aux majors qu'il ne fallait pas investir dans les nouveaux supports",
          "L'expérience vidéo n'a eu aucun impact sur la stratégie DVD"
        ],
        "correct_index": 1,
        "explanation": "Les leçons de la vidéo sont multiples : la guerre de standards (VHS vs Betamax) a retardé l'adoption, le piratage a coûté cher. Avec le DVD, les majors ont obtenu un format unique standardisé, intégré le cryptage et défini des zones géographiques dès le lancement. La concertation se fait au sein de la MPAA."
      },
      {
        "question": "Pourquoi peut-on qualifier la relation entre Hollywood et la télévision américaine de paradoxale entre 1945 et 1970 ?",
        "choices": [
          "Parce que Hollywood a immédiatement vu dans la TV une opportunité de marché",
          "Parce que les mêmes majors qui boycottaient la TV (Jack Warner interdisant les postes de TV dans ses films) ont finalement fait de la TV leur principal marché en moins de 15 ans, retournant l'ennemi déclaré en leur plus grand allié commercial",
          "Parce que la TV a immédiatement tué les entrées en salle comme prévu",
          "Parce que c'est le gouvernement qui a forcé Hollywood à collaborer avec la TV"
        ],
        "correct_index": 1,
        "explanation": "Le paradoxe est total : les majors qui qualifiaient la TV de 'diable' et interdisaient à leurs employés d'y travailler se sont retrouvées à en faire leur principal marché en moins de 15 ans. Dans les années 1970, les recettes TV égalent les recettes en salle."
      },
      {
        "question": "En quoi la notion d'économie de prototype s'applique-t-elle au cinéma et en quoi la TV l'a-t-elle partiellement résolue pour Hollywood ?",
        "choices": [
          "L'économie de prototype ne s'applique qu'à l'industrie automobile",
          "En cinéma, chaque film est un prototype unique dont le succès est incertain — un risque que la TV atténue grâce à la sérialisation : une fois la formule du succès trouvée, on la décline, réduisant l'incertitude et fidélisant le public",
          "La TV a éliminé totalement le risque économique pour Hollywood",
          "L'économie de prototype s'applique à la TV mais pas au cinéma"
        ],
        "correct_index": 1,
        "explanation": "L'économie de prototype (chaque film est plus ou moins unique, son succès est incertain) est le principal risque du cinéma. La TV atténue ce risque grâce à la sérialisation : une fois la formule trouvée (personnages, format, univers), on la décline sur des saisons entières, réduisant l'incertitude et fidélisant le spectateur."
      },
      {
        "question": "Comment le rachat de Columbia par Sony en 1989 illustre-t-il une transformation de la géopolitique de l'industrie cinématographique mondiale ?",
        "choices": [
          "Il illustre uniquement la force financière du Japon dans les années 1980",
          "Il illustre que le contenu (savoir-faire de production hollywoodien) est devenu plus précieux que le hardware (matériel électronique) — Sony, fabriquant de matériel, achète une major pour maîtriser aussi le contenu, préfigurant les fusions contenu/distribution qui structurent l'industrie aujourd'hui",
          "Il illustre que Hollywood ne peut plus se financer seul",
          "Il illustre uniquement l'échec de Sony à dominer le marché des magnétoscopes"
        ],
        "correct_index": 1,
        "explanation": "Le rachat de Columbia par Sony illustre une logique stratégique fondamentale : les fabricants de matériel (hardware) comprennent qu'ils ont besoin de contrôler aussi le contenu (software). Sony qui avait perdu la bataille du magnétoscope rachète une major pour maîtriser le contenu. Cette logique hardware/software structure toute l'industrie numérique contemporaine (Apple, Amazon, Google)."
      }
    ]
  },
  "panic": [
    "1948 : divorcment — majors doivent choisir entre production et exploitation. Toutes gardent la production.",
    "TV d'abord boycottée (Jack Warner). 1955 : Disney produit Disneyland pour ABC. Bascule totale.",
    "Fin-Syn Rules (1970) : Networks exclus de la production ET de la syndication. Paradoxe : les majors dominent la distribution internationale.",
    "Syndication = marché de l'occasion des programmes TV.",
    "Conglomérats dès 1962 : Gulf Western rachète Paramount, Coca-Cola rachète Columbia, Sony rachète Columbia en 1989.",
    "Vidéo : procès Betamax (1976-1984), Sony gagne mais VHS a gagné le marché. Macro-vision anti-copie. En 1986 : recettes vidéo > entrées en salle.",
    "Blockbusters : 20M$ (1980) → 55M$ (2000) production. Marketing : 9M$ → 27M$. Titanic : 200M$ + 100M$."
  ],
  "qrc": [
    {
      "question": "Comment Hollywood a-t-il surmonté la crise des années 1950-70 (divorcment, télévision, conglomérats) ?",
      "plan_type": "I. Le divorcment de 1948 et ses conséquences sur le studio system / II. La reconversion vers la télévision et les Fin-Syn Rules / III. La multiplication des marchés secondaires et la politique des blockbusters",
      "model_answer": "La période 1945-1970 est une période de crise profonde pour Hollywood. En 1948, la Cour Suprême impose le divorcment : les majors doivent choisir entre production et exploitation des salles. Toutes choisissent la production, perdant les recettes régulières de l'exploitation qui permettaient d'absorber les risques de la production. Sans ces recettes assurées, le studio system coûteux (contrats longs de 7 ans) est abandonné au profit d'un système de flexibilité avec renégociation permanente des contrats et émergence des agences de talents (package deals).\n\nL'arrivée de la télévision aggrave la situation : les entrées en salle baissent continûment de 1946 aux années 1970. Après un boycott initial (Jack Warner interdit les postes de TV dans ses films), le basculement s'opère en 1955 quand Disney produit Disneyland pour ABC. En 1957, les 7 grands studios produisent une centaine de programmes TV. La TV devient un second marché pour les films et une source de revenus qui, dans les années 1970, égale les entrées en salle. Les Fin-Syn Rules (1970) produisent un paradoxe : en interdisant aux Networks d'avoir des intérêts dans la production et la syndication, elles concentrent le pouvoir de distribution internationale entre les mains des majors (80% des recettes du marché international de syndication en 1990).\n\nParallèlement, dès les années 1960, les majors fragilisées sont rachetées par des conglomérats (Gulf Western achète Paramount, Coca-Cola achète Columbia). La multiplication des marchés secondaires (chaînes câblées, vidéo VHS, DVD, déréglementation des TV privées en Europe) leur permet de diversifier leurs revenus. Avec le contrôle du marché vidéo (macro-vision, paiement au nombre de vues), les recettes vidéo dépassent les entrées en salle dès 1986. Cette extension des marchés permet d'amortir des budgets croissants : c'est l'ère des blockbusters (20M$ de budget moyen en 1980, 55M$ en 2000), accompagnés de campagnes marketing mondiales.",
      "key_concepts": ["divorcment", "studio system", "Fin-Syn Rules", "syndication", "conglomérats", "marchés secondaires", "blockbuster", "vidéo", "HBO", "télévision"]
    },
    {
      "question": "Qu'est-ce que les Fin-Syn Rules et quel a été leur résultat paradoxal ?",
      "plan_type": "I. Contexte et contenu des Fin-Syn Rules / II. L'objectif initial de limitation des Networks / III. Le résultat paradoxal : concentration du pouvoir de distribution internationale entre les mains des majors",
      "model_answer": "Dans les années 1960-70, les trois grands réseaux américains (Networks) font 90% de l'audience télévisée. Leur position de force leur permet d'imposer aux producteurs (y compris aux majors) d'apparaître comme coproducteurs et co-propriétaires, puis d'exiger la gestion de leurs programmes sur le marché de l'occasion (syndication). La Federal Communications Commission veut mettre un terme à cette concentration.\n\nEn 1970 sont édictées deux règles, connues sous le nom de Fin-Syn Rules. La Network Financial Interest Rule interdit à un Network d'avoir des intérêts financiers dans la production : il ne peut pas produire lui-même ses programmes, sauf les informations. La Network Syndication Rule interdit aux Networks de s'occuper des programmes d'occasion. Avec ces règles, les Networks doivent se dessaisir de leurs sociétés de syndication — l'ancienne société de CBS devient ainsi Viacom, aujourd'hui propriétaire de MTV, de la Paramount et de CBS.\n\nLe résultat est paradoxal, comme l'analyse Kerry Seagrave dans American Television Abroad : en voulant limiter le pouvoir des Networks, on a concentré entre les mains des majors d'Hollywood le pouvoir de distribuer à l'étranger les programmes de télévision américaine. En 1990, les majors hollywoodiennes représentent 68% des recettes du marché intérieur de la syndication et 80% des recettes du marché international. Les Fin-Syn Rules ont ainsi involontairement renforcé la domination des majors sur la distribution internationale, un résultat contraire à l'objectif initial.",
      "key_concepts": ["Fin-Syn Rules", "Network Financial Interest Rule", "Network Syndication Rule", "syndication", "FCC", "majors", "distribution internationale", "paradoxe", "Viacom", "Kerry Seagrave"]
    }
  ]
}

with open('scripts/intern_ch2.json', 'w', encoding='utf-8') as f:
    json.dump(ch2, f, ensure_ascii=False, indent=2)

with open('scripts/intern_ch2.json', 'w', encoding='utf-8') as f:
    loaded = json.load(f)

fc = len(loaded['flashcards'])
easy = len(loaded['qcm']['easy'])
med = len(loaded['qcm']['medium'])
hard = len(loaded['qcm']['hard'])
qrc = len(loaded['qrc'])
panic = len(loaded['panic'])
size = len(open('/home/claude/intern_ch2.json').read())
print(f"Ch2 OK — FC:{fc} | QCM:{easy}/{med}/{hard} | QRC:{qrc} | Panic:{panic} | {size} chars")