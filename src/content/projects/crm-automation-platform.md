---
title: "CRM Automation Platform"
description: "A multi-tenant CRM sync platform that connects job boards, email providers, and CRM systems using AI-powered lead scoring and automated workflow triggers."
date: 2025-11-01
tags: ["automation", "backend", "ai", "crm"]
stack: ["Node.js", "NestJS", "PostgreSQL", "Redis", "OpenAI", "Make.com", "Docker"]
cover: "/images/projects/crm-platform.jpg"
github: "https://github.com/nicolasburgueno"
featured: true
order: 1
---

## Overview

A production-grade automation platform that synchronizes lead data across multiple CRM systems in real time. Built for a client with 3,000+ monthly leads requiring zero-latency routing and AI-powered qualification.

## The Problem

The client had leads coming in from 6 different job boards, being manually copied into a CRM, and then manually emailed follow-ups. The process took ~4 hours per day and had a 23% error rate from copy-paste mistakes.

## The Solution

Built a central orchestration layer that:

1. **Ingests** leads via webhooks from all job boards
2. **Enriches** each lead with AI scoring (fit, intent, urgency)
3. **Routes** leads to the correct CRM pipeline stage automatically
4. **Triggers** personalized email sequences via Brevo
5. **Logs** everything to a PostgreSQL audit trail

## Key Technical Decisions

- **NestJS** for structured, testable backend with dependency injection
- **BullMQ + Redis** for reliable async job processing (no dropped leads)
- **OpenAI GPT-4o** for lead scoring via structured outputs
- **Make.com** as the integration glue for non-technical business rules

## Results

- Eliminated 4h/day of manual data entry
- Reduced lead routing errors from 23% → 0.3%
- Increased lead response speed from ~6h → ~4 minutes
- 3,000+ leads/month processed with 99.9% uptime
