import json

ch4 = {
  "number": 4,
  "title": "De nouvelles industries exportatrices : les telenovelas",
  "concentre": {
    "reading_time": 5,
    "sections": [
      {
        "type": "def",
        "title": "Des radionovelas aux telenovelas",
        "bullets": [
          "La radionovela naît à Cuba dans les années 1940. Deux grandes radios privées : RHC et CMQ. Pionniers : Felix Caignet diffuse Le droit de naitre (1948, 314 épisodes) sur CMQ. Les rues se vident à l'heure de diffusion.",
          "Formule de Caignet : 'Pleurer est un plaisir.' Genre mélodramatique. Diffusion quotidienne. Il écrit l'épisode du lendemain la veille, tenant compte des attentes des auditeurs.",
          "Le programme s'exporte dès 1948 : Venezuela (1949), Mexique (1950), Brésil (1951). L'espagnol cubain est adapté par des interprètes locaux.",
          "Les annonceurs (notamment les lessiviers type Colgate Palmolive) financent et parfois produisent les radionovelas — lien direct avec le soap opera américain créé pour séduire les ménagères."
        ]
      },
      {
        "type": "def",
        "title": "Televisa (Mexique) et Rede Globo (Brésil)",
        "bullets": [
          "Televisa (Mexique) : origines = radio XEW d'Emilio Azcarraga (1930). Telesistema Mexicano (1955) → Televisa (1973). Monopole de la TV privée jusqu'au début des années 1990 grâce au Parti Révolutionnaire Institutionnel au pouvoir.",
          "Rede Globo (Brésil) : créée par Roberto Marinho. Accord avec Time Life (1962) pour apprendre les ficelles de la TV commerciale. L'accord est dénoncé en 1969 quand Globo devient très profitable. Réseau organisé sur le modèle américain des Networks.",
          "Proximité entre Globo et le pouvoir politique brésilien : la chaîne est inaugurée un an après le coup d'État militaire de 1964. La dictature militaire reste jusqu'en 1983. Globo = TF1 du Brésil.",
          "Telenovela brésilienne ≠ mexicaine : Globo produit des telenovelas plus proches des réalités sociales (moins manichéennes). Beto Rockefeller (1968-69) marque ce tournant. Des intellectuels critiques se réfugient dans la fiction télévisée sous la dictature."
        ]
      },
      {
        "type": "key",
        "title": "Facteurs de succès et internationalisation",
        "bullets": [
          "Détrônement des programmes américains : en 1972, 60% des programmes importés à la TV brésilienne. En 1982 : 39%. La télenovela repousse les programmes américains aux horaires moins rentables.",
          "Proximité culturelle (Joseph Straubhaar) : les publics se sentent plus proches des telenovelas que des programmes américains car ils y voient des réalités moins éloignées des leurs.",
          "Coût de production très compétitif : 30 min utiles par jour de tournage pour une telenovela (vs 4 min en France, 9 min en Italie). En 1985, un épisode de telenovela coûte 20 000$, contre 1M$ pour Dallas.",
          "Exportation dans les années 1980 : chute du mur de Berlin → nouvelles TV privées en Europe de l'Est. Chine (Escrava Isaura de 1976 = plusieurs centaines de millions de téléspectateurs). Univision aux USA."
        ]
      },
      {
        "type": "key",
        "title": "Limites : vers des contre-flux ?",
        "bullets": [
          "Contre-flux (Daya Thussu, 2007) : les telenovelas représenteraient des flux s'opposant aux flux dominants américains.",
          "Limite 1 : Telemundo (réseau hispanique US) a fini par produire ses propres telenovelas (avec CapitalVision). Angelica mi vida, Guadalupe (exportée dans 15 pays) — les Américains produisent des telenovelas.",
          "Limite 2 : les exportations de telenovelas restent économiquement marginales selon David Hesmondhalgh ('insignifiantes en termes économiques'). Elles ne contrebalancent pas le volume des programmes américains.",
          "Limite 3 : la proximité culturelle ne fonctionne pas toujours (Escrava Isaura en Chine) — elle n'est donc pas le seul critère d'explication du succès international."
        ]
      }
    ]
  },
  "flashcards": [
    {
      "question": "Qui est Felix Caignet et quel rôle joue-t-il dans l'histoire de la telenovela ?",
      "answer": "Pionnier de la radionovela cubaine. Il diffuse Le droit de naitre en 1948 sur la radio CMQ (314 épisodes de 20 minutes). Sa formule 'Pleurer est un plaisir' définit le genre mélodramatique. Il écrit l'épisode du lendemain la veille, tenant compte des attentes des auditeurs. Le programme s'exporte dès 1948."
    },
    {
      "question": "Quel est le lien entre les radionovelas et les soap operas américains ?",
      "answer": "Les deux genres sont financés et parfois produits par des lessiviers (Colgate Palmolive, Procter & Gamble) qui cherchent à toucher les ménagères réputées pour décider des achats de produits ménagers. Le soap opera américain existe depuis les années 1930 et a servi de modèle, mais la telenovela s'en est progressivement affranchie."
    },
    {
      "question": "Qu'est-ce que Televisa et quel monopole exerce-t-il ?",
      "answer": "Groupe télévisuel mexicain fondé sur la radio XEW d'Emilio Azcarraga (1930). Telesistema Mexicano (1955) devient Televisa en 1973. Monopole de la télévision privée au Mexique jusqu'au début des années 1990, rendu possible par le Parti Révolutionnaire Institutionnel au pouvoir."
    },
    {
      "question": "Quel accord Rede Globo a-t-elle passé avec Time Life et quelle est son importance ?",
      "answer": "En 1962, Globo signe un accord avec Time Life (groupe d'édition américain) pour apprendre les ficelles de la télévision commerciale. Une fois le savoir-faire acquis et la chaîne devenue très profitable, l'accord est dénoncé en 1969. C'est un cas classique de transfert de savoir-faire puis d'émancipation."
    },
    {
      "question": "En quoi la telenovela brésilienne (Globo) diffère-t-elle de la telenovela mexicaine (Televisa) ?",
      "answer": "La telenovela mexicaine (dans la continuité de la radionovela cubaine) est dans le mélodrame manichéen. La telenovela brésilienne (Globo) est plus proche des réalités sociales et culturelles du Brésil, moins manichéenne. Beto Rockefeller (1968-69) marque ce tournant. Des intellectuels critiques se sont réfugiés dans la fiction télévisée sous la dictature militaire."
    },
    {
      "question": "Comment Rede Globo est-elle liée au régime politique brésilien ?",
      "answer": "La chaîne est inaugurée en 1965, un an après le coup d'État militaire de 1964. La dictature militaire reste jusqu'en 1983 et a autorisé la mise sur pied de Rede Globo. En échange, Globo surveille étroitement ses informations télévisées pour ne pas parler de certains sujets. Cette proximité avec le pouvoir explique en partie le développement de la chaîne."
    },
    {
      "question": "Qu'est-ce que la proximité culturelle selon Joseph Straubhaar ?",
      "answer": "Concept développé par Straubhaar à la fin des années 1970. Le succès des telenovelas à l'échelle internationale est lié au fait que les publics se sentent plus proches de ces programmes que des programmes américains car ils y voient des réalités moins éloignées de leur vécu. Limite : le succès d'Escrava Isaura en Chine montre que ce n'est pas le seul critère."
    },
    {
      "question": "Quels sont les avantages économiques de la telenovela par rapport aux programmes américains ?",
      "answer": "Production très compétitive : 30 min utiles par jour de tournage (vs 4 min en France, 9 min en Italie). Coût d'un épisode en 1985 : 20 000$ (vs 1M$ pour Dallas). Coût d'achat à la TV brésilienne : 800-1 200$ l'épisode américain vs production d'une telenovela à 20 000$ — mais avec une capitalisation possible à long terme."
    },
    {
      "question": "Qu'est-ce qu'un contre-flux selon Daya Thussu (2007) ?",
      "answer": "Des flux médiatiques qui viendraient s'opposer aux flux dominants, principalement américains. Thussu considère que les telenovelas sont emblématiques de ces contre-flux. Mais cette analyse a des limites : Telemundo produit ses propres telenovelas, et les exportations de telenovelas restent économiquement marginales selon Hesmondhalgh."
    },
    {
      "question": "Comment les telenovelas ont-elles pris pied aux États-Unis ?",
      "answer": "Via deux chaînes hispaniques : Univision (héritière du Spanish International Network créé par Azcarraga Milmo dans les années 1960, rebaptisée en 1997) et Telemundo (née en 1987, rachetée par Liberty Media/Sony en 1997, puis NBC Universal en 2001). Univision diffuse les telenovelas de Televisa, Telemundo a dû chercher ailleurs (notamment en Colombie : Yo soy Betty la fea)."
    },
    {
      "question": "Pourquoi les telenovelas ont-elles eu du succès dans les pays arabes dans les années 1980 ?",
      "answer": "Parce que les programmes américains de l'époque étaient jugés trop violents et trop libres sur le plan moral. Les telenovelas, destinées à un public familial, ne comportaient pas de scènes torrides et véhiculaient des normes morales plus acceptables par les publics arabes. Elles pouvaient être regardées en famille."
    },
    {
      "question": "Pourquoi le succès d'Escrava Isaura (1976) en Chine est-il analytiquement intéressant ?",
      "answer": "Cette telenovela brésilienne a été regardée par plusieurs centaines de millions de Chinois, alors que la proximité culturelle entre le Brésil et la Chine est quasi nulle. Cela démontre que la proximité culturelle n'est pas le seul facteur explicatif du succès des telenovelas à l'international."
    }
  ],
  "qcm": {
    "easy": [
      {
        "question": "Qui est considéré comme le pionnier de la radionovela cubaine ?",
        "choices": ["Emilio Azcarraga", "Felix Caignet", "Roberto Marinho", "Colgate Palmolive"],
        "correct_index": 1,
        "explanation": "Felix Caignet diffuse Le droit de naitre en 1948 sur la radio CMQ — 314 épisodes de 20 minutes. Les rues se vident à l'heure de diffusion."
      },
      {
        "question": "Quelle est la formule de Felix Caignet sur le genre mélodramatique ?",
        "choices": ["Le rire est la meilleure des médecines", "Pleurer est un plaisir", "L'émotion est la clé du succès", "La ménagère est notre public cible"],
        "correct_index": 1,
        "explanation": "Felix Caignet résume sa philosophie créative par 'Pleurer est un plaisir' — une décharge lacrymale est nécessaire pour que la radionovela fonctionne."
      },
      {
        "question": "Qui fonde Rede Globo et quand commence-t-elle à émettre ?",
        "choices": ["Emilio Azcarraga en 1955", "Roberto Marinho en 1965", "Felix Caignet en 1948", "Time Life en 1962"],
        "correct_index": 1,
        "explanation": "Rede Globo est fondée par Roberto Marinho et commence à émettre en 1965, un an après le coup d'État militaire brésilien de 1964."
      },
      {
        "question": "Qu'est-ce qu'un soap opera ?",
        "choices": ["Un genre musical américain", "Un feuilleton radiophonique ou télévisé mélodramatique diffusé l'après-midi, financé par des lessiviers ciblant les ménagères", "Un programme documentaire sur la vie des célébrités", "Un genre de film d'action américain"],
        "correct_index": 1,
        "explanation": "Le soap opera est un feuilleton mélodramatique américain diffusé depuis les années 1930 l'après-midi pour séduire les ménagères. Il est financé par des lessiviers (d'où 'opéra-savonnette'), qui ont ensuite exporté ce modèle en Amérique latine."
      },
      {
        "question": "Quel groupe télévisuel mexicain détient le monopole de la TV privée jusqu'au début des années 1990 ?",
        "choices": ["Rede Globo", "Telemundo", "Televisa", "Univision"],
        "correct_index": 2,
        "explanation": "Televisa (créé en 1973 à partir de Telesistema Mexicano de 1955) détient le monopole de la télévision privée au Mexique jusqu'aux années 1990, grâce au soutien du Parti Révolutionnaire Institutionnel au pouvoir."
      },
      {
        "question": "Quel concept Joseph Straubhaar développe-t-il pour expliquer le succès international des telenovelas ?",
        "choices": ["L'universalisme culturel", "La proximité culturelle", "La domination médiatique", "Le contre-flux"],
        "correct_index": 1,
        "explanation": "Straubhaar développe à la fin des années 1970 le concept de proximité culturelle : les publics se sentent plus proches des telenovelas que des programmes américains car ils y voient des réalités moins éloignées de leur vécu."
      },
      {
        "question": "Quel est l'impact des telenovelas sur les programmes américains à la TV brésilienne entre 1972 et 1982 ?",
        "choices": ["Les programmes importés augmentent de 60 à 80%", "Les programmes importés baissent de 60 à 39%", "Les programmes importés restent stables à 50%", "Les programmes importés disparaissent complètement"],
        "correct_index": 1,
        "explanation": "En 1972, 60% des programmes à la TV brésilienne sont importés. En 1982, ce chiffre tombe à 39% — une baisse significative grâce au succès des telenovelas nationales."
      },
      {
        "question": "Qu'est-ce que la chaîne Univision aux États-Unis ?",
        "choices": ["Une chaîne anglophone créée par Disney", "La première grande chaîne hispanique aux USA, héritière du Spanish International Network de Televisa", "Une chaîne câblée créée par HBO", "Un réseau éducatif pour les Latino-Américains"],
        "correct_index": 1,
        "explanation": "Univision est la grande chaîne hispanique aux USA, héritière du Spanish International Network (SIN) créé par Emilio Azcarraga Milmo dans les années 1960. Elle diffuse principalement les telenovelas de Televisa."
      },
      {
        "question": "Quelle telenovela brésilienne de 1976 a été regardée par plusieurs centaines de millions de Chinois ?",
        "choices": ["Beto Rockefeller", "Los ricos tambien lloran", "Escrava Isaura", "Angelica mi vida"],
        "correct_index": 2,
        "explanation": "Escrava Isaura (1976) a été diffusée en Chine et regardée par plusieurs centaines de millions de téléspectateurs — un cas qui illustre les limites de la théorie de la proximité culturelle."
      },
      {
        "question": "Quel chercheur parle de contre-flux à propos des telenovelas ?",
        "choices": ["Joseph Straubhaar", "David Hesmondhalgh", "Daya Thussu", "Ramon Lobato"],
        "correct_index": 2,
        "explanation": "Daya Thussu (2007) développe l'idée que les telenovelas sont emblématiques de contre-flux — des flux qui viendraient s'opposer aux flux dominants télévisuels américains."
      }
    ],
    "medium": [
      {
        "question": "Pourquoi les radionovelas cubaines ont-elles émergé dans les années 1940 et pas avant ?",
        "choices": [
          "Parce que la technologie radio n'était pas disponible avant",
          "Parce que Cuba disposait dans les années 1940 de deux des radios privées les plus modernes du monde (RHC et CMQ), financées par la publicité et cherchant du contenu pour séduire les ménagères, au même moment où les lessiviers cherchaient à exporter le modèle du soap opera",
          "Parce que le gouvernement cubain a imposé ce format",
          "Parce que Felix Caignet a inventé la radio en 1940"
        ],
        "correct_index": 1,
        "explanation": "La conjonction de deux facteurs explique l'émergence des radionovelas à Cuba : des radios privées modernes (RHC, CMQ) financées par la publicité et ayant besoin de contenu, et des lessiviers (Colgate Palmolive) cherchant à toucher les ménagères sur le modèle du soap opera américain qu'ils connaissaient déjà."
      },
      {
        "question": "En quoi la telenovela brésilienne est-elle différente de la mexicaine sur le plan sociologique ?",
        "choices": [
          "La telenovela brésilienne est plus commerciale que la mexicaine",
          "Sous la dictature militaire brésilienne (1964-1983), le champ culturel étant verrouillé, des intellectuels critiques se sont réfugiés dans la fiction télévisée, y introduisant une dimension sociale plus réaliste — d'où une telenovela moins manichéenne, plus proche des réalités brésiliennes",
          "La telenovela brésilienne utilise uniquement des acteurs de cinéma",
          "La telenovela brésilienne est produite exclusivement pour l'export"
        ],
        "correct_index": 1,
        "explanation": "La dictature militaire a verrouillé le champ culturel brésilien : presse épurée, TV surveillée, films critiques sans financement, auteurs critiques sans éditeur. Des talents critiques se sont réfugiés dans la fiction télévisée (considérée comme de la production industrielle), y apportant une dimension sociale absente dans les telenovelas mexicaines."
      },
      {
        "question": "Comment les telenovelas ont-elles évincé les programmes américains du prime time brésilien ?",
        "choices": [
          "Le gouvernement brésilien a imposé des quotas stricts",
          "En proposant un programme moins cher à produire (20 000$ l'épisode vs 1M$ pour Dallas), avec un moindre sentiment d'étrangeté pour les téléspectateurs brésiliens, et dans une forme sérialisée fidélisant le public du prime time",
          "Rede Globo a racheté tous les droits des programmes américains pour ne pas les diffuser",
          "Les téléspectateurs brésiliens ne comprenaient pas l'anglais"
        ],
        "correct_index": 1,
        "explanation": "La combinaison de coûts de production très bas, d'une familiarité culturelle (proximité culturelle) et d'une capacité à fidéliser le public du prime time a permis aux telenovelas brésiliennes de détrôner les programmes américains. En 1972 : 60% de programmes importés, en 1982 : 39%."
      },
      {
        "question": "Pourquoi le modèle de production de la telenovela est-il compétitif sur le plan industriel ?",
        "choices": [
          "Parce que les acteurs de telenovelas sont moins bien payés",
          "Parce qu'un réalisateur obtient 30 min utiles par jour de tournage (vs 4 min en France, 9 min en Italie), permettant de produire un épisode de 52 min en 2 jours, et que 60% des telenovelas mexicaines sont des adaptations de telenovelas déjà réalisées",
          "Parce que les telenovelas n'ont aucun budget de décors ou de costumes",
          "Parce que les studios sont financés directement par les États mexicain et brésilien"
        ],
        "correct_index": 1,
        "explanation": "La productivité est clé : 30 min utiles/jour au Mexique (vs 4 en France, 9 en Italie) permet de tourner un épisode de 52 min en 2 jours. À cela s'ajoute la standardisation : 60% des telenovelas mexicaines sont des adaptations de formats déjà éprouvés, réduisant les risques."
      },
      {
        "question": "En quoi la chute du mur de Berlin en 1989 a-t-elle favorisé l'internationalisation des telenovelas ?",
        "choices": [
          "Parce que les Allemands adoraient les telenovelas",
          "Parce qu'à l'Est du rideau de fer, des télévisions publiques pauvres et des télévisions privées naissantes avaient besoin de programmes peu chers — les telenovelas (parfois 50$ l'heure) représentaient une aubaine pour ces marchés",
          "Parce que la chute du mur a rendu l'espagnol populaire en Europe de l'Est",
          "Parce que les producteurs latino-américains avaient des contacts en Europe de l'Est"
        ],
        "correct_index": 1,
        "explanation": "La chute du mur a créé un nouveau marché : en Europe de l'Est, des télévisions pauvres cherchant des programmes peu chers. Les telenovelas, parfois vendues à 50$ l'heure (comme en Estonie), représentaient une opportunité économique pour ces marchés en formation."
      },
      {
        "question": "Quelles sont les limites de l'explication du succès international des telenovelas par la proximité culturelle ?",
        "choices": [
          "La proximité culturelle explique parfaitement tous les succès de telenovelas",
          "Le succès d'Escrava Isaura en Chine montre que la proximité culturelle ne fonctionne pas entre le Brésil et la Chine — d'autres facteurs (prix, normes morales familiales, manque d'alternatives) expliquent donc aussi les succès internationaux",
          "La proximité culturelle n'a jamais été pertinente pour expliquer quoi que ce soit",
          "La proximité culturelle s'applique uniquement aux pays hispanophones"
        ],
        "correct_index": 1,
        "explanation": "Le succès d'Escrava Isaura (telenovela brésilienne de 1976) en Chine avec plusieurs centaines de millions de téléspectateurs démontre que la proximité culturelle Brésil-Chine est quasi nulle. D'autres facteurs explicatifs doivent donc être mobilisés : prix compétitif, normes morales plus proches de celles des pays non occidentaux, manque d'alternatives."
      },
      {
        "question": "Pourquoi Telemundo a-t-il connu une crise d'audience après son rachat par Liberty Media et Sony en 1997 ?",
        "choices": [
          "Parce que Liberty Media et Sony ont augmenté les tarifs",
          "Parce que Liberty Media et Sony ont remplacé les telenovelas par des soap operas et des vieilles séries en espagnol, entraînant une chute brutale des audiences — montrant l'importance du genre telenovela pour le public hispanique",
          "Parce que le signal de Telemundo est devenu moins bon",
          "Parce que Televisa a poursuivi Telemundo en justice"
        ],
        "correct_index": 1,
        "explanation": "Liberty Media et Sony, extérieurs au monde hispanique, ont remplacé les telenovelas par des alternatives jugées équivalentes. La chute d'audience a été immédiate, prouvant que les telenovelas étaient un genre irremplaçable pour ce public. Ils ont dû se tourner vers la Colombie pour trouver Yo soy Betty la fea."
      },
      {
        "question": "Pourquoi les telenovelas ont-elles eu un certain succès dans les pays arabes dans les années 1980 ?",
        "choices": [
          "Parce que les téléspectateurs arabes parlaient espagnol",
          "Parce que les programmes américains étaient trop violents et sexuellement trop libres, alors que les telenovelas, destinées à un public familial, véhiculaient des normes morales plus acceptables dans les pays arabes",
          "Parce que les pays arabes avaient signé des accords avec Televisa",
          "Parce que les telenovelas traitaient de thèmes islamiques"
        ],
        "correct_index": 1,
        "explanation": "Dans les années 1980, les programmes américains étaient jugés trop violents et trop libres sur le plan moral. Les telenovelas, destinées à un public familial et ne comportant pas de scènes torrides (il est par exemple interdit de montrer un baiser dans les telenovelas mexicaines), véhiculaient des normes morales plus acceptables dans les pays arabes."
      },
      {
        "question": "En quoi l'accord Rede Globo / Time Life (1962-1969) est-il un cas exemplaire de transfert de savoir-faire ?",
        "choices": [
          "Il illustre que les Brésiliens ont copié les Américains sans les dépasser",
          "Il illustre la dynamique classique : apprendre le savoir-faire d'un partenaire étranger (Time Life pour la TV commerciale), puis dénoncer l'accord une fois le savoir-faire acquis et devenir autonome — une stratégie de rattrapage technologique",
          "Il illustre que les Américains dominaient totalement la TV brésilienne",
          "Il illustre que la coopération internationale est toujours bénéfique"
        ],
        "correct_index": 1,
        "explanation": "L'accord Globo/Time Life illustre une dynamique classique de transfert de savoir-faire : apprendre les ficelles de la TV commerciale auprès d'un acteur américain (Time Life), puis dénoncer l'accord dès 1969 quand Globo est devenu suffisamment profitable et autonome. C'est une stratégie de rattrapage technologique puis d'émancipation."
      },
      {
        "question": "Pourquoi David Hesmondhalgh estime-t-il que les exportations de telenovelas sont 'économiquement insignifiantes' ?",
        "choices": [
          "Parce que les telenovelas ne sont jamais exportées",
          "Parce que le volume des exportations de telenovelas, malgré des succès notables, ne réussit pas à contrebalancer le volume massif et les recettes des programmes américains — les contre-flux existent mais restent marginaux économiquement",
          "Parce que les telenovelas coûtent trop cher à l'export",
          "Parce que les droits de diffusion sont trop compliqués à négocier"
        ],
        "correct_index": 1,
        "explanation": "Hesmondhalgh ne nie pas l'existence des exportations de telenovelas, mais relativise leur importance économique : leur volume ne réussit pas à contrebalancer les flux dominants américains. Les contre-flux existent mais n'inversent pas le rapport de forces économique."
      }
    ],
    "hard": [
      {
        "question": "En quoi le genre de la telenovela illustre-t-il la tension entre universalisme et particularisme dans les échanges culturels internationaux ?",
        "choices": [
          "La telenovela est un genre purement universel qui transcende toutes les cultures",
          "La telenovela est un genre suffisamment universel dans ses ressorts (mélo, romance, injustice sociale réparée) pour circuler à l'international, mais suffisamment particulier dans ses codes culturels pour que les publics nationaux y reconnaissent leur réalité — cette double dimension est la clé de son succès",
          "La telenovela ne circule que dans les pays hispanophones",
          "La telenovela est un genre purement commercial sans dimension culturelle"
        ],
        "correct_index": 1,
        "explanation": "La telenovela illustre la tension universalisme/particularisme : ses ressorts narratifs universaux (mélo, romance, injustice réparée, manichéisme) permettent une circulation internationale, tandis que ses ancrages culturels locaux (langue, costumes, références sociales) créent la proximité culturelle pour les publics nationaux. Cette double dimension explique à la fois sa diffusion mondiale et ses limites dans certains contextes."
      },
      {
        "question": "En quoi la théorie des contre-flux de Daya Thussu (2007) est-elle à la fois pertinente et insuffisante pour analyser la diffusion des telenovelas ?",
        "choices": [
          "La théorie des contre-flux est parfaitement adaptée à l'analyse des telenovelas",
          "La théorie est pertinente pour souligner l'existence de flux non américains, mais insuffisante car elle ignore que les grandes sociétés américaines (Telemundo) sont devenues productrices de telenovelas, et que les exportations restent économiquement marginales face aux flux américains",
          "La théorie des contre-flux ne s'applique qu'aux pays en développement",
          "La théorie est complètement erronée et n'a aucun intérêt"
        ],
        "correct_index": 1,
        "explanation": "La théorie des contre-flux est pertinente pour nommer un phénomène réel (des flux non américains existent et circulent). Mais elle est insuffisante car : 1) des acteurs américains (Telemundo) produisent maintenant des telenovelas, neutralisant l'idée de flux opposé ; 2) les exportations restent économiquement marginales (Hesmondhalgh) face aux flux américains dominants ; 3) Netflix a pénétré le marché latin avec des contenus américains."
      },
      {
        "question": "Comment la relation entre Rede Globo et la dictature militaire brésilienne illustre-t-elle le paradoxe des conditions d'émergence d'une industrie télévisuelle nationale forte ?",
        "choices": [
          "La dictature militaire n'a joué aucun rôle dans le développement de Globo",
          "Globo doit sa puissance à un soutien politique (la dictature) qui a aussi verrouillé le champ culturel, poussant les intellectuels critiques dans la fiction télévisée — la force de Globo est paradoxalement liée à la répression politique qui lui a fourni des talents et un marché protégé",
          "La dictature a uniquement nui au développement de Globo",
          "La relation entre Globo et la dictature était purement commerciale"
        ],
        "correct_index": 1,
        "explanation": "Le paradoxe est saisissant : la dictature militaire a autorisé le développement de Globo (proximité politique) et verrouillé le champ culturel (presse, cinéma, édition). Résultat paradoxal : des intellectuels critiques, n'ayant nulle part où s'exprimer, se sont réfugiés dans la fiction télévisée de Globo, y apportant une dimension sociale distinctive qui a fait la qualité spécifique de la telenovela brésilienne."
      },
      {
        "question": "Comment l'analyse de la stratégie d'Univision illustre-t-elle la question de la souveraineté culturelle dans le contexte de la mondialisation ?",
        "choices": [
          "Univision est un exemple de souveraineté culturelle parfaite des Latino-Américains aux USA",
          "Univision illustre la complexité de la souveraineté culturelle : une chaîne mexicaine (Televisa) qui réussit à créer un réseau hispanique aux USA, mais dont la propriété étrangère la force à se retirer, et dont les fusions finales (avec Telemundo en 2022) montrent que la concentration des médias l'emporte sur les identités nationales",
          "Univision n'a aucun rapport avec la souveraineté culturelle",
          "Univision est une illustration de la domination américaine sur les Latino-Américains"
        ],
        "correct_index": 1,
        "explanation": "Univision illustre la complexité de la souveraineté culturelle : d'un côté une initiative mexicaine (Televisa via Azcarraga Milmo) qui réussit à créer le 4e réseau aux USA ; de l'autre, la régulation américaine qui interdit à un étranger d'être propriétaire d'une chaîne TV (forçant Televisa à se retirer). La fusion Televisa-Univision en 2022 et le rachat de Telemundo par NBC Universal montrent que les logiques de concentration et de globalisation finissent par absorber les initiatives culturelles locales."
      },
      {
        "question": "En quoi la trajectoire de Felix Caignet et des radionovelas illustre-t-elle la notion de bien symbolique et de production collective de Bourdieu/Becker ?",
        "choices": [
          "Les radionovelas n'ont rien à voir avec les théories de Bourdieu ou Becker",
          "La radionovela illustre à la fois la production collective (Becker : l'oeuvre nécessite les annonceurs, les acteurs, les techniciens radio, le scripteur) et la dimension symbolique (Bourdieu) : le genre tire sa valeur non de son utilité matérielle mais de ce qu'il évoque (mélo, larmes, reconnaissance sociale)",
          "Les radionovelas illustrent uniquement les théories économiques du marché",
          "Felix Caignet était le seul créateur de ses programmes, illustrant le génie individuel"
        ],
        "correct_index": 1,
        "explanation": "Les radionovelas illustrent parfaitement les deux cadres théoriques : pour Becker, c'est un travail collectif (acteurs, techniciens, scripteurs, annonceurs financeurs — sans qui l'oeuvre n'existerait pas). Pour Bourdieu, c'est un bien symbolique dont la valeur est dans la signification (catharsis lacrymale, reconnaissance de situations sociales) et non dans une utilité matérielle. L'économie de la mauvaise foi s'y retrouve aussi : les annonceurs financent l'émotion tout en vendant leurs détergents."
      },
      {
        "question": "Comment l'internationalisation des telenovelas remet-elle en question l'idée que la domination culturelle est nécessairement unilatérale ?",
        "choices": [
          "Elle ne remet pas en question cette idée — Hollywood reste totalement dominant",
          "Les telenovelas montrent qu'il existe des multi-polarités dans les échanges culturels mondiaux — des industries du Sud peuvent développer des genres qui circulent à l'échelle mondiale, même si ces flux restent asymétriques face à la domination américaine",
          "Les telenovelas prouvent que la domination américaine est terminée",
          "L'internationalisation des telenovelas est un phénomène trop marginal pour avoir une portée théorique"
        ],
        "correct_index": 1,
        "explanation": "Les telenovelas remettent en question l'idée d'une domination culturelle strictement unilatérale (US → reste du monde). Elles montrent l'existence de multi-polarités : des industries du Sud (Mexique, Brésil, Colombie) développent des genres qui circulent à l'échelle mondiale (y compris aux USA via Univision/Telemundo). Cependant, ces flux restent asymétriques — ils n'inversent pas le rapport de forces économique (Hesmondhalgh)."
      },
      {
        "question": "En quoi le fait que Telemundo, racheté par NBC Universal, soit devenu un grand producteur de telenovelas illustre-t-il les limites du concept de contre-flux ?",
        "choices": [
          "Cela confirme totalement la théorie des contre-flux",
          "Cela illustre que les flux culturels non américains peuvent être réappropriés et produits par des acteurs américains — NBC Universal produit des telenovelas 'panaméricaines' qui s'exportent en Amérique latine. Le contre-flux devient un flux américain déguisé, vidant la notion de son sens",
          "Cela montre que Telemundo a toujours été une chaîne américaine",
          "Ce phénomène ne remet pas en cause le concept de contre-flux"
        ],
        "correct_index": 1,
        "explanation": "NBC Universal rachetant Telemundo et produisant des telenovelas 'panaméricaines' exportées en Amérique latine illustre parfaitement la limite du concept de contre-flux : ce qui semblait être un flux culturel venant du Sud (les telenovelas) est réapproprié par des acteurs américains qui en font un produit qu'ils exportent dans les mêmes marchés. La forme (telenovela) reste mais le contenu et la propriété redeviennent américains."
      },
      {
        "question": "Comment la stratégie de prix des telenovelas à l'exportation (adaptée au pouvoir d'achat de chaque marché) reproduit-elle une logique qu'Hollywood avait elle-même développée ?",
        "choices": [
          "Les telenovelas ont inventé cette stratégie de prix différenciés",
          "Hollywood a développé bien avant les producteurs latino-américains la stratégie de vendre les programmes en fonction du pouvoir d'achat du pays acheteur — les producteurs de telenovelas ont simplement appliqué la même logique : de 7 000 à 10 000$ en Espagne pour le même épisode vendu 100 à 250$ en République Dominicaine",
          "Les telenovelas se vendent toujours au même prix quel que soit le marché",
          "La stratégie de prix différenciés est propre aux marchés hispanophones"
        ],
        "correct_index": 1,
        "explanation": "Les producteurs de telenovelas ont adopté la même stratégie de prix différenciés qu'Hollywood : vendre en fonction du pouvoir d'achat du marché. Cette stratégie permet de maximiser les recettes dans les marchés riches (7 000-10 000$ l'épisode en Espagne) tout en pénétrant les marchés pauvres (100-250$ en République Dominicaine). C'est une reproduction consciente de la logique hollywoodienne appliquée dès le début du XXe siècle."
      }
    ]
  },
  "panic": [
    "Radionovela = Cuba, années 1940. Felix Caignet, Le droit de naitre (1948, CMQ). 'Pleurer est un plaisir.' Genre mélodramatique financé par les lessiviers.",
    "Export dès 1948 : Venezuela (1949), Mexique (1950), Brésil (1951). Adaptation par interprètes locaux.",
    "Televisa (Mexique) : XEW (1930) → Telesistema (1955) → Televisa (1973). Monopole TV privée jusqu'aux années 1990.",
    "Rede Globo (Brésil) : Roberto Marinho. Accord Time Life (1962-1969). Proximité avec la dictature militaire (1964-1983). Telenovela brésilienne plus réaliste socialement.",
    "Straubhaar : proximité culturelle. Limite : Escrava Isaura succès en Chine malgré zéro proximité.",
    "Compétitivité : 30 min utiles/jour (vs 4 en France). 1 épisode = 20 000$ (vs 1M$ pour Dallas).",
    "Contre-flux (Thussu) — limites : Telemundo produit ses propres telenovelas. Hesmondhalgh : exportations 'économiquement insignifiantes'."
  ],
  "qrc": [
    {
      "question": "Qu'est-ce qu'une telenovela et comment expliquer son succès à l'échelle internationale dans les années 1980 ?",
      "plan_type": "I. Origines du genre (radionovelas cubaines, transfert TV) / II. Facteurs de succès : compétitivité économique et proximité culturelle / III. Limites : contre-flux ou réappropriation américaine ?",
      "model_answer": "La telenovela est un feuilleton télévisuel de prime time, genre né du transfert des radionovelas cubaines à la télévision dans les années 1950. Felix Caignet est le pionnier : sa radionovela Le droit de naitre (1948, 314 épisodes sur CMQ) pose les bases du genre mélodramatique — 'Pleurer est un plaisir' — et s'exporte dès 1948 au Venezuela, au Mexique et au Brésil. Le genre se construit en interaction avec le soap opera américain, financé par des lessiviers (Colgate Palmolive), avant de s'en affranchir progressivement : en Amérique latine, la telenovela passe au prime time, est produite par les grands groupes télévisuels nationaux (Televisa au Mexique depuis 1973, Rede Globo au Brésil depuis 1965), et se nationalise culturellement.\n\nLe succès international des années 1980 s'explique par deux facteurs. D'abord la compétitivité économique : un réalisateur de telenovela obtient 30 minutes utiles par jour de tournage (vs 4 en France, 9 en Italie), produisant un épisode de 52 minutes en 2 jours. En 1985, un épisode coûte 20 000$ contre 1 million pour Dallas. Ce différentiel de prix permet de pénétrer des marchés que les programmes américains ne peuvent atteindre. Ensuite, la proximité culturelle (Joseph Straubhaar) : les publics se sentent plus proches des telenovelas que des programmes américains car ils y voient des réalités moins éloignées. La chute du mur de Berlin et la déréglementation télévisuelle mondiale multiplient les marchés récepteurs (Europe de l'Est, Chine, pays arabes).\n\nCependant, plusieurs limites nuancent l'idée de contre-flux (Daya Thussu, 2007) : le succès d'Escrava Isaura en Chine révèle que la proximité culturelle n'est pas le seul critère. Surtout, Telemundo (racheté par NBC Universal) est devenu lui-même grand producteur de telenovelas exportées en Amérique latine. Enfin, selon David Hesmondhalgh, les exportations de telenovelas restent économiquement insignifiantes face aux flux américains dominants.",
      "key_concepts": ["telenovela", "radionovela", "Felix Caignet", "Televisa", "Rede Globo", "proximité culturelle", "Straubhaar", "contre-flux", "Thussu", "Hesmondhalgh", "soap opera", "prime time"]
    },
    {
      "question": "En quoi les industries télévisuelles mexicaine (Televisa) et brésilienne (Rede Globo) illustrent-elles deux modèles distincts de développement d'une industrie culturelle nationale ?",
      "plan_type": "I. Televisa : monopole, mélodrame et expansion hispanique / II. Rede Globo : savoir-faire américain, dictature, dimension sociale / III. Ce que leurs différences révèlent sur la relation entre industrie culturelle et contexte politique",
      "model_answer": "Televisa et Rede Globo sont les deux grands groupes qui ont fait de la telenovela une industrie culturelle exportatrice, mais selon des trajectoires et des styles distincts.\n\nTelevisa (Mexique) naît de la radio XEW d'Emilio Azcarraga (1930), devient Telesistema Mexicano (1955) puis Televisa (1973). Son développement repose sur un monopole de la télévision privée garanti par le Parti Révolutionnaire Institutionnel au pouvoir. Ses telenovelas s'inscrivent dans la continuité du mélodrame cubain (injustice sociale qui se répare, manichéisme, romance), avec Los ricos tambien lloran comme exemple typique. Televisa étend son influence aux États-Unis via le réseau hispanique SIN/Univision.\n\nRede Globo (Brésil) est fondée par Roberto Marinho et émet à partir de 1965. Elle s'appuie sur un accord avec Time Life (1962-1969) pour apprendre les ficelles de la télévision commerciale américaine, puis l'abandonne une fois autonome. Organisée en réseau sur le modèle des Networks américains, elle bénéficie de la proximité avec la dictature militaire (1964-1983). Paradoxalement, cette dictature explique aussi la spécificité de la telenovela brésilienne : le champ culturel étant verrouillé (presse, cinéma, théâtre), des intellectuels critiques se sont réfugiés dans la fiction télévisée, y introduisant une dimension sociale plus réaliste. Beto Rockefeller (1968-69) marque ce tournant.\n\nCes deux modèles révèlent que le développement d'une industrie culturelle nationale est toujours médiatisé par le contexte politique : le monopole garanti par l'État mexicain et la dictature brésilienne ont à la fois protégé le développement de ces industries et influencé le contenu de leur production culturelle.",
      "key_concepts": ["Televisa", "Rede Globo", "monopole", "Parti Révolutionnaire Institutionnel", "dictature militaire", "mélodrame", "réalisme social", "Time Life", "Networks", "Beto Rockefeller", "transfert de savoir-faire"]
    }
  ]
}

with open('scripts/intern_ch4.json', 'w', encoding='utf-8') as f:
    json.dump(ch4, f, ensure_ascii=False, indent=2)

with open('scripts/intern_ch4.json', 'w', encoding='utf-8') as f:
    loaded = json.load(f)

fc = len(loaded['flashcards'])
easy = len(loaded['qcm']['easy'])
med = len(loaded['qcm']['medium'])
hard = len(loaded['qcm']['hard'])
qrc = len(loaded['qrc'])
panic = len(loaded['panic'])
size = len(open('/home/claude/intern_ch4.json').read())
print(f"Ch4 OK — FC:{fc} | QCM:{easy}/{med}/{hard} | QRC:{qrc} | Panic:{panic} | {size} chars")