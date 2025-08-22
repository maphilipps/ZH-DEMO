<?php
/**
 * Script to create a demo page with all paragraph types - Fixed version
 */

use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;

// Delete old demo page if exists
$old_node = Node::load(154);
if ($old_node) {
  $old_node->delete();
  echo "Alte Demo-Seite gelöscht.\n";
}

// Create paragraphs array
$paragraphs = [];

// 1. Hero Paragraph
$hero = Paragraph::create([
  'type' => 'hero',
  'field_title' => 'Hero Section - Willkommen zur Demo',
  'field_summary' => 'Dies ist ein Hero-Bereich mit großem Titel und Zusammenfassung. Perfekt für den Seitenstart.',
  'field_link' => [
    'uri' => 'internal:/',
    'title' => 'Mehr erfahren',
  ],
]);
$hero->save();
$paragraphs[] = $hero;

// 2. Text Paragraph
$text = Paragraph::create([
  'type' => 'text',
  'field_title' => 'Text Paragraph Demo',
  'field_content' => [
    'value' => '<p>Dies ist ein <strong>Text-Paragraph</strong> mit formatiertem Inhalt. Er unterstützt verschiedene HTML-Elemente und kann für allgemeine Textinhalte verwendet werden.</p><p>Ein zweiter Absatz mit <em>kursivem Text</em> und einem <a href="#">Link</a>.</p><ul><li>Aufzählungspunkt 1</li><li>Aufzählungspunkt 2</li><li>Aufzählungspunkt 3</li></ul>',
    'format' => 'full_html',
  ],
]);
$text->save();
$paragraphs[] = $text;

// 3. Layout Container with nested content
$nested_text1 = Paragraph::create([
  'type' => 'text',
  'field_title' => 'Erste Spalte',
  'field_content' => [
    'value' => '<p>Dies ist die <strong>erste Spalte</strong> eines Layout-Containers. Der Container kann 1-4 Spalten haben und verschiedene Themes verwenden.</p>',
    'format' => 'full_html',
  ],
]);
$nested_text1->save();

$nested_text2 = Paragraph::create([
  'type' => 'text',
  'field_title' => 'Zweite Spalte',
  'field_content' => [
    'value' => '<p>Dies ist die <strong>zweite Spalte</strong>. Layout-Container sind sehr flexibel und können verschiedene Abstände und Breiten haben.</p>',
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
  'field_title' => 'Service 1',
  'field_summary' => 'Beschreibung des ersten Services mit wichtigen Informationen und Details.',
  'field_link' => [
    'uri' => 'internal:/',
    'title' => 'Mehr erfahren',
  ],
]);
$card1->save();

$card2 = Paragraph::create([
  'type' => 'card',
  'field_title' => 'Service 2',
  'field_summary' => 'Zweiter Service mit unterschiedlichen Features und Vorteilen.',
  'field_link' => [
    'uri' => 'internal:/',
    'title' => 'Details ansehen',
  ],
]);
$card2->save();

$card3 = Paragraph::create([
  'type' => 'card',
  'field_title' => 'Service 3',
  'field_summary' => 'Dritter Service vervollständigt unser Angebot.',
  'field_link' => [
    'uri' => 'internal:/',
    'title' => 'Jetzt starten',
  ],
]);
$card3->save();

$card_group = Paragraph::create([
  'type' => 'card_group',
  'field_title' => 'Unsere Services',
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
    'value' => '<p>Ein Accordion ist ein UI-Element, das es ermöglicht, Inhalte platzsparend zu organisieren. Nutzer können einzelne Bereiche auf- und zuklappen.</p>',
    'format' => 'full_html',
  ],
]);
$acc_item1->save();

$acc_item2 = Paragraph::create([
  'type' => 'accordion_item',
  'field_title' => 'Wann sollte man Accordions verwenden?',
  'field_content' => [
    'value' => '<p>Accordions eignen sich besonders für FAQs, Produktdetails oder wenn viele Informationen strukturiert dargestellt werden sollen, ohne die Seite zu überladen.</p>',
    'format' => 'full_html',
  ],
]);
$acc_item2->save();

$acc_item3 = Paragraph::create([
  'type' => 'accordion_item',
  'field_title' => 'Sind Accordions mobilfreundlich?',
  'field_content' => [
    'value' => '<p>Ja! Accordions sind besonders auf mobilen Geräten nützlich, da sie viel Inhalt auf wenig Raum unterbringen.</p>',
    'format' => 'full_html',
  ],
]);
$acc_item3->save();

$accordion = Paragraph::create([
  'type' => 'accordion',
  'field_title' => 'Häufig gestellte Fragen',
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
  'field_title' => 'Bildergalerie',
  'field_summary' => 'Eine responsive Bildergalerie mit Lightbox-Funktion.',
]);
$gallery->save();
$paragraphs[] = $gallery;

// 7. Side by Side
$sidebyside = Paragraph::create([
  'type' => 'sidebyside',
  'field_title' => 'Seite-an-Seite Layout',
  'field_summary' => 'Perfekt für Bild-Text-Kombinationen oder Vergleiche.',
  'field_content' => [
    'value' => '<p>Dieser Paragraph-Typ ermöglicht es, Inhalte nebeneinander darzustellen. Ideal für Produktpräsentationen oder Features.</p>',
    'format' => 'full_html',
  ],
]);
$sidebyside->save();
$paragraphs[] = $sidebyside;

// 8. Newsletter
$newsletter = Paragraph::create([
  'type' => 'newsletter',
  'field_title' => 'Newsletter-Anmeldung',
  'field_summary' => 'Bleiben Sie auf dem Laufenden mit unserem Newsletter. Erhalten Sie die neuesten Updates direkt in Ihr Postfach.',
]);
$newsletter->save();
$paragraphs[] = $newsletter;

// 9. Stats
$stats = Paragraph::create([
  'type' => 'stats_item',
  'field_title' => 'Beeindruckende Zahlen',
  'field_value' => '1.234',
  'field_summary' => 'Zufriedene Kunden',
]);
$stats->save();
$paragraphs[] = $stats;

// 10. Download Section
$dl_item1 = Paragraph::create([
  'type' => 'download_item',
  'field_title' => 'Produktbroschüre',
  'field_summary' => 'PDF, 2.5 MB',
]);
$dl_item1->save();

$dl_item2 = Paragraph::create([
  'type' => 'download_item',
  'field_title' => 'Preisliste 2024',
  'field_summary' => 'Excel, 156 KB',
]);
$dl_item2->save();

$download = Paragraph::create([
  'type' => 'download',
  'field_title' => 'Downloads',
  'field_download_items' => [
    $dl_item1,
    $dl_item2,
  ],
]);
$download->save();
$paragraphs[] = $download;

// 11. Pricing
$price1 = Paragraph::create([
  'type' => 'pricing_card',
  'field_title' => 'Starter',
  'field_price' => 'CHF 29',
  'field_summary' => 'Pro Monat',
]);
$price1->save();

$price2 = Paragraph::create([
  'type' => 'pricing_card',
  'field_title' => 'Professional',
  'field_price' => 'CHF 79',
  'field_summary' => 'Pro Monat',
]);
$price2->save();

$price3 = Paragraph::create([
  'type' => 'pricing_card',
  'field_title' => 'Enterprise',
  'field_price' => 'CHF 199',
  'field_summary' => 'Pro Monat',
]);
$price3->save();

$pricing = Paragraph::create([
  'type' => 'pricing',
  'field_title' => 'Unsere Preispläne',
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
  'field_title' => 'Slide 1',
  'field_summary' => 'Erstes Element im Karussell mit wichtigen Informationen.',
]);
$carousel_item1->save();

$carousel_item2 = Paragraph::create([
  'type' => 'carousel_item',
  'field_title' => 'Slide 2',
  'field_summary' => 'Zweites Element mit weiteren Details.',
]);
$carousel_item2->save();

$carousel_item3 = Paragraph::create([
  'type' => 'carousel_item',
  'field_title' => 'Slide 3',
  'field_summary' => 'Drittes Element vervollständigt die Präsentation.',
]);
$carousel_item3->save();

$carousel = Paragraph::create([
  'type' => 'carousel',
  'field_title' => 'Karussell / Slider',
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
  'field_title' => 'Unsere Partner',
  'field_summary' => 'Vertrauenswürdige Partner und Sponsoren.',
]);
$logo_collection->save();
$paragraphs[] = $logo_collection;

// 14. Embed
$embed = Paragraph::create([
  'type' => 'embed',
  'field_title' => 'Video-Einbettung',
  'field_embed_code' => '<div style="padding:56.25% 0 0 0;position:relative;background:#f0f0f0;"><p style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">Video-Platzhalter</p></div>',
]);
$embed->save();
$paragraphs[] = $embed;

// 15. Webform Embed
$webform_embed = Paragraph::create([
  'type' => 'webform_embed',
  'field_title' => 'Kontaktformular',
]);
$webform_embed->save();
$paragraphs[] = $webform_embed;

// Create the node with all paragraphs
$node = Node::create([
  'type' => 'page',
  'title' => 'Paragraph Demo - Alle Komponenten',
  'status' => 1,
  'uid' => 1,
]);

// Add all paragraphs to field_content
$field_values = [];
foreach ($paragraphs as $paragraph) {
  $field_values[] = [
    'target_id' => $paragraph->id(),
    'target_revision_id' => $paragraph->getRevisionId(),
  ];
}

$node->set('field_content', $field_values);
$node->save();

echo "✅ Demo-Seite erfolgreich erstellt!\n";
echo "📄 Node ID: " . $node->id() . "\n";
echo "🔗 URL: /node/" . $node->id() . "\n";
echo "📝 Anzahl Paragraphs: " . count($paragraphs) . "\n\n";
echo "Enthaltene Paragraph-Typen:\n";
foreach ($paragraphs as $p) {
  echo "  - " . $p->bundle() . "\n";
}