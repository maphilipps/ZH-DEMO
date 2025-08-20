<?php

use Drupal\node\Entity\Node;
use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;

// Bootstrap Drupal properly
$autoloader = require_once 'web/autoload.php';
$request = Request::createFromGlobals();

$kernel = DrupalKernel::createFromRequest($request, $autoloader, 'prod');
$kernel->boot();
$kernel->preHandle($request);

// Set the container
$container = $kernel->getContainer();
\Drupal::setContainer($container);

// Demo content data
$demo_data = [
  'club' => [
    [
      'title' => 'Reitverein Bruchtal e.V.',
      'field_description' => 'Der Reitverein Bruchtal e.V. wurde 1952 gegründet und ist einer der traditionsreichsten Reitvereine am Zürichsee. Mit über 120 Mitgliedern bieten wir Reitunterricht für alle Altersgruppen, von der Ponyschule bis zum Dressur- und Springsport. Unser idyllisch gelegener Reiterhof direkt am Seeufer verfügt über eine 20x60m Dressurreitbahn, einen Springplatz und kilometerlange Reitwege entlang des Sees. Neben dem Sport steht bei uns die Gemeinschaft im Vordergrund - regelmäßige Vereinsanlässe, Reiterlager und gesellige Abende schweißen unsere Reitergemeinschaft zusammen.',
      'field_website' => 'https://www.reitverein-bruchtal.ch',
      'field_social_media_facebook' => 'https://facebook.com/reitverein.bruchtal',
      'field_social_media_instagram' => 'https://instagram.com/reitverein_bruchtal',
      'field_phone' => '+41 44 555 01 20',
      'field_email' => 'info@reitverein-bruchtal.ch',
      'field_contact_name' => 'Theoden Eckhart',
      'field_directory_contact_email' => 'theoden.eckhart@reitverein-bruchtal.ch',
      'field_contact_phone' => '+41 79 456 78 90',
      'field_contact_position' => 'Vereinspräsident',
      'field_verified' => 1,
      'field_logo' => 72,
      'field_header_image' => 62
    ],
    [
      'title' => 'Segelclub Bruchtal',
      'field_description' => 'Der Segelclub Bruchtal liegt traumhaft am Zürichsee und bietet seit 1963 optimale Bedingungen für den Segelsport. Mit 85 Mitgliedern sind wir ein familiärer Verein, der sowohl Anfänger als auch ambitionierte Regattasegler willkommen heißt. Unsere moderne Marina verfügt über 60 Liegeplätze, ein Vereinshaus mit Terrasse und eine professionelle Segelschule. Regelmäßige Regatten, Segeltörns auf dem Mittelmeer und gesellige Vereinsanlässe prägen das Vereinsleben. Die Jugendförderung liegt uns besonders am herzen.',
      'field_website' => 'https://www.segelclub-bruchtal.ch',
      'field_social_media_facebook' => 'https://facebook.com/segelclub.bruchtal',
      'field_social_media_instagram' => 'https://instagram.com/segelclub_bruchtal',
      'field_phone' => '+41 44 555 01 30',
      'field_email' => 'info@segelclub-bruchtal.ch',
      'field_contact_name' => 'Arwen Seewind',
      'field_directory_contact_email' => 'arwen.seewind@segelclub-bruchtal.ch',
      'field_contact_phone' => '+41 79 456 78 91',
      'field_contact_position' => 'Commodore',
      'field_verified' => 1,
      'field_logo' => 73,
      'field_header_image' => 60
    ],
    [
      'title' => 'Musikverein Bruchtal',
      'field_description' => 'Der Musikverein Bruchtal wurde 1885 gegründet und ist stolz auf seine lange Tradition. Mit 45 aktiven Musikanten und Musikantinnen gestalten wir das kulturelle Leben der Gemeinde mit. Von traditioneller Blasmusik über moderne Arrangements bis hin zu festlichen Märschen - unser Repertoire ist vielfältig. Höhepunkte im Vereinsjahr sind das traditionelle Ständchen, die Teilnahme am Dorffest und unser jährliches Konzert im Herbst. Neue Mitglieder sind herzlich willkommen, auch Quereinsteiger finden bei uns ihren Platz.',
      'field_website' => 'https://www.musikverein-bruchtal.ch',
      'field_social_media_facebook' => 'https://facebook.com/musikverein.bruchtal',
      'field_phone' => '+41 44 555 01 40',
      'field_email' => 'info@musikverein-bruchtal.ch',
      'field_contact_name' => 'Legolas Silberhorn',
      'field_directory_contact_email' => 'legolas.silberhorn@musikverein-bruchtal.ch',
      'field_contact_phone' => '+41 79 456 78 92',
      'field_contact_position' => 'Dirigent',
      'field_verified' => 0,
      'field_logo' => 74,
      'field_header_image' => 65
    ],
    [
      'title' => 'Turnverein Bruchtal',
      'field_description' => 'Sport, Spiel und Spaß für die ganze Familie - das ist der Turnverein Bruchtal! Seit 1923 fördern wir die Gesundheit und Fitness unserer über 150 Mitglieder. Unser vielfältiges Angebot umfasst Geräteturnen, Leichtathletik, Volleyball, Aerobic und Seniorenturnen. Besonders stolz sind wir auf unsere erfolgreiche Jugendarbeit - vom Eltern-Kind-Turnen bis zum Wettkampfsport. Die moderne Dreifachturnhalle und der Sportplatz bieten optimale Trainingsbedingungen. Geselligkeit wird bei uns großgeschrieben: Vereinsreisen, Grillabende und das legendäre Turnfest sorgen für Zusammenhalt.',
      'field_website' => 'https://www.turnverein-bruchtal.ch',
      'field_social_media_facebook' => 'https://facebook.com/tv.bruchtal',
      'field_social_media_instagram' => 'https://instagram.com/tv_bruchtal',
      'field_phone' => '+41 44 555 01 50',
      'field_email' => 'info@turnverein-bruchtal.ch',
      'field_contact_name' => 'Gimli Kraftstein',
      'field_directory_contact_email' => 'gimli.kraftstein@turnverein-bruchtal.ch',
      'field_contact_phone' => '+41 79 456 78 93',
      'field_contact_position' => 'Vereinspräsident',
      'field_verified' => 1,
      'field_logo' => 75,
      'field_header_image' => 63
    ]
  ],
  'company' => [
    [
      'title' => 'Schreinerei am See AG',
      'field_description' => 'Die Schreinerei am See AG ist seit 1967 Ihr zuverlässiger Partner für individuelle Holzlösungen in Bruchtal und Umgebung. Als traditioneller Familienbetrieb in dritter Generation verbinden wir handwerkliches Können mit modernster Technik. Unser Leistungsspektrum umfasst Küchen nach Maß, Einbauschränke, Fenster und Türen, sowie komplette Innenausbauten. Nachhaltigkeit liegt uns am Herzen - wir verwenden ausschließlich Holz aus regionalen, zertifizierten Wäldern. Unsere 12 qualifizierten Mitarbeiter stehen für Qualität, Termintreue und faire Preise.',
      'field_website' => 'https://www.schreinerei-am-see.ch',
      'field_social_media_facebook' => 'https://facebook.com/schreinerei.amsee',
      'field_social_media_linkedin' => 'https://linkedin.com/company/schreinerei-am-see',
      'field_phone' => '+41 44 555 02 10',
      'field_email' => 'info@schreinerei-am-see.ch',
      'field_contact_name' => 'Balin Eichenmeister',
      'field_directory_contact_email' => 'balin.eichenmeister@schreinerei-am-see.ch',
      'field_contact_phone' => '+41 79 456 79 01',
      'field_contact_position' => 'Geschäftsführer',
      'field_verified' => 1,
      'field_logo' => 68,
      'field_header_image' => 66
    ],
    [
      'title' => 'IT Solutions Bruchtal GmbH',
      'field_description' => 'IT Solutions Bruchtal ist Ihr kompetenter Partner für alle IT-Bedürfnisse am Zürichsee. Seit 2010 entwickeln und betreuen wir maßgeschneiderte Software-Lösungen für KMU und Gemeinden. Unser Expertenteam aus 8 Spezialisten deckt die gesamte Bandbreite ab: von Webentwicklung und E-Commerce über Cloud-Migration bis hin zu Cybersecurity. Besonders stolz sind wir auf unsere Zusammenarbeit mit lokalen Gemeinden bei der Digitalisierung ihrer Verwaltungsprozesse. Agile Methoden, moderne Technologien und persönlicher Service sind unsere Stärken.',
      'field_website' => 'https://www.it-solutions-bruchtal.ch',
      'field_social_media_linkedin' => 'https://linkedin.com/company/it-solutions-bruchtal',
      'field_phone' => '+41 44 555 02 20',
      'field_email' => 'info@it-solutions-bruchtal.ch',
      'field_contact_name' => 'Gandalf Graubart',
      'field_directory_contact_email' => 'gandalf.graubart@it-solutions-bruchtal.ch',
      'field_contact_phone' => '+41 79 456 79 02',
      'field_contact_position' => 'CTO',
      'field_verified' => 1,
      'field_logo' => 69,
      'field_header_image' => 67
    ],
    [
      'title' => 'Bauunternehmen Müller AG',
      'field_description' => 'Das Bauunternehmen Müller AG blickt auf über 80 Jahre Bauerfahrung zurück und ist einer der führenden Bauunternehmer in der Region Zürichsee. Mit 35 qualifizierten Mitarbeitern realisieren wir Projekte vom Einfamilienhaus bis zum komplexen Gewerbebau. Unsere Kernkompetenzen liegen im Hochbau, Tiefbau und in der Gebäudesanierung. Modernste Baumaschinen, nachhaltige Bauweise und präzise Projektplanung zeichnen uns aus. Als regional verwurzelter Betrieb legen wir großen Wert auf Qualität, Termintreue und langfristige Kundenbeziehungen.',
      'field_website' => 'https://www.baumueller-bruchtal.ch',
      'field_social_media_linkedin' => 'https://linkedin.com/company/baumueller-bruchtal',
      'field_phone' => '+41 44 555 02 30',
      'field_email' => 'info@baumueller-bruchtal.ch',
      'field_contact_name' => 'Thorin Steinbrecher',
      'field_directory_contact_email' => 'thorin.steinbrecher@baumueller-bruchtal.ch',
      'field_contact_phone' => '+41 79 456 79 03',
      'field_contact_position' => 'Geschäftsführer',
      'field_verified' => 0,
      'field_logo' => 70,
      'field_header_image' => 64
    ],
    [
      'title' => 'Elektro Meier GmbH',
      'field_description' => 'Elektro Meier ist seit 1975 der Elektrofachbetrieb des Vertrauens in Bruchtal. Unser Team von 15 erfahrenen Elektrikern und Elektronikerinnen sorgt für sichere und effiziente Elektroinstallationen in Wohn- und Gewerbebauten. Von der Hausinstallation über Smart Home Systeme bis hin zu Photovoltaik-Anlagen - wir sind Ihr kompetenter Partner für alle elektrischen Belange. Unsere 24h-Notfall-Service und die regelmäßigen Weiterbildungen unserer Mitarbeiter garantieren höchste Sicherheitsstandards und modernste Technik.',
      'field_website' => 'https://www.elektro-meier-bruchtal.ch',
      'field_social_media_facebook' => 'https://facebook.com/elektro.meier.bruchtal',
      'field_phone' => '+41 44 555 02 40',
      'field_email' => 'info@elektro-meier-bruchtal.ch',
      'field_contact_name' => 'Boromir Blitzhand',
      'field_directory_contact_email' => 'boromir.blitzhand@elektro-meier-bruchtal.ch',
      'field_contact_phone' => '+41 79 456 79 04',
      'field_contact_position' => 'Betriebsleiter',
      'field_verified' => 1,
      'field_logo' => 71,
      'field_header_image' => 61
    ]
  ],
  'hospitality' => [
    [
      'title' => 'Restaurant Seeblick',
      'field_description' => 'Das Restaurant Seeblick besticht durch seine einzigartige Lage direkt am Zürichsee und bietet seinen Gästen einen traumhaften Panoramablick. Seit 1978 verwöhnt Familie Sommer ihre Gäste mit regionaler Küche und frischen Seefischen. Unsere Sonnenterrasse mit 80 Plätzen ist der perfekte Ort für romantische Dinner oder entspannte Mittagspausen. Die Speisekarte vereint traditionelle Schweizer Gerichte mit mediterranen Einflüssen. Besonders stolz sind wir auf unseren preisgekrönten Riesling vom eigenen Weinberg. Private Feiern bis 120 Personen werden gerne ausgerichtet.',
      'field_website' => 'https://www.restaurant-seeblick.ch',
      'field_social_media_facebook' => 'https://facebook.com/restaurant.seeblick',
      'field_social_media_instagram' => 'https://instagram.com/restaurant_seeblick',
      'field_phone' => '+41 44 555 03 10',
      'field_email' => 'info@restaurant-seeblick.ch',
      'field_contact_name' => 'Elrond Seeherr',
      'field_directory_contact_email' => 'elrond.seeherr@restaurant-seeblick.ch',
      'field_contact_phone' => '+41 79 456 79 11',
      'field_contact_position' => 'Geschäftsführer',
      'field_verified' => 1,
      'field_logo' => 74,
      'field_header_image' => 76
    ],
    [
      'title' => 'Hotel Post Bruchtal',
      'field_description' => 'Das traditionsreiche Hotel Post liegt im Herzen von Bruchtal und empfängt seit 1892 Gäste aus aller Welt. Unser charmantes 3-Sterne-Hotel verfügt über 28 liebevoll eingerichtete Zimmer, alle mit Blick auf den See oder die Altstadt. Das hoteleigene Restaurant serviert ausgezeichnete regionale Küche, und unsere gemütliche Hotelbar ist ein beliebter Treffpunkt für Einheimische und Gäste. Business-Reisende schätzen unsere modernen Tagungsräume und die zentrale Lage. Kostenlose Parkplätze und WLAN gehören selbstverständlich zum Service.',
      'field_website' => 'https://www.hotel-post-bruchtal.ch',
      'field_social_media_facebook' => 'https://facebook.com/hotel.post.bruchtal',
      'field_social_media_instagram' => 'https://instagram.com/hotel_post_bruchtal',
      'field_phone' => '+41 44 555 03 20',
      'field_email' => 'info@hotel-post-bruchtal.ch',
      'field_contact_name' => 'Galadriel Goldlicht',
      'field_directory_contact_email' => 'galadriel.goldlicht@hotel-post-bruchtal.ch',
      'field_contact_phone' => '+41 79 456 79 12',
      'field_contact_position' => 'Hoteldirektorin',
      'field_verified' => 1,
      'field_logo' => 75,
      'field_header_image' => 68
    ],
    [
      'title' => 'Café am Marktplatz',
      'field_description' => 'Das Café am Marktplatz ist das Herzstück von Bruchtal und seit 1965 beliebter Treffpunkt für Jung und Alt. In unserem gemütlichen Café mit historischem Ambiente genießen täglich über 200 Gäste hausgemachte Kuchen, aromatischen Kaffee aus eigener Rösterei und kleine Gerichte. Unsere Konditorei ist bekannt für ihre Schwarzwälder Kirschtorte und die saisonalen Spezialitäten. Die sonnige Außenterrasse am belebten Marktplatz lädt zum Verweilen ein. Wir sind stolz darauf, ein Stück Dorfkultur zu bewahren und Begegnungen zu schaffen.',
      'field_website' => 'https://www.cafe-marktplatz-bruchtal.ch',
      'field_social_media_facebook' => 'https://facebook.com/cafe.marktplatz',
      'field_social_media_instagram' => 'https://instagram.com/cafe_marktplatz',
      'field_phone' => '+41 44 555 03 30',
      'field_email' => 'info@cafe-marktplatz-bruchtal.ch',
      'field_contact_name' => 'Samweis Backgammon',
      'field_directory_contact_email' => 'samweis.backgammon@cafe-marktplatz-bruchtal.ch',
      'field_contact_phone' => '+41 79 456 79 13',
      'field_contact_position' => 'Inhaber',
      'field_verified' => 0,
      'field_logo' => 72,
      'field_header_image' => 69
    ],
    [
      'title' => 'Pizzeria Bella Vista',
      'field_description' => 'Die Pizzeria Bella Vista bringt seit 1985 ein Stück Italien nach Bruchtal. In unserem familiengeführten Restaurant erleben Sie authentische italienische Küche mit den besten Zutaten - direkt importiert aus Italien. Unser Steinofen, in dem täglich über 100 Pizzas gebacken werden, ist das Herzstück der Küche. Neben klassischen und kreativen Pizzas bieten wir hausgemachte Pasta, frische Salate und köstliche Dolci. Die Atmosphäre ist entspannt und herzlich - perfekt für Familien und Paare. Unsere Terrasse mit Seeblick ist besonders in den Sommermonaten sehr beliebt.',
      'field_website' => 'https://www.bellavista-bruchtal.ch',
      'field_social_media_facebook' => 'https://facebook.com/bellavista.bruchtal',
      'field_social_media_instagram' => 'https://instagram.com/bellavista_bruchtal',
      'field_phone' => '+41 44 555 03 40',
      'field_email' => 'info@bellavista-bruchtal.ch',
      'field_contact_name' => 'Frodo Tomatosol',
      'field_directory_contact_email' => 'frodo.tomatosol@bellavista-bruchtal.ch',
      'field_contact_phone' => '+41 79 456 79 14',
      'field_contact_position' => 'Geschäftsführer',
      'field_verified' => 1,
      'field_logo' => 73,
      'field_header_image' => 70
    ]
  ]
];

// Function to create nodes
function createDemoNodes($content_type, $nodes_data) {
  foreach ($nodes_data as $node_data) {
    try {
      $node = Node::create([
        'type' => $content_type,
        'title' => $node_data['title'],
        'status' => 1,
        'promote' => 0,
        'sticky' => 0,
        'langcode' => 'de',
        'field_description' => $node_data['field_description'],
        'field_website' => isset($node_data['field_website']) ? $node_data['field_website'] : null,
        'field_social_media_facebook' => isset($node_data['field_social_media_facebook']) ? $node_data['field_social_media_facebook'] : null,
        'field_social_media_instagram' => isset($node_data['field_social_media_instagram']) ? $node_data['field_social_media_instagram'] : null,
        'field_social_media_linkedin' => isset($node_data['field_social_media_linkedin']) ? $node_data['field_social_media_linkedin'] : null,
        'field_phone' => $node_data['field_phone'],
        'field_email' => $node_data['field_email'],
        'field_contact_name' => $node_data['field_contact_name'],
        'field_directory_contact_email' => $node_data['field_directory_contact_email'],
        'field_contact_phone' => $node_data['field_contact_phone'],
        'field_contact_position' => $node_data['field_contact_position'],
        'field_verified' => $node_data['field_verified'],
        'field_logo' => isset($node_data['field_logo']) ? $node_data['field_logo'] : null,
        'field_header_image' => isset($node_data['field_header_image']) ? $node_data['field_header_image'] : null,
      ]);

      $node->save();
      echo "Created node: " . $node_data['title'] . " (ID: " . $node->id() . ")\n";
      
    } catch (Exception $e) {
      echo "Error creating node " . $node_data['title'] . ": " . $e->getMessage() . "\n";
    }
  }
}

// Create demo content for all content types
echo "Creating demo content for Gemeinde Bruchtal...\n\n";

echo "Creating Vereine (Clubs)...\n";
createDemoNodes('club', $demo_data['club']);

echo "\nCreating Firmen (Companies)...\n";
createDemoNodes('company', $demo_data['company']);

echo "\nCreating Gastgewerbe (Hospitality)...\n";
createDemoNodes('hospitality', $demo_data['hospitality']);

echo "\nDemo content creation completed!\n";