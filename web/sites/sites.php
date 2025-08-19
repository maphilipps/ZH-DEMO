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
  
  // Thalheim - Kleine Landgemeinde im Weinland
  'thalheim.zh-demo.ddev.site' => 'thalheim',
  'thalheim.adesso-cms.ddev.site' => 'thalheim',
  
  // Erlenbach - Seegemeinde an der Goldküste
  'erlenbach.zh-demo.ddev.site' => 'erlenbach',
  'erlenbach.adesso-cms.ddev.site' => 'erlenbach',
  
  // Default bleibt für Admin-Zugriff
  'zh-demo.ddev.site' => 'default',
  'adesso-cms.ddev.site' => 'default',
];