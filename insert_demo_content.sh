#!/bin/bash

# Script to create demo content for Bruchtal directory

# Create Vereine (Clubs)
echo "Creating Vereine (Clubs)..."

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node club --validate=0 <<EOF
Reitverein Bruchtal e.V.
Der Reitverein Bruchtal e.V. wurde 1952 gegründet und ist einer der traditionsreichsten Reitvereine am Zürichsee. Mit über 120 Mitgliedern bieten wir Reitunterricht für alle Altersgruppen, von der Ponyschule bis zum Dressur- und Springsport.
https://www.reitverein-bruchtal.ch
https://facebook.com/reitverein.bruchtal
https://instagram.com/reitverein_bruchtal

+41 44 555 01 20
info@reitverein-bruchtal.ch
Theoden Eckhart
theoden.eckhart@reitverein-bruchtal.ch
+41 79 456 78 90
Vereinspräsident
1
72
62
EOF

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node club --validate=0 <<EOF
Segelclub Bruchtal
Der Segelclub Bruchtal liegt traumhaft am Zürichsee und bietet seit 1963 optimale Bedingungen für den Segelsport. Mit 85 Mitgliedern sind wir ein familiärer Verein, der sowohl Anfänger als auch ambitionierte Regattasegler willkommen heißt.
https://www.segelclub-bruchtal.ch
https://facebook.com/segelclub.bruchtal
https://instagram.com/segelclub_bruchtal

+41 44 555 01 30
info@segelclub-bruchtal.ch
Arwen Seewind
arwen.seewind@segelclub-bruchtal.ch
+41 79 456 78 91
Commodore
1
73
60
EOF

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node club --validate=0 <<EOF
Musikverein Bruchtal
Der Musikverein Bruchtal wurde 1885 gegründet und ist stolz auf seine lange Tradition. Mit 45 aktiven Musikanten gestalten wir das kulturelle Leben der Gemeinde mit. Von traditioneller Blasmusik über moderne Arrangements - unser Repertoire ist vielfältig.
https://www.musikverein-bruchtal.ch
https://facebook.com/musikverein.bruchtal

+41 44 555 01 40
info@musikverein-bruchtal.ch
Legolas Silberhorn
legolas.silberhorn@musikverein-bruchtal.ch
+41 79 456 78 92
Dirigent
0
74
65
EOF

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node club --validate=0 <<EOF
Turnverein Bruchtal
Sport, Spiel und Spaß für die ganze Familie - das ist der Turnverein Bruchtal! Seit 1923 fördern wir die Gesundheit und Fitness unserer über 150 Mitglieder. Unser vielfältiges Angebot umfasst Geräteturnen, Leichtathletik, Volleyball, Aerobic und Seniorenturnen.
https://www.turnverein-bruchtal.ch
https://facebook.com/tv.bruchtal
https://instagram.com/tv_bruchtal
+41 44 555 01 50
info@turnverein-bruchtal.ch
Gimli Kraftstein
gimli.kraftstein@turnverein-bruchtal.ch
+41 79 456 78 93
Vereinspräsident
1
75
63
EOF

echo "Vereine created successfully!"

# Create Firmen (Companies)
echo "Creating Firmen (Companies)..."

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node company --validate=0 <<EOF
Schreinerei am See AG
Die Schreinerei am See AG ist seit 1967 Ihr zuverlässiger Partner für individuelle Holzlösungen in Bruchtal und Umgebung. Als traditioneller Familienbetrieb verbinden wir handwerkliches Können mit modernster Technik.
https://www.schreinerei-am-see.ch
https://facebook.com/schreinerei.amsee

https://linkedin.com/company/schreinerei-am-see
+41 44 555 02 10
info@schreinerei-am-see.ch
Balin Eichenmeister
balin.eichenmeister@schreinerei-am-see.ch
+41 79 456 79 01
Geschäftsführer
1
68
66
EOF

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node company --validate=0 <<EOF
IT Solutions Bruchtal GmbH
IT Solutions Bruchtal ist Ihr kompetenter Partner für alle IT-Bedürfnisse am Zürichsee. Seit 2010 entwickeln wir maßgeschneiderte Software-Lösungen für KMU und Gemeinden.
https://www.it-solutions-bruchtal.ch


https://linkedin.com/company/it-solutions-bruchtal
+41 44 555 02 20
info@it-solutions-bruchtal.ch
Gandalf Graubart
gandalf.graubart@it-solutions-bruchtal.ch
+41 79 456 79 02
CTO
1
69
67
EOF

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node company --validate=0 <<EOF
Bauunternehmen Müller AG
Das Bauunternehmen Müller AG blickt auf über 80 Jahre Bauerfahrung zurück und ist einer der führenden Bauunternehmer in der Region Zürichsee. Mit 35 qualifizierten Mitarbeitern realisieren wir Projekte vom Einfamilienhaus bis zum komplexen Gewerbebau.
https://www.baumueller-bruchtal.ch


https://linkedin.com/company/baumueller-bruchtal
+41 44 555 02 30
info@baumueller-bruchtal.ch
Thorin Steinbrecher
thorin.steinbrecher@baumueller-bruchtal.ch
+41 79 456 79 03
Geschäftsführer
0
70
64
EOF

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node company --validate=0 <<EOF
Elektro Meier GmbH
Elektro Meier ist seit 1975 der Elektrofachbetrieb des Vertrauens in Bruchtal. Unser Team von 15 erfahrenen Elektrikern sorgt für sichere und effiziente Elektroinstallationen in Wohn- und Gewerbebauten.
https://www.elektro-meier-bruchtal.ch
https://facebook.com/elektro.meier.bruchtal

+41 44 555 02 40
info@elektro-meier-bruchtal.ch
Boromir Blitzhand
boromir.blitzhand@elektro-meier-bruchtal.ch
+41 79 456 79 04
Betriebsleiter
1
71
61
EOF

echo "Firmen created successfully!"

# Create Gastgewerbe (Hospitality)
echo "Creating Gastgewerbe (Hospitality)..."

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node hospitality --validate=0 <<EOF
Restaurant Seeblick
Das Restaurant Seeblick besticht durch seine einzigartige Lage direkt am Zürichsee und bietet seinen Gästen einen traumhaften Panoramablick. Seit 1978 verwöhnt Familie Sommer ihre Gäste mit regionaler Küche und frischen Seefischen.
https://www.restaurant-seeblick.ch
https://facebook.com/restaurant.seeblick
https://instagram.com/restaurant_seeblick

+41 44 555 03 10
info@restaurant-seeblick.ch
Elrond Seeherr
elrond.seeherr@restaurant-seeblick.ch
+41 79 456 79 11
Geschäftsführer
1
74
76
EOF

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node hospitality --validate=0 <<EOF
Hotel Post Bruchtal
Das traditionsreiche Hotel Post liegt im Herzen von Bruchtal und empfängt seit 1892 Gäste aus aller Welt. Unser charmantes 3-Sterne-Hotel verfügt über 28 liebevoll eingerichtete Zimmer, alle mit Blick auf den See oder die Altstadt.
https://www.hotel-post-bruchtal.ch
https://facebook.com/hotel.post.bruchtal
https://instagram.com/hotel_post_bruchtal

+41 44 555 03 20
info@hotel-post-bruchtal.ch
Galadriel Goldlicht
galadriel.goldlicht@hotel-post-bruchtal.ch
+41 79 456 79 12
Hoteldirektorin
1
75
68
EOF

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node hospitality --validate=0 <<EOF
Café am Marktplatz
Das Café am Marktplatz ist das Herzstück von Bruchtal und seit 1965 beliebter Treffpunkt für Jung und Alt. In unserem gemütlichen Café mit historischem Ambiente genießen täglich über 200 Gäste hausgemachte Kuchen.
https://www.cafe-marktplatz-bruchtal.ch
https://facebook.com/cafe.marktplatz
https://instagram.com/cafe_marktplatz

+41 44 555 03 30
info@cafe-marktplatz-bruchtal.ch
Samweis Backgammon
samweis.backgammon@cafe-marktplatz-bruchtal.ch
+41 79 456 79 13
Inhaber
0
72
69
EOF

ddev drush --uri=bruchtal.zh-demo.ddev.site entity:create node hospitality --validate=0 <<EOF
Pizzeria Bella Vista
Die Pizzeria Bella Vista bringt seit 1985 ein Stück Italien nach Bruchtal. In unserem familiengeführten Restaurant erleben Sie authentische italienische Küche mit den besten Zutaten - direkt importiert aus Italien.
https://www.bellavista-bruchtal.ch
https://facebook.com/bellavista.bruchtal
https://instagram.com/bellavista_bruchtal

+41 44 555 03 40
info@bellavista-bruchtal.ch
Frodo Tomatosol
frodo.tomatosol@bellavista-bruchtal.ch
+41 79 456 79 14
Geschäftsführer
1
73
70
EOF

echo "Gastgewerbe created successfully!"

echo "All demo content has been created for Gemeinde Bruchtal!"