<?php
/**
 * Script to create a demo page with all paragraph types - Using field_paragraphs
 */

use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;

// Delete old demo pages if they exist
$old_nodes = [154, 155];
foreach ($old_nodes as $nid) {
  $old_node = Node::load($nid);
  if ($old_node) {
    $old_node->delete();
    echo "Alte Demo-Seite $nid gelöscht.\n";
  }
}

// Create paragraphs array
$paragraphs = [];

// 1. Hero Paragraph
$hero = Paragraph::create([
  'type' => 'hero',
  'field_title' => '🚀 Hero Section - Willkommen zur Demo',
  'field_summary' => 'Dies ist ein Hero-Bereich mit großem Titel und Zusammenfassung. Perfekt für den Seitenstart mit Call-to-Action.',
  'field_link' => [
    'uri' => 'internal:/',
    'title' => 'Jetzt durchstarten →',
  ],
]);
$hero->save();
$paragraphs[] = $hero;

// 2. Text Paragraph
$text = Paragraph::create([
  'type' => 'text',
  'field_title' => '📝 Rich Text Paragraph',
  'field_content' => [
    'value' => '<p class="lead">Dies ist ein <strong>Text-Paragraph</strong> mit formatiertem Inhalt. Er unterstützt verschiedene HTML-Elemente und kann für allgemeine Textinhalte verwendet werden.</p>
    <h3>Überschrift innerhalb des Texts</h3>
    <p>Ein zweiter Absatz mit <em>kursivem Text</em>, <strong>fettem Text</strong> und einem <a href="#">internen Link</a>.</p>
    <ul>
      <li>✓ Aufzählungspunkt mit Icon</li>
      <li>✓ Zweiter wichtiger Punkt</li>
      <li>✓ Dritter Punkt in der Liste</li>
    </ul>
    <blockquote>"Dies ist ein Zitat innerhalb des Text-Paragraphs. Perfekt für Testimonials oder wichtige Aussagen."</blockquote>',
    'format' => 'full_html',
  ],
]);
$text->save();
$paragraphs[] = $text;

// 3. Layout Container with nested content (2 columns)
$nested_text1 = Paragraph::create([
  'type' => 'text',
  'field_title' => '📦 Erste Spalte',
  'field_content' => [
    'value' => '<p>Dies ist die <strong>erste Spalte</strong> eines Layout-Containers. Der Container kann 1-4 Spalten haben und verschiedene Themes verwenden.</p>
    <p>Layout-Container sind ideal für:</p>
    <ul>
      <li>Mehrspaltige Layouts</li>
      <li>Flexible Inhaltsanordnung</li>
      <li>Responsive Grids</li>
    </ul>',
    'format' => 'full_html',
  ],
]);
$nested_text1->save();

$nested_text2 = Paragraph::create([
  'type' => 'text',
  'field_title' => '📦 Zweite Spalte',
  'field_content' => [
    'value' => '<p>Dies ist die <strong>zweite Spalte</strong>. Layout-Container sind sehr flexibel und können verschiedene Abstände und Breiten haben.</p>
    <p>Verfügbare Optionen:</p>
    <ul>
      <li>Themes: Default, Hell, Dunkel</li>
      <li>Spalten: 1-4</li>
      <li>Abstände: Klein bis Extra Groß</li>
    </ul>',
    'format' => 'full_html',
  ],
]);
$nested_text2->save();

$layout_container = Paragraph::create([
  'type' => 'layout_container',
  'field_columns' => '2',
  'field_theme' => 'light',
  'field_top_spacing' => 'medium',
  'field_bottom_spacing' => 'medium',
  'field_width' => 'content-width',
  'field_content_items' => [
    $nested_text1,
    $nested_text2,
  ],
]);
$layout_container->save();
$paragraphs[] = $layout_container;

// 4. Card Group with Cards
$card1 = Paragraph::create([
  'type' => 'card',
  'field_title' => '🎯 Service 1',
  'field_summary' => 'Beschreibung des ersten Services mit wichtigen Informationen und Details. Cards eignen sich perfekt für Feature-Listen.',
  'field_link' => [
    'uri' => 'internal:/',
    'title' => 'Mehr erfahren',
  ],
]);
$card1->save();

$card2 = Paragraph::create([
  'type' => 'card',
  'field_title' => '💡 Service 2',
  'field_summary' => 'Zweiter Service mit unterschiedlichen Features und Vorteilen. Jede Card kann ein eigenes Icon und Link haben.',
  'field_link' => [
    'uri' => 'internal:/',
    'title' => 'Details ansehen',
  ],
]);
$card2->save();

$card3 = Paragraph::create([
  'type' => 'card',
  'field_title' => '🚀 Service 3',
  'field_summary' => 'Dritter Service vervollständigt unser Angebot. Cards werden automatisch in einem responsiven Grid angeordnet.',
  'field_link' => [
    'uri' => 'internal:/',
    'title' => 'Jetzt starten',
  ],
]);
$card3->save();

$card_group = Paragraph::create([
  'type' => 'card_group',
  'field_title' => '🎴 Card Group - Unsere Services',
  'field_cards' => [
    $card1,
    $card2,
    $card3,
  ],
]);
$card_group->save();
$paragraphs[] = $card_group;

// 5. Accordion
$acc_item1 = Paragraph::create([
  'type' => 'accordion_item',
  'field_title' => 'Was ist ein Accordion?',
  'field_content' => [
    'value' => '<p>Ein Accordion ist ein UI-Element, das es ermöglicht, Inhalte platzsparend zu organisieren. Nutzer können einzelne Bereiche auf- und zuklappen.</p>
    <p>Vorteile von Accordions:</p>
    <ul>
      <li>Platzsparende Darstellung</li>
      <li>Übersichtliche Struktur</li>
      <li>Interaktive Benutzererfahrung</li>
    </ul>',
    'format' => 'full_html',
  ],
]);
$acc_item1->save();

$acc_item2 = Paragraph::create([
  'type' => 'accordion_item',
  'field_title' => 'Wann sollte man Accordions verwenden?',
  'field_content' => [
    'value' => '<p>Accordions eignen sich besonders für:</p>
    <ul>
      <li><strong>FAQs</strong> - Häufig gestellte Fragen</li>
      <li><strong>Produktdetails</strong> - Technische Spezifikationen</li>
      <li><strong>Prozessbeschreibungen</strong> - Schritt-für-Schritt Anleitungen</li>
    </ul>',
    'format' => 'full_html',
  ],
]);
$acc_item2->save();

$acc_item3 = Paragraph::create([
  'type' => 'accordion_item',
  'field_title' => 'Sind Accordions mobilfreundlich?',
  'field_content' => [
    'value' => '<p><strong>Ja, absolut!</strong> Accordions sind besonders auf mobilen Geräten nützlich, da sie:</p>
    <ul>
      <li>Viel Inhalt auf wenig Raum unterbringen</li>
      <li>Touch-optimiert sind</li>
      <li>Die Scrolltiefe reduzieren</li>
    </ul>',
    'format' => 'full_html',
  ],
]);
$acc_item3->save();

$accordion = Paragraph::create([
  'type' => 'accordion',
  'field_title' => '❓ Häufig gestellte Fragen (Accordion)',
  'field_accordion_items' => [
    $acc_item1,
    $acc_item2,
    $acc_item3,
  ],
]);
$accordion->save();
$paragraphs[] = $accordion;

// 6. Gallery
$gallery = Paragraph::create([
  'type' => 'gallery',
  'field_title' => '🖼️ Bildergalerie',
  'field_summary' => 'Eine responsive Bildergalerie mit Lightbox-Funktion. Bilder werden in einem ansprechenden Grid dargestellt.',
]);
$gallery->save();
$paragraphs[] = $gallery;

// 7. Side by Side
$sidebyside = Paragraph::create([
  'type' => 'sidebyside',
  'field_title' => '↔️ Seite-an-Seite Layout',
  'field_summary' => 'Perfekt für Bild-Text-Kombinationen oder Vergleiche. Inhalt wird in zwei Spalten nebeneinander dargestellt.',
  'field_content' => [
    'value' => '<p>Dieser Paragraph-Typ ermöglicht es, Inhalte nebeneinander darzustellen. Ideal für:</p>
    <ul>
      <li>Produktpräsentationen mit Bild und Text</li>
      <li>Vorher-Nachher Vergleiche</li>
      <li>Feature-Highlights mit Visualisierung</li>
    </ul>',
    'format' => 'full_html',
  ],
]);
$sidebyside->save();
$paragraphs[] = $sidebyside;

// 8. Newsletter
$newsletter = Paragraph::create([
  'type' => 'newsletter',
  'field_title' => '📧 Newsletter-Anmeldung',
  'field_summary' => 'Bleiben Sie auf dem Laufenden mit unserem Newsletter. Erhalten Sie die neuesten Updates, Angebote und Neuigkeiten direkt in Ihr Postfach.',
]);
$newsletter->save();
$paragraphs[] = $newsletter;

// 9. Stats
$stats = Paragraph::create([
  'type' => 'stats_item',
  'field_title' => '📊 Beeindruckende Zahlen',
  'field_value' => '12.345+',
  'field_summary' => 'Zufriedene Kunden weltweit',
]);
$stats->save();
$paragraphs[] = $stats;

// 10. Download Section
$dl_item1 = Paragraph::create([
  'type' => 'download_item',
  'field_title' => '📑 Produktbroschüre 2024',
  'field_summary' => 'PDF Dokument, 2.5 MB - Alle Produkte im Überblick',
]);
$dl_item1->save();

$dl_item2 = Paragraph::create([
  'type' => 'download_item',
  'field_title' => '📊 Preisliste Q1 2024',
  'field_summary' => 'Excel Datei, 156 KB - Aktuelle Preise und Konditionen',
]);
$dl_item2->save();

$dl_item3 = Paragraph::create([
  'type' => 'download_item',
  'field_title' => '📋 AGB & Datenschutz',
  'field_summary' => 'PDF Dokument, 890 KB - Rechtliche Informationen',
]);
$dl_item3->save();

$download = Paragraph::create([
  'type' => 'download',
  'field_title' => '⬇️ Download-Bereich',
  'field_download_items' => [
    $dl_item1,
    $dl_item2,
    $dl_item3,
  ],
]);
$download->save();
$paragraphs[] = $download;

// 11. Pricing
$price1 = Paragraph::create([
  'type' => 'pricing_card',
  'field_title' => '🥉 Starter',
  'field_price' => 'CHF 29',
  'field_summary' => 'Pro Monat - Ideal für Einsteiger',
]);
$price1->save();

$price2 = Paragraph::create([
  'type' => 'pricing_card',
  'field_title' => '🥈 Professional',
  'field_price' => 'CHF 79',
  'field_summary' => 'Pro Monat - Für wachsende Unternehmen',
]);
$price2->save();

$price3 = Paragraph::create([
  'type' => 'pricing_card',
  'field_title' => '🥇 Enterprise',
  'field_price' => 'CHF 199',
  'field_summary' => 'Pro Monat - Maximale Features',
]);
$price3->save();

$pricing = Paragraph::create([
  'type' => 'pricing',
  'field_title' => '💰 Unsere Preispläne',
  'field_pricing_cards' => [
    $price1,
    $price2,
    $price3,
  ],
]);
$pricing->save();
$paragraphs[] = $pricing;

// 12. Carousel
$carousel_item1 = Paragraph::create([
  'type' => 'carousel_item',
  'field_title' => '🎠 Slide 1 - Willkommen',
  'field_summary' => 'Erstes Element im Karussell mit wichtigen Informationen und einem ansprechenden Design.',
]);
$carousel_item1->save();

$carousel_item2 = Paragraph::create([
  'type' => 'carousel_item',
  'field_title' => '🎡 Slide 2 - Features',
  'field_summary' => 'Zweites Element präsentiert die wichtigsten Features und Vorteile unserer Lösung.',
]);
$carousel_item2->save();

$carousel_item3 = Paragraph::create([
  'type' => 'carousel_item',
  'field_title' => '🎢 Slide 3 - Call to Action',
  'field_summary' => 'Drittes Element mit einem starken Call-to-Action für die Conversion.',
]);
$carousel_item3->save();

$carousel = Paragraph::create([
  'type' => 'carousel',
  'field_title' => '🎪 Karussell / Slider',
  'field_carousel_items' => [
    $carousel_item1,
    $carousel_item2,
    $carousel_item3,
  ],
]);
$carousel->save();
$paragraphs[] = $carousel;

// 13. Logo Collection
$logo_collection = Paragraph::create([
  'type' => 'logo_collection',
  'field_title' => '🤝 Unsere Partner & Kunden',
  'field_summary' => 'Vertrauenswürdige Partner und zufriedene Kunden, die auf unsere Lösungen setzen.',
]);
$logo_collection->save();
$paragraphs[] = $logo_collection;

// 14. Embed
$embed = Paragraph::create([
  'type' => 'embed',
  'field_title' => '🎥 Video / Embed Beispiel',
  'field_embed_code' => '<div style="padding:56.25% 0 0 0;position:relative;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);border-radius:8px;">
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:white;">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      <p style="margin-top:10px;font-family:sans-serif;">Video-Platzhalter</p>
      <p style="font-size:12px;opacity:0.8;font-family:sans-serif;">Hier könnte Ihr YouTube/Vimeo Video sein</p>
    </div>
  </div>',
]);
$embed->save();
$paragraphs[] = $embed;

// 15. Webform Embed
$webform_embed = Paragraph::create([
  'type' => 'webform_embed',
  'field_title' => '📝 Kontaktformular (Webform)',
]);
$webform_embed->save();
$paragraphs[] = $webform_embed;

// Create the node - Try both field names to ensure compatibility
$node = Node::create([
  'type' => 'page',
  'title' => '🎨 Paragraph Demo - Alle Komponenten',
  'status' => 1,
  'uid' => 1,
]);

// Prepare field values
$field_values = [];
foreach ($paragraphs as $paragraph) {
  $field_values[] = [
    'target_id' => $paragraph->id(),
    'target_revision_id' => $paragraph->getRevisionId(),
  ];
}

// Try to set field_paragraphs first (seems to be the active one)
try {
  $node->set('field_paragraphs', $field_values);
  echo "✅ Using field_paragraphs\n";
} catch (\Exception $e) {
  // If that fails, try field_content
  try {
    $node->set('field_content', $field_values);
    echo "✅ Using field_content\n";
  } catch (\Exception $e2) {
    echo "⚠️  Warning: Could not set paragraph field - " . $e2->getMessage() . "\n";
  }
}

$node->save();

echo "\n";
echo "═══════════════════════════════════════════\n";
echo "✅ Demo-Seite erfolgreich erstellt!\n";
echo "═══════════════════════════════════════════\n";
echo "📄 Node ID: " . $node->id() . "\n";
echo "🔗 URL: /node/" . $node->id() . "\n";
echo "🌐 Direktlink: https://zh-demo.ddev.site/node/" . $node->id() . "\n";
echo "📝 Anzahl Paragraphs: " . count($paragraphs) . "\n";
echo "═══════════════════════════════════════════\n";
echo "\nEnthaltene Paragraph-Typen:\n";
echo "───────────────────────────────────────────\n";
$i = 1;
foreach ($paragraphs as $p) {
  $bundle = $p->bundle();
  $title = $p->hasField('field_title') && !empty($p->get('field_title')->value) 
    ? ' - ' . $p->get('field_title')->value 
    : '';
  echo sprintf("%2d. %-20s %s\n", $i++, $bundle, $title);
}
echo "═══════════════════════════════════════════\n";