<?php
/**
 * @file
 * Multi-Site Konfiguration für GPZH Demo
 * Mappt Domains zu Site-Verzeichnissen
 * 
 * Epic: GPZH-27 - Multi-Site Drupal Setup für 3 Gemeinden
 * Story: GPZH-28 - Sites.php Konfiguration für Multi-Site Setup
 */

$sites = [
  // Thalwil - Moderne Stadtgemeinde
  'thalwil.zh-demo.ddev.site' => 'thalwil',
  'thalwil.adesso-cms.ddev.site' => 'thalwil',
  'thalwil.zh.adessocms.de' => 'thalwil',
  
  // Thalheim - Kleine Landgemeinde im Weinland
  'thalheim.zh-demo.ddev.site' => 'thalheim',
  'thalheim.adesso-cms.ddev.site' => 'thalheim',
  'thalheim.zh.adessocms.de' => 'thalheim',
  
  // Erlenbach - Seegemeinde an der Goldküste
  'erlenbach.zh-demo.ddev.site' => 'erlenbach',
  'erlenbach.adesso-cms.ddev.site' => 'erlenbach',
  'erlenbach.zh.adessocms.de' => 'erlenbach',
  
  // Bruchtal - Demo-Hauptgemeinde (Leben am See)
  'bruchtal.zh-demo.ddev.site' => 'default',
  'bruchtal.zh.adessocms.de' => 'default',
  
  // Default für Admin-Zugriff
  'zh-demo.ddev.site' => 'default',
  'adesso-cms.ddev.site' => 'default',
  'zh.adessocms.de' => 'default',
  'www.zh.adessocms.de' => 'default',
];