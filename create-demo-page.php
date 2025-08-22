<?php
/**
 * Script to create a demo page with all paragraph types
 */

use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\media\Entity\Media;
use Drupal\file\Entity\File;

// Text Paragraph
$text_paragraph = Paragraph::create([
  'type' => 'text',
  'field_title' => 'Text Paragraph Demo',
  'field_content' => [
    'value' => '<p>Dies ist ein <strong>Text-Paragraph</strong> mit formatiertem Inhalt. Er unterstützt verschiedene HTML-Elemente und kann für allgemeine Textinhalte verwendet werden.</p><p>Ein zweiter Absatz mit <em>kursivem Text</em> und einem <a href="#">Link</a>.</p>',
    'format' => 'full_html',
  ],
]);
$text_paragraph->save();

// Hero Paragraph
$hero_paragraph = Paragraph::create([
  'type' => 'hero',
  'field_title' => 'Hero Section Demo',
  'field_summary' => 'Dies ist ein Hero-Bereich mit großem Titel und Zusammenfassung. Perfekt für den Seitenstart.',
  'field_link' => [
    'uri' => 'https://example.com',
    'title' => 'Mehr erfahren',
  ],
]);
$hero_paragraph->save();

// Accordion with Items
$accordion_item1 = Paragraph::create([
  'type' => 'accordion_item',
  'field_title' => 'Erste Akkordeon-Frage',
  'field_content' => [
    'value' => '<p>Dies ist die Antwort auf die erste Frage im Akkordeon.</p>',
    'format' => 'full_html',
  ],
]);
$accordion_item1->save();

$accordion_item2 = Paragraph::create([
  'type' => 'accordion_item',
  'field_title' => 'Zweite Akkordeon-Frage',
  'field_content' => [
    'value' => '<p>Hier ist die Antwort auf die zweite Frage mit mehr Details.</p>',
    'format' => 'full_html',
  ],
]);
$accordion_item2->save();

$accordion_paragraph = Paragraph::create([
  'type' => 'accordion',
  'field_title' => 'Häufig gestellte Fragen',
  'field_accordion_items' => [
    ['target_id' => $accordion_item1->id(), 'target_revision_id' => $accordion_item1->getRevisionId()],
    ['target_id' => $accordion_item2->id(), 'target_revision_id' => $accordion_item2->getRevisionId()],
  ],
]);
$accordion_paragraph->save();

// Card Group with Cards
$card1 = Paragraph::create([
  'type' => 'card',
  'field_title' => 'Erste Karte',
  'field_summary' => 'Beschreibung der ersten Karte mit wichtigen Informationen.',
  'field_link' => [
    'uri' => 'https://example.com/card1',
    'title' => 'Weiterlesen',
  ],
]);
$card1->save();

$card2 = Paragraph::create([
  'type' => 'card',
  'field_title' => 'Zweite Karte',
  'field_summary' => 'Eine weitere Karte mit unterschiedlichem Inhalt.',
  'field_link' => [
    'uri' => 'https://example.com/card2',
    'title' => 'Mehr Info',
  ],
]);
$card2->save();

$card3 = Paragraph::create([
  'type' => 'card',
  'field_title' => 'Dritte Karte',
  'field_summary' => 'Die dritte Karte vervollständigt das Set.',
  'field_link' => [
    'uri' => 'https://example.com/card3',
    'title' => 'Entdecken',
  ],
]);
$card3->save();

$card_group = Paragraph::create([
  'type' => 'card_group',
  'field_title' => 'Karten-Gruppe Demo',
  'field_cards' => [
    ['target_id' => $card1->id(), 'target_revision_id' => $card1->getRevisionId()],
    ['target_id' => $card2->id(), 'target_revision_id' => $card2->getRevisionId()],
    ['target_id' => $card3->id(), 'target_revision_id' => $card3->getRevisionId()],
  ],
]);
$card_group->save();

// Carousel with Items
$carousel_item1 = Paragraph::create([
  'type' => 'carousel_item',
  'field_title' => 'Erstes Karussell-Element',
  'field_summary' => 'Beschreibung des ersten Elements im Karussell.',
]);
$carousel_item1->save();

$carousel_item2 = Paragraph::create([
  'type' => 'carousel_item',
  'field_title' => 'Zweites Karussell-Element',
  'field_summary' => 'Ein weiteres Element mit interessantem Inhalt.',
]);
$carousel_item2->save();

$carousel = Paragraph::create([
  'type' => 'carousel',
  'field_title' => 'Karussell Demo',
  'field_carousel_items' => [
    ['target_id' => $carousel_item1->id(), 'target_revision_id' => $carousel_item1->getRevisionId()],
    ['target_id' => $carousel_item2->id(), 'target_revision_id' => $carousel_item2->getRevisionId()],
  ],
]);
$carousel->save();

// Download Section
$download_item1 = Paragraph::create([
  'type' => 'download_item',
  'field_title' => 'Dokument 1',
  'field_summary' => 'PDF-Dokument zum Herunterladen',
]);
$download_item1->save();

$download_item2 = Paragraph::create([
  'type' => 'download_item',
  'field_title' => 'Dokument 2',
  'field_summary' => 'Excel-Tabelle mit Daten',
]);
$download_item2->save();

$download = Paragraph::create([
  'type' => 'download',
  'field_title' => 'Download-Bereich',
  'field_download_items' => [
    ['target_id' => $download_item1->id(), 'target_revision_id' => $download_item1->getRevisionId()],
    ['target_id' => $download_item2->id(), 'target_revision_id' => $download_item2->getRevisionId()],
  ],
]);
$download->save();

// Gallery
$gallery = Paragraph::create([
  'type' => 'gallery',
  'field_title' => 'Bildergalerie Demo',
  'field_summary' => 'Eine Sammlung von Bildern in einer ansprechenden Galerie.',
]);
$gallery->save();

// Logo Collection
$logo_collection = Paragraph::create([
  'type' => 'logo_collection',
  'field_title' => 'Partner & Sponsoren',
  'field_summary' => 'Unsere Partner und Sponsoren im Überblick.',
]);
$logo_collection->save();

// Newsletter
$newsletter = Paragraph::create([
  'type' => 'newsletter',
  'field_title' => 'Newsletter-Anmeldung',
  'field_summary' => 'Bleiben Sie auf dem Laufenden mit unserem Newsletter.',
]);
$newsletter->save();

// Pricing Section
$pricing_card1 = Paragraph::create([
  'type' => 'pricing_card',
  'field_title' => 'Basis-Paket',
  'field_price' => 'CHF 29/Monat',
  'field_summary' => 'Perfekt für den Einstieg',
]);
$pricing_card1->save();

$pricing_card2 = Paragraph::create([
  'type' => 'pricing_card',
  'field_title' => 'Premium-Paket',
  'field_price' => 'CHF 79/Monat',
  'field_summary' => 'Für professionelle Anforderungen',
]);
$pricing_card2->save();

$pricing = Paragraph::create([
  'type' => 'pricing',
  'field_title' => 'Unsere Preise',
  'field_pricing_cards' => [
    ['target_id' => $pricing_card1->id(), 'target_revision_id' => $pricing_card1->getRevisionId()],
    ['target_id' => $pricing_card2->id(), 'target_revision_id' => $pricing_card2->getRevisionId()],
  ],
]);
$pricing->save();

// Side by Side
$sidebyside = Paragraph::create([
  'type' => 'sidebyside',
  'field_title' => 'Seite-an-Seite Layout',
  'field_summary' => 'Inhalt wird nebeneinander dargestellt für bessere Vergleichbarkeit.',
  'field_content' => [
    'value' => '<p>Zusätzlicher Inhalt für die Seite-an-Seite Darstellung.</p>',
    'format' => 'full_html',
  ],
]);
$sidebyside->save();

// Slider with Items
$slider_item1 = Paragraph::create([
  'type' => 'slider_item',
  'field_title' => 'Slide 1',
  'field_summary' => 'Erster Slide mit wichtigen Informationen',
]);
$slider_item1->save();

$slider_item2 = Paragraph::create([
  'type' => 'slider_item',
  'field_title' => 'Slide 2',
  'field_summary' => 'Zweiter Slide mit weiteren Details',
]);
$slider_item2->save();

$slider = Paragraph::create([
  'type' => 'slider',
  'field_title' => 'Slider Demo',
  'field_slider_items' => [
    ['target_id' => $slider_item1->id(), 'target_revision_id' => $slider_item1->getRevisionId()],
    ['target_id' => $slider_item2->id(), 'target_revision_id' => $slider_item2->getRevisionId()],
  ],
]);
$slider->save();

// Stats Item
$stats_item = Paragraph::create([
  'type' => 'stats_item',
  'field_title' => 'Statistiken',
  'field_value' => '1234',
  'field_summary' => 'Zufriedene Kunden',
]);
$stats_item->save();

// Embed
$embed = Paragraph::create([
  'type' => 'embed',
  'field_title' => 'Eingebetteter Inhalt',
  'field_embed_code' => '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>',
]);
$embed->save();

// Webform Embed
$webform_embed = Paragraph::create([
  'type' => 'webform_embed',
  'field_title' => 'Kontaktformular',
]);
$webform_embed->save();

// Block Reference
$block_reference = Paragraph::create([
  'type' => 'block_reference',
  'field_title' => 'Block-Referenz',
]);
$block_reference->save();

// Views
$views_paragraph = Paragraph::create([
  'type' => 'views',
  'field_title' => 'Ansicht einbinden',
]);
$views_paragraph->save();

// Media
$media_paragraph = Paragraph::create([
  'type' => 'media',
  'field_title' => 'Medien-Element',
]);
$media_paragraph->save();

// Bullet List
$bullet = Paragraph::create([
  'type' => 'bullet',
  'field_title' => 'Aufzählungsliste',
  'field_content' => [
    'value' => '<ul><li>Erster Punkt</li><li>Zweiter Punkt</li><li>Dritter Punkt</li></ul>',
    'format' => 'full_html',
  ],
]);
$bullet->save();

// Layout Container with nested content
$layout_text = Paragraph::create([
  'type' => 'text',
  'field_title' => 'Text im Layout-Container',
  'field_content' => [
    'value' => '<p>Dieser Text befindet sich in einem Layout-Container mit 2 Spalten.</p>',
    'format' => 'full_html',
  ],
]);
$layout_text->save();

$layout_text2 = Paragraph::create([
  'type' => 'text',
  'field_title' => 'Zweiter Text im Container',
  'field_content' => [
    'value' => '<p>Dies ist die zweite Spalte des Layout-Containers.</p>',
    'format' => 'full_html',
  ],
]);
$layout_text2->save();

$layout_container = Paragraph::create([
  'type' => 'layout_container',
  'field_columns' => '2',
  'field_theme' => 'light',
  'field_top_spacing' => 'medium',
  'field_bottom_spacing' => 'medium',
  'field_width' => 'content-width',
  'field_content_items' => [
    ['target_id' => $layout_text->id(), 'target_revision_id' => $layout_text->getRevisionId()],
    ['target_id' => $layout_text2->id(), 'target_revision_id' => $layout_text2->getRevisionId()],
  ],
]);
$layout_container->save();

// Create the node with all paragraphs
$node = Node::create([
  'type' => 'page',
  'title' => 'Paragraph Demo - Alle Komponenten',
  'status' => 1,
  'uid' => 1,
  'field_content' => [
    ['target_id' => $hero_paragraph->id(), 'target_revision_id' => $hero_paragraph->getRevisionId()],
    ['target_id' => $text_paragraph->id(), 'target_revision_id' => $text_paragraph->getRevisionId()],
    ['target_id' => $layout_container->id(), 'target_revision_id' => $layout_container->getRevisionId()],
    ['target_id' => $card_group->id(), 'target_revision_id' => $card_group->getRevisionId()],
    ['target_id' => $accordion_paragraph->id(), 'target_revision_id' => $accordion_paragraph->getRevisionId()],
    ['target_id' => $carousel->id(), 'target_revision_id' => $carousel->getRevisionId()],
    ['target_id' => $sidebyside->id(), 'target_revision_id' => $sidebyside->getRevisionId()],
    ['target_id' => $slider->id(), 'target_revision_id' => $slider->getRevisionId()],
    ['target_id' => $gallery->id(), 'target_revision_id' => $gallery->getRevisionId()],
    ['target_id' => $pricing->id(), 'target_revision_id' => $pricing->getRevisionId()],
    ['target_id' => $stats_item->id(), 'target_revision_id' => $stats_item->getRevisionId()],
    ['target_id' => $download->id(), 'target_revision_id' => $download->getRevisionId()],
    ['target_id' => $newsletter->id(), 'target_revision_id' => $newsletter->getRevisionId()],
    ['target_id' => $logo_collection->id(), 'target_revision_id' => $logo_collection->getRevisionId()],
    ['target_id' => $bullet->id(), 'target_revision_id' => $bullet->getRevisionId()],
    ['target_id' => $embed->id(), 'target_revision_id' => $embed->getRevisionId()],
    ['target_id' => $webform_embed->id(), 'target_revision_id' => $webform_embed->getRevisionId()],
    ['target_id' => $media_paragraph->id(), 'target_revision_id' => $media_paragraph->getRevisionId()],
    ['target_id' => $block_reference->id(), 'target_revision_id' => $block_reference->getRevisionId()],
    ['target_id' => $views_paragraph->id(), 'target_revision_id' => $views_paragraph->getRevisionId()],
  ],
]);

$node->save();

echo "Demo-Seite erstellt mit Node ID: " . $node->id() . "\n";
echo "URL: /node/" . $node->id() . "\n";
echo "Alias wird automatisch generiert.\n";