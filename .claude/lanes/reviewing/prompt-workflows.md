# Self-Improving Prompt Workflows

## Accessibility Validation Prompt

### Current Prompt (v1.3)
```
Review this Drupal form for accessibility:
1. WCAG 2.1 AA: Check keyboard navigation, screen readers, color contrast >4.5:1
2. Data protection: Verify data minimization, explicit consent, privacy notices
3. Usability: Validate user experience and form flow
4. Context: Validate municipal portal appropriateness

Test each criterion and provide specific pass/fail with evidence.
```

### Test Results
- **Success Rate**: 8/10 (last 10 runs)
- **Common Failures**: Missing usability context validation
- **Last Iteration**: Added municipal context requirement

### Improvement Log
- v1.0: Basic accessibility check (4/10 success)
- v1.1: Added specific criteria (6/10 success) 
- v1.2: Added evidence requirement (7/10 success)
- v1.3: Added usability validation (8/10 success)

## Municipal Form Implementation Prompt

### Current Prompt (v2.1)
```
Implement this municipal form following best practices:
1. Webform module with workflow approval
2. Status tracking with clear labels
3. Email notifications 
4. WCAG 2.1 AA accessibility from start
5. Data validation with user-friendly errors
6. Mobile-responsive design

Include unit tests and demo scenario validation.
```

### Test Results
- **Success Rate**: 9/10 (last 10 runs)
- **Common Failures**: Demo scenario validation missed
- **Last Iteration**: Added demo requirement

## Performance Optimization Prompt  

### Current Prompt (v1.5)
```
Optimize this Drupal component for Core Web Vitals >90:
1. Analyze current performance bottlenecks
2. Implement lazy loading for images/media
3. Optimize CSS delivery (critical CSS inline)
4. Minimize JavaScript bundle size
5. Test on mobile 3G connection
6. Validate with Lighthouse CI

Target: <2s load time, >90 CWV score.
```

### Test Results
- **Success Rate**: 7/10 (last 10 runs)
- **Common Failures**: Mobile 3G testing skipped
- **Next Iteration**: Emphasize mobile testing requirement

---

## How to Evolve Prompts

1. **Create Test Case**: Define success criteria
2. **Run Prompt 10x**: Test current version
3. **Analyze Failures**: Why did it fail?
4. **Update Prompt**: Address failure patterns  
5. **Test Again**: Validate improvement
6. **Document**: Update this file with learning

This creates self-improving prompts like the frustration detector example!