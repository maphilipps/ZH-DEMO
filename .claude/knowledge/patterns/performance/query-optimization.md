# Database Query Optimization

**Pattern ID**: performance_query_01  
**Category**: Performance  
**Triage Level**: HIGH  
**First Seen**: PR #[pending]  
**Last Updated**: 2025-01-30  
**Frequency**: [to be tracked]

## Problem

N+1 query problems and inefficient database queries cause significant performance degradation, especially when loading related data in loops or rendering large datasets.

### Common Scenarios
- Loading entities with relationships in Drupal
- Fetching user data with associated content
- Rendering lists of items with related metadata
- API endpoints that return nested data structures
- Dashboard pages with multiple data sources

### Code Examples - PROBLEMATIC

```php
// SLOW - N+1 query problem in entity loading
$nodes = \Drupal::entityTypeManager()
    ->getStorage('node')
    ->loadByProperties(['type' => 'article']);

foreach ($nodes as $node) {
    // This creates a separate query for each node!
    $author = $node->get('uid')->entity; 
    $categories = $node->get('field_categories')->referencedEntities();
}
```

```php
// SLOW - Multiple separate queries  
$users = User::loadMultiple($user_ids);
foreach ($users as $user) {
    $profile = Profile::load($user->id()); // Separate query each time
    $posts = Post::loadByUser($user->id()); // Another query each time
}
```

```sql
-- SLOW - Missing WHERE clause optimization
SELECT * FROM node 
WHERE title LIKE '%search%' 
ORDER BY created DESC;

-- SLOW - No index usage
SELECT n.*, f.field_value 
FROM node n 
JOIN field_data f ON n.id = f.entity_id 
WHERE f.field_value = 'specific_value';
```

## Solution

Use eager loading, query optimization, and proper indexing to minimize database round trips and improve query performance.

### Code Examples - OPTIMIZED

```php
// FAST - Eager loading with entity queries
$query = \Drupal::entityQuery('node')
    ->condition('type', 'article')
    ->accessCheck(FALSE);
$nids = $query->execute();

// Load all nodes at once
$nodes = Node::loadMultiple($nids);

// Preload all referenced entities
$uids = [];
$category_ids = [];

foreach ($nodes as $node) {
    if (!$node->get('uid')->isEmpty()) {
        $uids[] = $node->get('uid')->target_id;
    }
    foreach ($node->get('field_categories') as $item) {
        $category_ids[] = $item->target_id;
    }
}

// Load all users and categories at once
$users = User::loadMultiple($uids);
$categories = Term::loadMultiple($category_ids);
```

```php
// FAST - Batch loading with entity storage
$user_storage = \Drupal::entityTypeManager()->getStorage('user');
$profile_storage = \Drupal::entityTypeManager()->getStorage('profile');
$post_storage = \Drupal::entityTypeManager()->getStorage('post');

// Load all data in batches
$users = $user_storage->loadMultiple($user_ids);
$profiles = $profile_storage->loadByProperties(['uid' => $user_ids]);
$posts = $post_storage->loadByProperties(['uid' => $user_ids]);

// Group by user ID for efficient lookup
$profiles_by_user = [];
$posts_by_user = [];

foreach ($profiles as $profile) {
    $profiles_by_user[$profile->get('uid')->target_id] = $profile;
}

foreach ($posts as $post) {
    $posts_by_user[$post->get('uid')->target_id][] = $post;
}
```

```sql
-- FAST - Optimized with proper WHERE and indexes
SELECT * FROM node 
WHERE type = 'article' 
  AND title LIKE '%search%' 
  AND status = 1
ORDER BY created DESC
LIMIT 20;

-- FAST - Proper JOIN with indexes
SELECT n.nid, n.title, f.field_value 
FROM node n 
INNER JOIN node_field_data nfd ON n.nid = nfd.nid
INNER JOIN field_data f ON n.nid = f.entity_id 
WHERE f.field_value = 'specific_value' 
  AND n.status = 1;
```

## Prevention Strategy

### 1. Entity Loading Best Practices
```php
// Use entity queries for efficient loading
$query = \Drupal::entityQuery('node')
    ->condition('type', $content_type)
    ->condition('status', 1)
    ->range(0, $limit)
    ->sort('created', 'DESC')
    ->accessCheck(FALSE);

$nids = $query->execute();
$nodes = Node::loadMultiple($nids);
```

### 2. Relationship Preloading
```php
// Preload referenced entities to avoid N+1
function preloadReferencedEntities($entities, $field_name) {
    $referenced_ids = [];
    foreach ($entities as $entity) {
        foreach ($entity->get($field_name) as $item) {
            $referenced_ids[] = $item->target_id;
        }
    }
    return \Drupal::entityTypeManager()
        ->getStorage($target_type)
        ->loadMultiple($referenced_ids);
}
```

### 3. Database Indexes
```sql
-- Add indexes for commonly queried fields
CREATE INDEX idx_node_type_status_created ON node (type, status, created);
CREATE INDEX idx_field_value_entity ON field_data (field_value, entity_id);
```

### 4. Query Profiling
```php
// Enable query logging in development
$connection = \Drupal::database();
$connection->enableStatementLogging = TRUE;

// After operations, check queries
$queries = $connection->getStatementLog();
foreach ($queries as $query) {
    if ($query['caller']['time'] > 100) { // Slow queries > 100ms
        error_log("Slow query: " . $query['query']);
    }
}
```

### 5. Caching Strategy
```php
// Cache expensive queries
$cache_key = "expensive_query:" . md5($parameters);
$cached = \Drupal::cache()->get($cache_key);

if ($cached) {
    return $cached->data;
}

$result = $expensive_query();
\Drupal::cache()->set($cache_key, $result, time() + 3600);
return $result;
```

## Performance Benchmarks

### Before Optimization
- **Query Count**: 50+ queries per page load
- **Load Time**: 2-5 seconds
- **Memory Usage**: 128MB+
- **Database CPU**: 80%+

### After Optimization  
- **Query Count**: 5-10 queries per page load
- **Load Time**: 200-500ms
- **Memory Usage**: 32-64MB
- **Database CPU**: 20-40%

## Related Patterns

- [Caching Strategies](caching-strategies.md) - Complement query optimization
- [Database Indexing](../architecture/database-design.md) - Proper index design
- [Entity API Best Practices](../quality/drupal-entity-usage.md) - Efficient entity usage

## Context from PR Reviews

### Common Reviewer Comments
- "This will create N+1 queries - use loadMultiple instead"
- "Consider eager loading the referenced entities"
- "This query is missing proper WHERE conditions"
- "Add database indexes for these commonly queried fields"
- "Profile this query - it might be slow with large datasets"

### Performance Impact Examples
```php
// Before (from PR review): 47 queries, 3.2s load time
foreach ($nodes as $node) {
    $author = $node->get('uid')->entity;
}

// After (reviewer suggestion): 2 queries, 0.4s load time
$uids = array_unique(array_map(fn($n) => $n->get('uid')->target_id, $nodes));
$authors = User::loadMultiple($uids);
```

## Prevention Rule

**Rule PERF-001**: Use eager loading and query optimization to prevent N+1 query problems

## Testing Strategy

### Performance Tests
```php
public function testQueryPerformance() {
    $start_queries = \Drupal::database()->query_log;
    $start_time = microtime(true);
    
    // Execute the code being tested
    $result = $this->loadArticlesWithAuthors($node_ids);
    
    $end_time = microtime(true);
    $query_count = count(\Drupal::database()->query_log) - count($start_queries);
    
    // Assert performance requirements
    $this->assertLessThan(10, $query_count, 'Should use < 10 queries');
    $this->assertLessThan(1.0, $end_time - $start_time, 'Should load in < 1 second');
}
```

### Query Profiling
```bash
# Enable slow query log in MySQL
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 0.1; # Log queries > 100ms

# Monitor slow queries
tail -f /var/log/mysql/slow.log
```

## Implementation Checklist

- [ ] Audit existing code for N+1 query patterns
- [ ] Implement eager loading for relationships
- [ ] Add database indexes for commonly queried fields
- [ ] Set up query profiling and monitoring
- [ ] Cache expensive query results where appropriate
- [ ] Add performance tests for critical paths
- [ ] Train team on efficient entity loading patterns

## Tools and Resources

- [Drupal Database API](https://www.drupal.org/docs/drupal-apis/database-api)
- [Entity API Documentation](https://www.drupal.org/docs/drupal-apis/entity-api)
- [MySQL Query Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [Devel Query Log](https://www.drupal.org/project/devel) - Development query profiling

---

**Generated from PR review patterns • Last updated: 2025-01-30**