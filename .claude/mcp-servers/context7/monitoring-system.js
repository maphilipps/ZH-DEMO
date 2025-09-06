/**
 * Context7 Monitoring and Error Handling System
 * Provides comprehensive monitoring, error handling, and performance tracking
 * for Context7 integration in municipal portal development
 */

class Context7Monitor {
  constructor(config = {}) {
    this.config = {
      healthCheckInterval: config.healthCheckInterval || 300000, // 5 minutes
      performanceWindow: config.performanceWindow || 3600000,    // 1 hour
      errorThreshold: config.errorThreshold || 0.1,             // 10% error rate
      responseTimeThreshold: config.responseTimeThreshold || 30000, // 30 seconds
      ...config
    };

    this.metrics = {
      total_queries: 0,
      successful_queries: 0,
      failed_queries: 0,
      fallback_queries: 0,
      cache_hits: 0,
      response_times: [],
      error_log: [],
      municipal_context_effectiveness: new Map(),
      version_accuracy_tracking: new Map()
    };

    this.healthStatus = {
      context7_available: true,
      last_successful_query: Date.now(),
      consecutive_failures: 0,
      performance_degradation: false
    };

    this.startMonitoring();
  }

  /**
   * Main monitoring loop
   */
  startMonitoring() {
    setInterval(() => {
      this.performHealthCheck();
      this.analyzePerformance();
      this.generateReports();
    }, this.config.healthCheckInterval);
  }

  /**
   * Health check system
   */
  async performHealthCheck() {
    try {
      const testQuery = "drupal 11 basic configuration";
      const startTime = Date.now();
      
      // This would be the actual Context7 health check
      const response = await this.makeHealthCheckQuery(testQuery);
      
      const responseTime = Date.now() - startTime;
      
      if (response && responseTime < this.config.responseTimeThreshold) {
        this.healthStatus.context7_available = true;
        this.healthStatus.last_successful_query = Date.now();
        this.healthStatus.consecutive_failures = 0;
        this.logHealthStatus('healthy', responseTime);
      } else {
        this.handleHealthCheckFailure('timeout_or_invalid_response', responseTime);
      }
    } catch (error) {
      this.handleHealthCheckFailure(error.message);
    }
  }

  /**
   * Performance analysis
   */
  analyzePerformance() {
    const now = Date.now();
    const windowStart = now - this.config.performanceWindow;
    
    // Filter metrics to current window
    const recentResponseTimes = this.metrics.response_times.filter(
      rt => rt.timestamp > windowStart
    );
    
    const recentErrors = this.metrics.error_log.filter(
      error => error.timestamp > windowStart
    );

    // Calculate performance metrics
    const avgResponseTime = this.calculateAverageResponseTime(recentResponseTimes);
    const errorRate = recentErrors.length / Math.max(this.metrics.total_queries, 1);
    const successRate = this.metrics.successful_queries / Math.max(this.metrics.total_queries, 1);

    // Detect performance degradation
    if (avgResponseTime > this.config.responseTimeThreshold * 0.8 || 
        errorRate > this.config.errorThreshold) {
      this.healthStatus.performance_degradation = true;
      this.triggerPerformanceAlert(avgResponseTime, errorRate);
    } else {
      this.healthStatus.performance_degradation = false;
    }

    // Update performance metrics
    this.updatePerformanceMetrics(avgResponseTime, errorRate, successRate);
  }

  /**
   * Query tracking and monitoring
   */
  trackQuery(queryData) {
    const queryId = this.generateQueryId();
    const startTime = Date.now();

    return {
      queryId,
      start: () => {
        this.metrics.total_queries++;
        this.logQueryStart(queryId, queryData);
      },
      success: (response) => {
        const responseTime = Date.now() - startTime;
        this.metrics.successful_queries++;
        this.metrics.response_times.push({ timestamp: Date.now(), time: responseTime });
        this.trackMunicipalContextEffectiveness(queryData, response, true);
        this.logQuerySuccess(queryId, responseTime, response);
      },
      failure: (error) => {
        const responseTime = Date.now() - startTime;
        this.metrics.failed_queries++;
        this.metrics.error_log.push({ 
          timestamp: Date.now(), 
          queryId, 
          error: error.message,
          query: queryData 
        });
        this.trackMunicipalContextEffectiveness(queryData, null, false);
        this.logQueryFailure(queryId, error, responseTime);
      },
      fallback: (source) => {
        const responseTime = Date.now() - startTime;
        this.metrics.fallback_queries++;
        this.logFallbackUsage(queryId, source, responseTime);
      }
    };
  }

  /**
   * Municipal-specific tracking
   */
  trackMunicipalContextEffectiveness(queryData, response, success) {
    const contextKey = this.extractMunicipalContext(queryData);
    
    if (!this.metrics.municipal_context_effectiveness.has(contextKey)) {
      this.metrics.municipal_context_effectiveness.set(contextKey, {
        total: 0,
        successful: 0,
        municipal_relevance_scores: []
      });
    }

    const contextMetrics = this.metrics.municipal_context_effectiveness.get(contextKey);
    contextMetrics.total++;
    
    if (success && response) {
      contextMetrics.successful++;
      const relevanceScore = this.calculateMunicipalRelevance(response);
      contextMetrics.municipal_relevance_scores.push(relevanceScore);
    }
  }

  /**
   * Version accuracy tracking
   */
  trackVersionAccuracy(query, response, actualVersion) {
    const library = this.extractLibrary(query);
    
    if (!this.metrics.version_accuracy_tracking.has(library)) {
      this.metrics.version_accuracy_tracking.set(library, {
        queries: 0,
        accurate_responses: 0,
        version_mismatches: []
      });
    }

    const versionMetrics = this.metrics.version_accuracy_tracking.get(library);
    versionMetrics.queries++;

    const responseVersion = this.extractVersionFromResponse(response);
    
    if (responseVersion === actualVersion) {
      versionMetrics.accurate_responses++;
    } else {
      versionMetrics.version_mismatches.push({
        timestamp: Date.now(),
        expected: actualVersion,
        received: responseVersion,
        query: query
      });
    }
  }

  /**
   * Error handling strategies
   */
  handleContext7Error(error, queryData) {
    const errorType = this.classifyError(error);
    
    switch (errorType) {
      case 'timeout':
        this.handleTimeoutError(error, queryData);
        break;
      case 'rate_limit':
        this.handleRateLimitError(error, queryData);
        break;
      case 'service_unavailable':
        this.handleServiceUnavailableError(error, queryData);
        break;
      case 'authentication':
        this.handleAuthenticationError(error, queryData);
        break;
      default:
        this.handleGenericError(error, queryData);
    }
  }

  handleTimeoutError(error, queryData) {
    console.warn(`Context7 timeout for query: ${queryData.query}`);
    this.healthStatus.consecutive_failures++;
    
    if (this.healthStatus.consecutive_failures >= 3) {
      this.healthStatus.context7_available = false;
      this.scheduleServiceRecovery();
    }
  }

  handleRateLimitError(error, queryData) {
    console.warn(`Context7 rate limit exceeded: ${error.message}`);
    // Implement exponential backoff
    const backoffTime = Math.min(1000 * Math.pow(2, this.healthStatus.consecutive_failures), 60000);
    
    setTimeout(() => {
      this.healthStatus.context7_available = true;
    }, backoffTime);
  }

  handleServiceUnavailableError(error, queryData) {
    console.error(`Context7 service unavailable: ${error.message}`);
    this.healthStatus.context7_available = false;
    this.scheduleServiceRecovery();
  }

  /**
   * Recovery mechanisms
   */
  scheduleServiceRecovery() {
    // Attempt recovery after increasing intervals
    const recoveryAttempts = this.healthStatus.consecutive_failures;
    const recoveryDelay = Math.min(60000 * recoveryAttempts, 600000); // Max 10 minutes
    
    setTimeout(async () => {
      try {
        await this.performHealthCheck();
        if (this.healthStatus.context7_available) {
          console.info('Context7 service recovered');
          this.healthStatus.consecutive_failures = 0;
        } else {
          this.scheduleServiceRecovery();
        }
      } catch (error) {
        this.scheduleServiceRecovery();
      }
    }, recoveryDelay);
  }

  /**
   * Reporting and alerting
   */
  generateReports() {
    const report = {
      timestamp: Date.now(),
      health_status: this.healthStatus,
      performance_metrics: this.calculatePerformanceMetrics(),
      municipal_effectiveness: this.analyzeMunicipalEffectiveness(),
      version_accuracy: this.analyzeVersionAccuracy(),
      recommendations: this.generateRecommendations()
    };

    this.saveReport(report);
    
    if (this.shouldSendAlert(report)) {
      this.sendAlert(report);
    }

    return report;
  }

  calculatePerformanceMetrics() {
    const totalQueries = this.metrics.total_queries;
    const successRate = totalQueries > 0 ? this.metrics.successful_queries / totalQueries : 0;
    const fallbackRate = totalQueries > 0 ? this.metrics.fallback_queries / totalQueries : 0;
    const cacheHitRate = totalQueries > 0 ? this.metrics.cache_hits / totalQueries : 0;
    
    const avgResponseTime = this.calculateAverageResponseTime(this.metrics.response_times);

    return {
      success_rate: successRate,
      fallback_rate: fallbackRate,
      cache_hit_rate: cacheHitRate,
      average_response_time: avgResponseTime,
      total_queries: totalQueries,
      recent_errors: this.metrics.error_log.slice(-10)
    };
  }

  analyzeMunicipalEffectiveness() {
    const effectiveness = {};
    
    for (const [context, metrics] of this.metrics.municipal_context_effectiveness) {
      const successRate = metrics.total > 0 ? metrics.successful / metrics.total : 0;
      const avgRelevance = metrics.municipal_relevance_scores.length > 0 
        ? metrics.municipal_relevance_scores.reduce((a, b) => a + b, 0) / metrics.municipal_relevance_scores.length
        : 0;
      
      effectiveness[context] = {
        success_rate: successRate,
        average_municipal_relevance: avgRelevance,
        total_queries: metrics.total
      };
    }
    
    return effectiveness;
  }

  /**
   * Utility methods
   */
  generateQueryId() {
    return `ctx7_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  classifyError(error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('timeout')) return 'timeout';
    if (message.includes('rate limit')) return 'rate_limit';
    if (message.includes('unavailable') || message.includes('503')) return 'service_unavailable';
    if (message.includes('auth') || message.includes('401')) return 'authentication';
    
    return 'generic';
  }

  extractMunicipalContext(queryData) {
    const query = queryData.query || '';
    
    if (query.includes('municipal')) return 'municipal_specific';
    if (query.includes('wcag') || query.includes('accessibility')) return 'accessibility_compliance';
    if (query.includes('swiss') || query.includes('ch-dsg')) return 'swiss_compliance';
    if (query.includes('multilingual')) return 'multilingual_support';
    
    return 'general';
  }

  calculateMunicipalRelevance(response) {
    // This would analyze response content for municipal relevance
    // For now, return a placeholder score
    const content = response.content || '';
    let score = 0.5; // Base score
    
    if (content.includes('municipal')) score += 0.2;
    if (content.includes('government')) score += 0.1;
    if (content.includes('accessibility')) score += 0.1;
    if (content.includes('swiss') || content.includes('zurich')) score += 0.1;
    
    return Math.min(score, 1.0);
  }

  calculateAverageResponseTime(responseTimes) {
    if (responseTimes.length === 0) return 0;
    
    const total = responseTimes.reduce((sum, rt) => sum + rt.time, 0);
    return total / responseTimes.length;
  }

  // Logging methods
  logHealthStatus(status, responseTime = null) {
    console.info(`Context7 health check: ${status}${responseTime ? ` (${responseTime}ms)` : ''}`);
  }

  logQueryStart(queryId, queryData) {
    console.debug(`Context7 query started: ${queryId} - ${queryData.query}`);
  }

  logQuerySuccess(queryId, responseTime, response) {
    console.debug(`Context7 query successful: ${queryId} (${responseTime}ms)`);
  }

  logQueryFailure(queryId, error, responseTime) {
    console.warn(`Context7 query failed: ${queryId} - ${error.message} (${responseTime}ms)`);
  }

  logFallbackUsage(queryId, source, responseTime) {
    console.info(`Context7 fallback used: ${queryId} -> ${source} (${responseTime}ms)`);
  }

  // Placeholder methods for external integrations
  async makeHealthCheckQuery(query) {
    // This would make an actual Context7 health check query
    throw new Error('Context7 health check not implemented');
  }

  saveReport(report) {
    // Save report to file or database
    console.info('Context7 monitoring report generated');
  }

  shouldSendAlert(report) {
    return report.health_status.performance_degradation || 
           !report.health_status.context7_available ||
           report.performance_metrics.success_rate < 0.8;
  }

  sendAlert(report) {
    console.warn('Context7 performance alert triggered', {
      health_status: report.health_status,
      success_rate: report.performance_metrics.success_rate
    });
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.healthStatus.performance_degradation) {
      recommendations.push('Consider increasing Context7 timeout or implementing request queuing');
    }
    
    if (this.metrics.fallback_queries / Math.max(this.metrics.total_queries, 1) > 0.3) {
      recommendations.push('High fallback rate detected - review Context7 query patterns or service availability');
    }
    
    const cacheHitRate = this.metrics.cache_hits / Math.max(this.metrics.total_queries, 1);
    if (cacheHitRate < 0.3) {
      recommendations.push('Low cache hit rate - consider optimizing municipal query caching strategy');
    }
    
    return recommendations;
  }
}

module.exports = Context7Monitor;