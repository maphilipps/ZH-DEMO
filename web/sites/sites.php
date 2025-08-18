<?php

/**
 * @file
 * Multi-site configuration for GPZH (Gemeindeportale Zürich) Demo.
 *
 * This file maps domain names to site directories for the three
 * demo municipalities: Thalwil, Thalheim, and Erlenbach.
 */

$sites = [
  // Thalwil (Zürichsee-Gemeinde mit modernem Design)
  'thalwil.adesso-cms.ddev.site' => 'thalwil',
  'thalwil.ddev.site' => 'thalwil',
  
  // Thalheim (Weinland-Gemeinde mit traditionellem Design)  
  'thalheim.adesso-cms.ddev.site' => 'thalheim',
  'thalheim.ddev.site' => 'thalheim',
  
  // Erlenbach (Zürichsee-Gemeinde mit Seeblick-Design)
  'erlenbach.adesso-cms.ddev.site' => 'erlenbach', 
  'erlenbach.ddev.site' => 'erlenbach',
];